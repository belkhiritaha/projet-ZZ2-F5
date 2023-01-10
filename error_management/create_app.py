#!/usr/bin/env python
import subprocess
from pathlib import Path

class DirectoryExistingError(Exception):
    "Raised when their is an existing error with the wanted directory"
    pass

class NotADirectoryError(Exception):
    "Raised when the wanted directory is not a directory"
    pass

def create_app(user, app):
    path_user = Path('users/' + user + '/')
    if (path_user.exists()):
        if path_user.is_dir():
            path_app = Path('users/' + user + '/' + app)
            if(path_app.exists()):
                if(path_app.is_dir()):
                    raise DirectoryExistingError("This application already exists")
                else: raise NotADirectoryError("This application does not correspond to a directory")
            else : 
                #Create the app dir into the user dir
                create_app = subprocess.run(["mkdir", path_app])
        else : raise NotADirectoryError("This user does not correspond to a directory")
    else : raise DirectoryExistingError("This user doesn't have a directory")
                
    return 0
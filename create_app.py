#!/usr/bin/env python
import subprocess
from pathlib import Path

class DirectoryError(Exception):
    "This exception is raised when there is a directory error"
    pass

def create_app(user, app):
    path_user = Path('users/' + user + '/')
    if (path_user.exists()):
        if path_user.is_dir():
            path_app = Path('users/' + user + '/' + app)
            if(path_app.exists()):
                if(path_app.is_dir()):
                    raise DirectoryError("This application already exist")
                else: raise DirectoryError("This application name match an other file name")
            else : 
                #Create the app dir into the user dir
                subprocess.run(["mkdir", path_app])
        else : raise DirectoryError("This user name doesn't match a directory")
    else : raise DirectoryError("This user is unknown")
                
    return 0
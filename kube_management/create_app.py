#!/usr/bin/env python
import subprocess
from kube_management.error import *
from pathlib import Path

def create_app(user, app):
    path_user = Path('users/' + user + '/')
    if (path_user.exists()):
        if path_user.is_dir():
            path_app = Path('users/' + user + '/' + app)
            if(path_app.exists()):
                if(path_app.is_dir()):
                    raise DirectoryError("This app already exists")
                else: raise DirectoryError("This app name match an other file name")
            else : 
                #Create the app dir into the user dir
                subprocess.run(["mkdir", path_app])
        else : raise DirectoryError("This user name doesn't match a directory")
    else : raise DirectoryError("This user is unknown")
                
    return 0
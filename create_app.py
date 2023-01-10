#!/usr/bin/env python
import subprocess
from pathlib import Path

def create_app(user, app):
    path_user = Path('users/' + user + '/')
    if (path_user.exists()):
        if path_user.is_dir():
            path_app = Path('users/' + user + '/' + app)
            if(path_app.exists()):
                if(path_app.is_dir()):
                    print("app already existing")
                else: print("app error")
            else : 
                #Create the app dir into the user dir
                create_app = subprocess.run(["mkdir", path_app])
                print("done")
        else : print("user error")
    else : print("user not existing")
                
    return 0
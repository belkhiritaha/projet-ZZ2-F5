#!/usr/bin/env python
import subprocess
from pathlib import Path

def create_app(user, app):
    path_app = Path('users/' + user + '/' + app)
    #Create the app dir into the user dir
    create_app = subprocess.run(["mkdir", path_app])

                
    return 0
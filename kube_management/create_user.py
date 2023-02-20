#!/usr/bin/env python
import subprocess
import sys
from pathlib import Path

def create_user(user):
    path_user = Path('users/' + user + '/')
    if (path_user.exists()):
        if path_user.is_dir():
            print("User already existing")
        else : print("user error")
    else : create_app = subprocess.run(["mkdir", path_user])
        
    return 0


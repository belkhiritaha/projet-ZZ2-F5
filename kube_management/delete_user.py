#!/usr/bin/env python
import subprocess
import sys
from pathlib import Path

def delete_user(user):
    path_user = Path('users/' + user )
    create_app = subprocess.run(["rm", "-r" ,path_user])
        
    return 0

#!/usr/bin/env python

import subprocess
import sys
from pathlib import Path

def main(user):
    path_user = Path('users/' + user + '/')
    if (path_user.exists()):
        if path_user.is_dir():
            print("user already existing")
        else : print("user error")
    else : 
        #Create the app dir into the user dir
        create_app = subprocess.run(["mkdir", path_user])
        print("done")
    return 0



if __name__ == '__main__':
    main(sys.argv[1])
#!/usr/bin/env python
import subprocess
from pathlib import Path

def main():
    print("Quel user ?")
    user = input()
    path_user = Path(user + '/')
    if (path_user.exists()):
        if path_user.is_dir():
            print("Quelle app ?")
            app = input()
            path_app = Path(user + '/' + app)
            if(path_app.exists()):
                if(path_app.is_dir()):
                    print("app already existing")
                else: print("app error")
            else : 
                #Create the app dir into the user dir
                create_app = subprocess.run(["mkdir", path_app])
        else : print("user error")
    else : print("user not existing")
                
    return 0


if __name__ == '__main__':
    main()
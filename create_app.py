#!/usr/bin/env python
import subprocess

def main():
    print("Quel user ?")
    user = input()
    path_user = user + '/'
    print("Quelle app ?")
    app = input()
    path_app = path_user + app
    print (path_app)

    #Create the app dir into the user dir
    create_app = subprocess.run(["mkdir", path_app])

    return 0


if __name__ == '__main__':
    main()
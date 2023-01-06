#!/usr/bin/env python
import subprocess

def main():
    print("Nom d'utilisateur ?")
    path = input()
    print (path)

    #Create user directory
    create_user = subprocess.run(["mkdir", path])

    return 0


if __name__ == '__main__':
    main()
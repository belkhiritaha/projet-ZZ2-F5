import subprocess
from pathlib import Path

def main():
    print("Quel user ?")
    user = input()
    path_user = Path(user + '/')
    if (path_user.exists()):
        if path_user.is_dir():
            print("user already existing")
        else : print("user error")
    else : 
        #Create the app dir into the user dir
        create_app = subprocess.run(["mkdir", path_user])
                
    return 0



if __name__ == '__main__':
    main()
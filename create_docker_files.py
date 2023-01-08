#!/usr/bin/env python
import subprocess
from pathlib import Path
import glob

def main():

    print("Quel user ?")
    user = input()
    path_user = Path(user + '/')
    if (path_user.exists()):
        if (path_user.is_dir()):
            print("Quelle app ?")
            app = input()
            path_app = Path(user + '/' + app)
            if (path_app.exists()):
                if (path_app.is_dir()):
                    path_docker_compose = Path(user + '/' + app + '/docker-compose.yml')
                    path_docker_files = Path(user + '/' + app + '/kube_files/')
                    #Create kubernetes .yaml files
                    result = subprocess.run(["kompose", "convert", "-f", path_docker_compose])
                    create_dir = subprocess.run(["mkdir", path_docker_files])
                    move = subprocess.run(['mv'] + glob.glob('*.yaml') + [path_docker_files])
                else : print("app error")
            else : print("app unknown")
        else : print("user error")
    else : print("user unknown")
    

    return 0


if __name__ == '__main__':
    main()



from pathlib import Path

def main():

    return 0
#!/usr/bin/env python
import subprocess
from pathlib import Path

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
                    path_docker_files = Path(user + '/' + app + '/kube_files/')
                    if (path_docker_files.exists()):
                        if (path_docker_files.is_dir()):
                            #Delete the docker from K8s
                            kubectl = subprocess.run(["kubectl", "delete", "-f", path_docker_files])
                        else : print("kube_files error")
                    else : print("kube_file unknown")
                else : print("app error")
            else : print("app unknown")
        else : print("user error")
    else : print("user unknown")

    return 0


if __name__ == '__main__':
    main()
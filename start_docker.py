#!/usr/bin/env python
import subprocess
import sys
from pathlib import Path

def main(user, app):
    path_user = Path('users/' + user + '/')
    if (path_user.exists()):
        if (path_user.is_dir()):
            path_app = Path('users/' + user + '/' + app)
            if (path_app.exists()):
                if (path_app.is_dir()):
                    path_docker_files = Path('users/' + user + '/' + app + '/kube_files/')
                    if (path_docker_files.exists()):
                        if (path_docker_files.is_dir()):
                            #Start the docker into K8s
                            kubectl = subprocess.run(["kubectl", "apply", "-f", path_docker_files])
                            service = subprocess.run(["minikube service --all | grep http"], shell=True)
                        else : print("kube_files error")
                    else : print("kube_file unknown")
                else : print("app error")
            else : print("app unknown")
        else : print("user error")
    else : print("user unknown")

    return 0


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
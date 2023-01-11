#!/usr/bin/env python
import subprocess
from pathlib import Path
from error import *

def start_docker(user, app):
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
                            kubectl = subprocess.run(["kubectl", "apply", "-f", path_docker_files], capture_output=True, text=True)
                            if kubectl.stderr != "":
                                raise KubectlError(kubectl.stderr)
                            service = subprocess.run(["minikube service --all | grep http"], shell=True, capture_output=True, text=True)
                            print(service.stdout)
                        else : raise DirectoryError("This app kube_files doesn't correspond to a directory")
                    else : raise DirectoryError("This app kube_files doesn't exists")
                else : raise DirectoryError("This app name doesn't correspond to a directory")
            else : raise DirectoryError("This app doesn't exists")
        else : raise DirectoryError("This username doesn't correspond to a directory")
    else : raise DirectoryError("This user doesn't exists")
    

    return 0
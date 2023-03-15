#!/usr/bin/env python
import subprocess
from kube_management.error import *
from pathlib import Path
import glob

def create_kube_files(user, app):
    path_user = Path('../users/' + user + '/')
    if (path_user.exists()):
        if (path_user.is_dir()):
            path_app = Path('../users/' + user + '/' + app)
            if (path_app.exists()):
                if (path_app.is_dir()):
                    path_docker_compose = Path('../users/' + user + '/' + app + '/docker-compose.yml')
                    if (path_docker_compose.exists()):
                        path_docker_files = Path('../users/' + user + '/' + app + '/kube_files/')
                        path_config=Path( '../users/' + user + '/backup/')#copy de la config dans backup 

                        create_dirconf = subprocess.run(["mkdir", path_config])#copy de la config
                        path_configfile=Path( '../users/' + user + '/backup/'+app+'.json')#copy de la config
                        copy = subprocess.run(['cp'] + glob.glob('../tmp.json')  + [path_configfile], capture_output=True) #copy de la config
                        result = subprocess.run(["kompose", "convert", "-f", path_docker_compose], capture_output=True)
                        create_dir = subprocess.run(["mkdir", path_docker_files])
                        move = subprocess.run(['mv'] + glob.glob('*.yaml') + [path_docker_files], capture_output=True)
                    else: raise DockerComposeError("The docker-compose doesn't exists")
                else : raise DirectoryError("This app name doesn't correspond to a directory")
            else : raise DirectoryError("This app doesn't exists")
        else : raise DirectoryError("This username doesn't correspond to a directory")
    else : raise DirectoryError("This user doesn't exists")
    
    return 0

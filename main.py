#!/usr/bin/env python
import sys
from create_app import *
from create_kube_files import create_kube_files
from start_docker import start_docker
from retrieve_json_file import retrieve_json_file
from docker_management import *

def main():

    res = retrieve_json_file()

    #Création du dossier application dans le dossier du user
    try:
        create_app(res[0], res[1])
    except DirectoryError as err:
        print(err.args[0])
        return(1)

    #Simulation de la création du docker-compose
    path_app = Path("users/" + res[0] + "/" + res[1])
    subprocess.run(["cp", "users/topin/example/docker-compose.yml", path_app])

    #Création du docker-compose
    try:
            create_env(res[0], "passwd")
            create_docker_compose(res)
    except:
        print("An exception occurred")
        return 1
    
    #Création des kubes_files
    try:
        create_kube_files(res[0], res[1])
    except (DirectoryError, DockerComposeError) as err:
        print(err.args[0])
        return 1
    

    #Démarrage du docker dans minikube(K8s)
    try:
        start_docker(res[0], res[1])
    except KubectlError as err:
        print(err.args[0])
        return 1
        

    print("All Successfull")
    return 0



#To start the main fonction, with the parameters
if __name__ == '__main__':

    main()
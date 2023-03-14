#!/usr/bin/env python
import sys
from kube_management import *
from docker_management import *

def main(json_name):

    res = retrieve_json_file(json_name)

    #Création du dossier application dans le dossier du user
    try:
        create_app(res[0], res[1])
    except DirectoryError as err:
        print(err.args[0])
        return(1)

    #Création du docker-compose
    try:
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
    main(sys.argv[1])
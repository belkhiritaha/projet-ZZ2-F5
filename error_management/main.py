import sys
from pathlib import Path
import subprocess
from create_app import create_app, DirectoryExistingError, NotADirectoryError
from create_kube_files import create_kube_files
from start_docker import start_docker


def main(user, app):
    #Création du dossier application dans le dossier du user
    try :
        create_app(user, app)
    except (DirectoryExistingError, NotADirectoryError) as err:
        print(err.args[0])
        return 1

    #Création du docker-compose
    """try:
        create_docker-compose(user, app, ...)
    except:
        print("An exception occurred")"""
    
    #Création des kubes_files
    try:
        create_kube_files(user, app)
    except:
        print("An exception occurred")
    
    #Démarrage du docker dans minikube(K8s)
    try:
        start_docker(user, app)
    except:
        print("An error occurred")

    return 0



#To start the main fonction, with the parameters
if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])

#arg list : user, app
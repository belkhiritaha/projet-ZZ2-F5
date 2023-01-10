import sys
from pathlib import Path
import subprocess
from create_app import create_app
from create_kube_files import create_kube_files
from start_docker import start_docker

#Création of custom error
class DirectoryExistingError(Exception):
    "Raised when their is an existing error with the wanted directory"
    pass

class NotADirectoryError(Exception):
    "Raised when the wanted directory is not a directory"
    pass

def try_path_new_app(user, app):
    path_user = Path('users/' + user + '/')
    if (path_user.exists()):
        if path_user.is_dir():
            path_app = Path('users/' + user + '/' + app)
            if(path_app.exists()):
                if(path_app.is_dir()):
                    raise DirectoryExistingError("This application already exists")
                else: raise NotADirectoryError("This application does not correspond to a directory")
        else : raise NotADirectoryError("This user does not correspond to a directory")
    else : raise DirectoryExistingError("This user doesn't have a directory")


def main(user, app):

    #Création du dossier application dans le dossier du user
    try :
        try_path_new_app(user, app)
    except (DirectoryExistingError, NotADirectoryError) as err:
        print(err.args[0])
        return 1
        
    create_app(user, app)
    path_app = Path('users/' + user + '/' + app)

    copy = subprocess.run(["cp", "users/docker-compose.yml", path_app])

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
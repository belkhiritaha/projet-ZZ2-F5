import sys
from create_app import *
from create_kube_files import *
from start_docker import *

def main(user, app):
    #Création du dossier application dans le dossier du user
    try :
        create_app(user, app)
    except DirectoryError as err:
        print(err.args[0])
        return(1)

    #Simulation de la création du docker-compose
    path_app = Path("users/" + user + "/" + app)
    subprocess.run(["cp", "users/topin/example/docker-compose.yml", path_app])

    #Création du docker-compose
    """try:
        create_docker-compose(user, app, ...)
    except:
        print("An exception occurred")"""
    
    #Création des kubes_files
    try:
        create_kube_files(user, app)
    except (DirectoryError, DockerComposeError) as err:
        print(err.args[0])
        return 1
    

    #Démarrage du docker dans minikube(K8s)
    try:
        start_docker(user, app)
    except KubectlError as err:
        print(err.args[0])
        return 1
        

    print("All Successfull")
    return 0



#To start the main fonction, with the parameters
if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])

#arg list : user, app
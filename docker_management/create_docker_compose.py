import yaml
import subprocess

from docker_management.configs.initializeDockerCompose import *
from docker_management.configs.configDatabase import *
from docker_management.configs.configDataRetrieving import *
from docker_management.configs.configDataVisualisation import *



# FUNCTION WHO CREATE A DOCKER-COMPOSE FILE AND SET UP IT IN A PERSONALIZED WAY
    # res => (user, app,technology of database, technology of data visualisation,
    #         technology of data retrieving1,technology of data retrieving2,...)

def create_docker_compose(res):

    contenu = []

    # creation of THE DOCKER-COMPOSE FILE
    initializeDockerCompose(contenu)

    configDatabase(contenu, res[2])

    configDataVisualisation(contenu, res[3], res[2])
    
    for i in res[4:]:

        configDataRetrieving(contenu, i, res[2])    

    contenu[0]['volumes'] = {
                            res[3]+'-storage': None,
                            res[2]+'-storage': None
                            }
 
    # move the docker-compose file in the good directory
    path = subprocess.run(["pwd"])

    fichier = open("users/"+ res[0] +"/"+ res[1] +"/docker-compose.yml","w+") 

    yaml.dump_all(contenu, fichier, sort_keys=False)

    fichier.close() 

    # copy the entreypoint.sh file in the good directory

    subprocess.run(["cp", "docker_management/prerequisite/entrypoint.sh", "users/"+ res[0] +"/"+ res[1] +"/entrypoint.sh"])

    # copy the .env file in the good directory

    subprocess.run(["cp", "docker_management/prerequisite/.env", "users/"+ res[0] +"/"+ res[1] +"/.env"])


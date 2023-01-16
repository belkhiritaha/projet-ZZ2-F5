import yaml
import subprocess

from initializeDockerCompose import *
from configDatabase import *
from configDataRetrieving import *
from configDataVisualisation import *



# FUNCTION WHO CREATE A DOCKER-COMPOSE FILE AND SET UP IT IN A PERSONALIZED WAY
    # ARGS => (version of the docker-compose, technology of data visualisation, technology of database,
    #         technology of data retrieving1,technology of data retrieving2,...)

def create_docker_compose(res):

    contenu = []

    initializeDockerCompose (contenu, "3,6")

    configDatabase(contenu, res[2] , ".influxdb:/var/lib/influxdb")

    configDataVisualisation(contenu, res[2], res[3], "./grafana:/var/lib/grafana")

    for i in res[4:]:

        configDataRetrieving (contenu, i, res[3],"./telegraf/telegraf.conf:/etc/telegraf/telegraf.conf" )
    
    path = subprocess.run(["pwd"])

    fichier = open("configFiles/docker-compose.yml","w+") 

    yaml.dump_all(contenu, fichier, sort_keys=False)

    fichier.close() 

    print("N'IMPORTE\nQUOI\n!!!!!!!!!!!!!!!!!!!!!!!!!")


from initializeDockerCompose import *
from configDatabase import *
from configDataVisualisation import *
from configDataRetrieving import *

import yaml


# FUNCTION WHO CREATE A DOCKER-COMPOSE FILE AND SET UP IT IN A PERSONALIZED WAY
    # ARGS => (version of the docker-compose, technology of data visualisation, technology of database,
    #         technology of data retrieving1,technology of data retrieving2,...)

def createDockerCompose(*args):

    contenu = []

    initializeDockerCompose (contenu, str( args[0]))

    configDatabase(contenu, args[2] , ".influxdb:/var/lib/influxdb")

    configDataVisualisation(args[1])

    for i in args[3:]:

        configDataRetrieving (contenu, i, args[2], "/var/run/docker.sock:/var/run/docker.sock", "./telegraf/telegraf.conf:/etc/telegraf/telegraf.conf" )
    

    fichier = open("docker-compose.yml","w") 

    yaml.dump_all(contenu, fichier, sort_keys=False)

    fichier.close()

    print("N'IMPORTE\nQUOI\n!!!!!!!!!!!!!!!!!!!!!!!!!")


# TO DO

#   MAKE SOME FUNCTIONS ABOUT CONFIGURING EACH SOFTWARE

createDockerCompose(3, "grafana", "influxdb", "telegraf")


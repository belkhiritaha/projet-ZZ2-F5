import yaml
import subprocess

from configProg import *
from configEnv import *

# FUNCTION WHO CREATE A DOCKER-COMPOSE FILE AND SET UP IT IN A PERSONALIZED WAY
    # ARGS => (version of the docker-compose, technology of data visualisation, technology of database,
    #         technology of data retrieving1,technology of data retrieving2,...)

def createDockerCompose(*args):

    contenu = []

    initializeDockerCompose (contenu, str( args[0]))

    configDatabase(contenu, args[2] , ".influxdb:/var/lib/influxdb")

    configDataVisualisation(contenu, args[1], args[2], "./grafana:/var/lib/grafana")

    for i in args[3:]:

        configDataRetrieving (contenu, i, args[2],"./telegraf/telegraf.conf:/etc/telegraf/telegraf.conf" )
    
    path = subprocess.run(["pwd"])

    fichier = open("configFiles/docker-compose.yml","w+") 

    yaml.dump_all(contenu, fichier, sort_keys=False)

    fichier.close() 

    print("N'IMPORTE\nQUOI\n!!!!!!!!!!!!!!!!!!!!!!!!!")


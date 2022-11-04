from initializeDockerCompose import *
from configDatabase import *
from configDataVisualisation import *
from configDataRetrieving import * 

import yaml



# FUNCTION WHO CREATE A DOCKER-COMPOSE FILE AND SET UP IT IN A PERSONALIZED WAY
    # ARGS => (version of the docker-compose, technology of data visualisation, technology of database,
    #         technology of data retrieving1,technology of data retrieving2,...)

def createDockerCompose(*args):

    val = True

    contenu = [{
                'version': str(args[0]),
                'services': 
                {
                 args[2]: 
                    {
                     'image' : args[2], 
                     'container_name': args[2],
                     'restart': 'on_failure', 
                     'hostname': args[2], 
                     'volumes': [".influxdb:/var/lib/influxdb"]
                    },
                 args[3]: 
                    {
                     'image': args[3], 
                     'depends_on': [args[2]], 
                     'container_name': args[3], 
                     'restart': 'on_failure',
                     'links': ["influxdb:influxdb"], 
                     'tty': val,
                     'volumes':
                               [
                                "/var/run/docker.sock:/var/run/docker.sock", 
                                "./telegraf/telegraf.conf:/etc/telegraf/telegraf.conf"
                               ]
                    }
                }
               }
              ]

    fichier = open("docker-compose.yml","w")

    yaml.dump_all(contenu, fichier, sort_keys=False)


    #initializeDockerCompose (str( args[0]))
    
    #configDatabase(args[2] , ".influxdb:/var/lib/influxdb")

    #configDataVisualisation(args[1])

    #for i in args[3:]:

     #   configDataRetrieving ( i, args[2], "/var/run/docker.sock:/var/run/docker.sock", "./telegraf/telegraf.conf:/etc/telegraf/telegraf.conf" )
    
    print("N'IMPORTE\nQUOI\n!!!!!!!!!!!!!!!!!!!!!!!!!")

    fichier.close()

# TO DO

#   MAKE SOME FUNCTIONS ABOUT CONFIGURING EACH SOFTWARE

createDockerCompose(3, "grafana", "influxdb", "telegraf")


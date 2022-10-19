from configDatabase import *
from configDataVisualisation import *
from configDataRetrieving import * 


# FUNCTION WHO CREATE A DOCKER-COMPOSE FILE AND SET UP IT IN A PERSONALIZED WAY
    # ARGS => (version of the docker-compose, technology of data visualisation, technology of database,
    #         technology of data retrieving1,technology of data retrieving2,...)
def createDockerCompose(*args) :

    fichier = open("docker-compose.yml", "w")

    fichier.write("version : '" + str(args[0]) + "'\n")
    fichier.write("\tservice:\n")

    fichier.close()

    configDatabase( args[2] )

    configDataVisualisation( args[1] )

    for i in args[3:]:

        configDataRetrieving ( i )
    
    print("N'IMPORTE")
    print("QUOI")
    print("!!!!!!!!!!!!!!!!!!!!!!!!!")

# TO DO

#   MAKE SOME FUNCTIONS ABOUT CONFIGURING EACH SOFTWARE
#   MAKE A FUNCTION THAT

createDockerCompose(3, influxdb, 2, 3, 4, 5, 6, 23, 12, 1, 1, 1, 1, 1, 1, 1)


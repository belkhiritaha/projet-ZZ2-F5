

def configDataVisualisation( technology ) :

    fichier = open("docker-compose.yml", "a")

    fichier.write("\t\t")

    print("ISIMA")

    fichier.write("\n")
    fichier.close()

def configDatabase( technology ) :

    fichier = open("docker-compose.yml", "a")

    fichier.write("\t\t")

    print("C'EST")

    fichier.write("\n")
    fichier.close()

def configDataRetrieving ( technology ) :

    fichier = open("docker-compose.yml", "a")

    fichier.write("\t\t")

    print("VRAIMENT")

    fichier.write("\n")
    fichier.close()


# FUNCTION WHO CREATE A DOCKER-COMPOSE FILE AND SET UP IT IN A PERSONALIZED WAY
    # ARGS => (version of the docker-compose, technology of data visualisation, technology of database,
    #         technology of data retrieving1,technology of data retrieving2,...)
def createDockerCompose(*args) :

    fichier = open("docker-compose.yml", "a")

    fichier.write("version : '" + str(args[0]) + "'\n")
    fichier.write("\tservice:\n")

    fichier.close()

    configDataVisualisation( args[1] )

    configDatabase( args[2] )

    for i in args[3:]:

        configDataRetrieving ( i )


    fichier.close()


# TO DO

#   MAKE SOME FUNCTIONS ABOUT CONFIGURING EACH SOFTWARE
#   MAKE A FUNCTION THAT

createDockerCompose(3, 1, 2, 3, 4, 5, 6, 23, 12, 1, 1, 1, 1, 1, 1, 1)

print("N'IMPORTE")
print("QUOI")
print("!!!!!!!!!!!!!!!!!!!!!!!!!")

def configDatabase(technology, pathToVolume):

    fichier = open("docker-compose.yml", "a")

    fichier.write(" " + technology + ":\n")
    fichier.write("  image: " + technology + "\n")
    fichier.write("  container_name: " + technology + "\n")
    fichier.write("  restart: always\n")
    fichier.write("  hostname: " + technology + "\n")

    #fichier.write("\t\t\tenvironment:\n")

    #if(technology == "influxdb") :
    #    fichier.write("\t\t\t\tvariableEnvironnement\n")
    #    fichier.write("\t\t\t\tvariableEnvironnement\n")
    #    fichier.write("\t\t\t\tvariableEnvironnement\n")

    #if(technology == "exemple2") :
    #    fichier.write("\t\t\t\tvariableEnvironnement\n")
    #    fichier.write("\t\t\t\tvariableEnvironnement\n")
    #    fichier.write("\t\t\t\tvariableEnvironnement\n")

    fichier.write("  volumes:\n")
    fichier.write("   - " + pathToVolume ) # volume pour stocker la base de données 
    fichier.write("\n")
    fichier.close()

    print("ISIMA")
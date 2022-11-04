
def configDataRetrieving (technology, database, pathToDockerDemon, pathToDataRetrievingConfigFile):

    fichier = open("docker-compose.yml", "a")

    fichier.write(" " + technology + ":\n")
    fichier.write("  image: " + technology + "\n")
    fichier.write("  depends_on:\n" + "   - " + database + "\n") #le système de database est nécessaire
    fichier.write("  container_name: " + technology + "\n")
    fichier.write("  restart: always\n")
    fichier.write("  links:\n   - " + database + ":" + database + "\t\n")
    fichier.write("  tty: true\n")

    fichier.write("  volumes:\n")
    fichier.write("   - " + pathToDockerDemon + "\n") # nécessaire pour remonter les données du démon Docker
    fichier.write("   - " + pathToDataRetrievingConfigFile + "\n")

    fichier.write("\n")
    fichier.close()

    print("VRAIMENT")
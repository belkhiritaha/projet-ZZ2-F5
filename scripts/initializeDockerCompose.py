
def initializeDockerCompose (version):

    fichier = open("docker-compose.yml", "w")

    fichier.write("version : '" + version + "'\n")
    fichier.write("\tservice:\n")

    fichier.close()

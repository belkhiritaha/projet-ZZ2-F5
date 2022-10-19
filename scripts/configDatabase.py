
def configDatabase( technology ) :

    fichier = open("docker-compose.yml", "a")

    fichier.write("\t\t")
    print(technology)
    print("C'EST")

    fichier.write("\n")
    fichier.close()
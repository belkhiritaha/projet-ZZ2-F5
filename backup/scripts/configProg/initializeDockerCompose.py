
def initializeDockerCompose (contenu, version):

    contenu.append({'version': version})

    contenu[0]['services'] = False

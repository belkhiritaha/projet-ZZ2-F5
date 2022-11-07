
def configDataRetrieving (contenu, technology, database, pathToDockerDemon, pathToDataRetrievingConfigFile):

    val = True

    contenu[0]['services'][technology] = {
                              'image': technology, 
                              'depends_on': [database],                     # le système de database est nécessaire
                              'container_name': technology, 
                              'restart': 'always', 
                              'links': [database +':'+ database], 
                              'tty': val, 
                              'volumes':[pathToDockerDemon,                 # nécessaire pour remonter les données du démon Docker
                                         pathToDataRetrievingConfigFile]    # la path du fichier de config de récupération de data
                             }

    print("VRAIMENT")


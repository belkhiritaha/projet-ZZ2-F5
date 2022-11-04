
def configDataRetrieving (contenu, technology, database, pathToDockerDemon, pathToDataRetrievingConfigFile):

    val = True

    contenu[0]['services'][technology] = {
                              'image': technology, 
                              'depends_on': [database],                     # le système de database est nécessaire
                              'container_name': technology, 
                              'restart': 'on_failure', 
                              'links': ["influxdb:influxdb"], 
                              'tty': val, 
                              'volumes':[pathToDockerDemon,                 # nécessaire pour remonter les données du démon Docker
                                         pathToDataRetrievingConfigFile]
                             }

    print("VRAIMENT")


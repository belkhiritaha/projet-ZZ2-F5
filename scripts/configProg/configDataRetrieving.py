
def configDataRetrievingEnvVar (contenu, technology):

    if technology == "telegraf":

        contenu[0]['services'][technology]['environment'] = ['INFLUXDB_DB=influx',
                                                             'INFLUXDB_ADMIN_USER=$USER',
                                                             'INFLUXDB_ADMIN_PASSWORD=$USER']

    print("VRAIMENT")


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

    configDataRetrievingEnvVar(contenu, technology)                      

    print("VRAIMENT")


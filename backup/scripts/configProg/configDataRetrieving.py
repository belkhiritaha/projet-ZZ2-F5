
#def configDataRetrievingEnvVar (contenu, technology):

    #if technology == "telegraf":

    #    contenu[0]['services'][technology]['environment'] = ['INFLUXDB_DB=influx',
    #                                                         'INFLUXDB_ADMIN_USER=$USER',
    #                                                         'INFLUXDB_ADMIN_PASSWORD=$USER']

    #print("VRAIMENT")


def configDataRetrieving (contenu, technology, database, pathToDataRetrievingConfigFile):

    val = True

    contenu[0]['services'][technology] = {
                              'image': technology, 
                              'container_name': technology, 
                              'restart': 'always',
                              'depends_on': [database],                     # le système de database est nécessaire 
                              'links': [database], 
                              'volumes': [pathToDataRetrievingConfigFile],   # la path du fichier de config de récupération de data
                              'ports': ['8125:8125']
                             }

    #configDataRetrievingEnvVar(contenu, technology)                      

    print("VRAIMENT")


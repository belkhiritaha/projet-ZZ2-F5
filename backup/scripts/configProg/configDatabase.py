
def configDatabaseEnvVar (contenu, technology):


    if technology == "influxdb":

        contenu[0]['services'][technology]['environment'] = ['INFLUXDB_DB=influx',
                                                             'INFLUXDB_ADMIN_USER=$USER',
                                                             'INFLUXDB_ADMIN_PASSWORD=$USER']

    print('AAAAAAAAAAAAAAAAA')



def configDatabase(contenu, technology, pathToVolume):



    contenu[0]['services'] = {
                                technology: 
                                    {
                                        'image' : technology, 
                                        'container_name': technology,
                                        'restart': 'always', 
                                        'hostname': technology, 
                                        'ports': ['8086:8086'],
                                        'volumes': [pathToVolume]
                                     }
                             }


    print("ISIMA")

    configDatabaseEnvVar(contenu, technology)


#Formatiser la path ou on veut garder la database
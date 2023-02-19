
def configDatabase(contenu, technology):

    if technology == "influxdb":

        technology2 = "influxdb:2.1.1"
        pathToVolume = 'influxdb-storage:/var/lib/influxdb2:rw'

    contenu[0]['services'] = {
                                technology: 
                                    {
                                        'image': technology2, 
                                        'volumes': [pathToVolume],
                                        'env_file': ['.env'],
                                        #'entrypoint': '["./entrypoint.sh"]',
                                        'restart': 'always', 
                                        'ports': ["8086:8086"],
                                        'labels': {'kompose.service.type':'nodeport'}
                                     }
                             }




#Formatiser la path ou on veut garder la database
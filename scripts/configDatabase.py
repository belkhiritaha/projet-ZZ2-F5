
def configDatabase(contenu, technology, pathToVolume):

    contenu[0]['services'] = {
                                technology: 
                                    {
                                        'image' : technology, 
                                        'container_name': technology,
                                        'restart': 'on_failure', 
                                        'hostname': technology, 
                                        'volumes': [pathToVolume]
                                     }
                             }


    print("ISIMA")
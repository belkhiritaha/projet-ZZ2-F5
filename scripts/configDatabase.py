
def configDatabase(contenu, technology, pathToVolume):



    contenu[0]['services'] = {
                                technology: 
                                    {
                                        'image' : technology, 
                                        'container_name': technology,
                                        'restart': 'always', 
                                        'hostname': technology, 
                                        'volumes': [pathToVolume]
                                     }
                             }


    print("ISIMA")



#Formatiser la path ou on veut garder la database

def configDataVisualisation(contenu, technology, database, pathToTechnology):

    contenu[0]['services'][technology] = {
                              'image': technology + '/' + technology, 
                              'depends_on': [database],                     # le système de database est nécessaire
                              'container_name': technology, 
                              'restart': 'always',
                              'ports': ['3000:3000'],                       # port pour accéder à l'interface web de Grafana
                              'links': [database +':'+ database], 
                              'volumes':[pathToTechnology]
                             }

    print("C'EST")



#formatiser le path de la techno qu'on veut pour visualiser la data

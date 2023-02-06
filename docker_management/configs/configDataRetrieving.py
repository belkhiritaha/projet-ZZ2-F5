
def configDataRetrieving (contenu, technology, database):

    if technology == "telegraf":

        technology2 = "telegraf:1.19"

    contenu[0]['services'][technology] = {
                              'image': technology2, 
                              'env_file': ['.env'],
                              'restart': 'always',
                              'depends_on': [database],            # le système de database est nécessaire pour le système de data retrieving
                              'ports': ["5000:5000"],
                              'labels': {'kompose.service.type': 'nodeport'}
                             }
                   

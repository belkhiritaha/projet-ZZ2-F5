import yaml

import os.path

def configEnv(user, passwd):
    data = []

    data.append({'USER': user})
    data[0]['PASSWORD'] = passwd


    fichier = open("configFiles/.env","w")
    yaml.dump_all(data, fichier, sort_keys=False)
    fichier.close()
import yaml

import os.path


def create_env(user, app, passwd):
    data = []

    data.append({'USER': user})
    data[0]['PASSWORD'] = passwd

    path ="users/" + user + "/" + app + "/.env"

    fichier = open(path,"w+")

    yaml.dump_all(data, fichier, sort_keys=False)
    fichier.close()
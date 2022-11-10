
def configDataVisualisation(contenu, technology, database, pathToTechnology):

    contenu[0]['services'][technology] = {
                                            'image': technology + '/' + technology,     # le système de database est nécessaire
                                            'depends_on': [database],
                                            'container_name': technology,
                                            'restart': 'always',                        # port pour accéder à l'interface web de Grafana
                                            'ports': ['3000:3000'],
                                            'links': [database],
                                            'volumes': [pathToTechnology]
    }

    envUser = "GF_SECURITY_ADMIN_USER : $USER"
    envPasswd = "GF_SECURITY_ADMIN_PASSWORD : $PASSWORD"

    if technology == "grafana":
        contenu[0]['services'][technology]['environnement'] = [envUser, envPasswd]

    print("C'EST")

#formatiser le path de la techno qu'on veut pour visualiser la data

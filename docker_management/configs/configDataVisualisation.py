
def configDataVisualisation(contenu, technology, database):

    if technology == "grafana":

        technology2 = "grafana/grafana-oss:8.4.3"
        pathToTechnology = "grafana-storage:/var/lib/grafana:rw"

    contenu[0]['services'][technology] = {
                                            'image': technology2,     # le système de database est nécessaire
                                            'volumes': [pathToTechnology],
                                            'depends_on': [database],
                                            'restart': 'always',                        # port pour accéder à l'interface web de Grafana
                                            'ports': ["3000:3000"],
                                            'labels': {'kompose.service.type': 'nodeport'}
    }




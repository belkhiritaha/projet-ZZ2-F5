
import subprocess
from pathlib import Path
import sys


#supprimer une app
def delete_app_api(user, app):

    path_app = Path('../users/' + user + '/'+ app)


    #supprimer les deployments
    status = subprocess.run(["kubectl", "get", "deployment", "--namespace="+user+app], stdout=subprocess.PIPE)
    status = status.stdout.decode('utf-8')
    status = status.split("\n")

    for i in status:
        if i != "":
            i = i.split(" ")
            while "" in i:
                i.remove("")
            subprocess.run(["kubectl", "delete", "deployment", i[0], "--namespace="+user+app])

    #supprimer le namespace
    subprocess.run(["kubectl", "delete", "namespace", user+app])

    #supprimer le dossier de l'app
    subprocess.run(["rm", "-rf", path_app])
    return 0 


delete_app_api(sys.argv[1],sys.argv[2])
print ("done")
import subprocess
from pathlib import Path
import sys


#afficher en détail le status d'une app
def check_status_app(user, app):

    status = subprocess.run(["kubectl", "get", "deployment", "--namespace="+user+app], stdout=subprocess.PIPE)

    print(status.stdout.decode('utf-8'))
                
    return 0

#renvoyer si tout les pods sont en cours d'execution
def isAllRunning(user, app):
    status = subprocess.run(["kubectl", "get", "pods", "--namespace="+user+app], stdout=subprocess.PIPE)
    status = status.stdout.decode('utf-8')
    status = status.split(" ")
    for i in status:
        if i == "Terminated" or i == "Error" or i == "CrashLoopBackOff":
            print("All pods are not running")
            return False
    print("All pods are running")
    return True


if __name__ == "__main__":
    if len(sys.argv) == 3:
        check_status_app(sys.argv[1], sys.argv[2])
    else:
        print("Error: wrong number of arguments")
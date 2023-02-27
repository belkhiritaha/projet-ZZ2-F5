import subprocess
from pathlib import Path

#retourner les ip des services
def get_ip(user, app):
    status = subprocess.run(["kubectl", "get", "services", "--namespace="+user+app], stdout=subprocess.PIPE)
    status = status.stdout.decode('utf-8')
    status = status.split("\n")
    ip = []
    for i in status:
        if i != "":
            i = i.split(" ")
            while "" in i:
                i.remove("")
            if i[0][0] != "p":
                ip.append(i[2])
    return ip
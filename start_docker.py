#!/usr/bin/env python
import subprocess

def main():
    print("Quel dossier (avec le '/'final) ?")
    path = input()
    path_kube = path + 'kube_files/'
    print (path_kube, path)

    #Start the docker into K8s
    kubectl = subprocess.run(["kubectl", "apply", "-f", path_kube])
    service = subprocess.run(["minikube service --all | grep http"], shell=True)

    return 0


if __name__ == '__main__':
    main()
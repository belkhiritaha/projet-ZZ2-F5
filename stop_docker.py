#!/usr/bin/env python
import subprocess

def main():
    print("Quel dossier (avec le '/'final) ?")
    path = input()
    path_kube = path + 'kube_files/'
    print (path_kube, path)

    #Start the docker into K8s
    kubectl = subprocess.run(["kubectl", "delete", "-f", path_kube])

    return 0


if __name__ == '__main__':
    main()
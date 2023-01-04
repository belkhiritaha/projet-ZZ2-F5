#!/usr/bin/env python
import subprocess

def main():
    print("Quels docker-compose ?")
    path = input()
    path_kube = path + 'kube_files/'
    print (path_kube, path)

    #Start the docker into K8s
    kubectl = subprocess.run(["kubectl", "apply", "-f", path_kube])

    return 0


if __name__ == '__main__':
    main()
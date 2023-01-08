#!/usr/bin/env python
import subprocess
import glob

def main():
    print("Quel dossier (avec le '/'final) ?")
    path = input()
    path_docker = path + 'docker-compose.yml'
    path_kube = path + 'kube_files/'
    print (path_docker, path_kube, path)

    #Create kubernetes .yaml files
    result = subprocess.run(["kompose", "convert", "-f", path_docker])
    create_dir = subprocess.run(["mkdir", path_kube])
    move = subprocess.run(['mv'] + glob.glob('*.yaml') + [path_kube])

    return 0


if __name__ == '__main__':
    main()
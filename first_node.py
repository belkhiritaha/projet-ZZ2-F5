#/usr/local/bin/python3

import subprocess

cmd = "curl -sfL https://get.k3s.io | sh -"

def first_node():
    print("Vous allez créer le 1er noeud de votre cluster k3s")

    process = subprocess.run(cmd.split(), shell=True)
    print(process.stdout)
    print(process.stderr)

first_node()

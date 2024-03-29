#!/bin/bash

#Install curl and docker file
sudo apt update -y && sudo apt install curl docker.io docker-compose

#Install minikube and clear after install
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
echo "fin minikube"
rm -rf minikube-linux-amd64

#Install kubectl and clear after install
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x ./kubectl
echo "fin kubectl"
sudo mv ./kubectl /usr/local/bin/kubectl

#Install Kompose
curl -L https://github.com/kubernetes/kompose/releases/download/v1.26.0/kompose-linux-amd64 -o kompose
chmod +x kompose
echo "fin compose"
sudo mv ./kompose /usr/local/bin/kompose

#1er démarage et extinction de minikube pour test
minikube start
minikube stop

echo "Fin de l'installation des composants nécessaires !"
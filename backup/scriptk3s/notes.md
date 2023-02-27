## A good video to watch first
`https://youtu.be/7bA0gTroJjw`


# Install minikube
`curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64`

`sudo install minikube-linux-amd64 /usr/local/bin/minikube`


# Start local cluster
`minikube start`


# Install kubectl binary
`curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl`

`chmod +x ./kubectl`

`sudo mv ./kubectl /usr/local/bin/kubectl`


# Install Kompose
`curl -L https://github.com/kubernetes/kompose/releases/download/v1.26.0/kompose-linux-amd64 -o kompose`

`chmod +x kompose`

`sudo mv ./kompose /usr/local/bin/kompose`


# Convert a docker compose file to to kubernetes resources
Place yourself in the directory containing the docker compose file and run
`kompose convert`
This will generate a {service}-service.yaml and a {service}-deployment.yaml for each service in the docker compose file

`kubectl apply -f {service1}-service.yaml, {service1}-deployment.yaml, {service2}-service.yaml, {service2}-deployment.yaml`


# Access the resources
`minikube service {service_name}

# Useful commands

Pause Kubernetes without impacting deployed applications:
`minikube pause`

Unpause a paused instance:
`minikube unpause`

Halt the cluster:
`minikube stop`

Change the default memory limit (requires a restart):
`minikube config set memory 9001`

Browse the catalog of easily installed Kubernetes services:
`minikube addons list`

Create a second cluster running an older Kubernetes release:
`minikube start -p aged --kubernetes-version=v1.16.1`

Delete all of the minikube clusters:
`minikube delete --all`


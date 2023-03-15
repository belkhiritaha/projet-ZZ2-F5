# How to start each programs
## start_k7s.sh: 
    Does not need any args, start minikube with one add-on and the dashboard

## create_docker_files.py:
    Create the file used by K8s into a kube_files folder.
    Run 
``python3 create_docker_files.py [user] [app]``

## start_docker.py:
    Start the docker into minikube, using the file generated before.
    Run 
``python3 start_docker.py [user] [app]``

## delete_docker.py:
    Remove the docker from minikube, without deleting the app folder
    Run
``python3 delete_docker.py [user] [app]``

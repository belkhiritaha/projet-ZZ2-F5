#To run the example:

`kompose convert`

`kubectl apply -f frontend-deployment.yaml,frontend-tcp-service.yaml,redis-master-deployment.yaml,redis-master-service.yaml,redis-slave-deployment.yaml,redis-slave-service.yaml`

#List the resources:

`kubectl get all`


#Access the frontend service:

`minikube service frontend-tcp`
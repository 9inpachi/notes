# Kubernetes

Kubernetes is a tool for deploying, scaling and monitoring containerized applications across multiple clusters. It makes it super simple to deploy highly available applications by taking care of the infrastructure.

It is a container centric infrasturture which can run applications on physical and virtual machines and also on the cloud.

## Links

- <https://www.tutorialspoint.com/kubernetes>

## Concepts

- **Pod:** A pod is a group of one or more containers, with shared storage and network resources, and a specification for how to run the containers. (Something like docker compose?)
- **Node:** A physical or virtual worker machine on which pods run.

## Architecture

![Kubernetes Components](./components-of-kubernetes.svg)

### Control Plane

Control plane's components make global decisions for the cluster (like scheduling) in addition to detecting and responding to cluster events.

- **kube-apiserver:** An API server that exposes the Kubernetes API which is the frontend of Kubernetes control plane.
- **etcd:** A highly available key value store used for storing all cluster data.
- **kube-scheduler:** A component that watches for newly created pods and selects a node for them to run on.
- **kube-controller-manager:** Runs controller processes. Controllers are controlled loops that watch the state of a cluster through apiserver and make changes to move the current state to the desired state.
- **cloud-controller-manager:** Runs controllers specific to cloud providers to link clusters to the cloud provider's API.

### Node

Node components run on every node to maintain running pods and providing Kubernetes runtime environment.

- **kubelet:** Agent that runs on each node in the cluster to make sure that containers are running in a pod.
- **kube-proxy:** Maintains network rules on nodes which allow networking to pods from network sessions inside or outside the cluster.
- **Container Runtime:** Responsible for managing the execution and life cycle of containers within the Kubernetes environment.

## Setup

```sh
scoop install -g minikube
scoop install -g kubectl
minikube start
kubectl get po -A
```

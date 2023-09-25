# Kubernetes

Kubernetes is a tool for deploying, scaling and monitoring containerized applications across multiple clusters. It makes it super simple to deploy highly available applications by taking care of the infrastructure.

It is a container centric infrasturture which can run applications on physical and virtual machines and also on the cloud.

- [Links](#links)
- [Setup](#setup)
- [Architecture](#architecture)
  - [Control Plane](#control-plane)
  - [Node](#node)
- [Concepts](#concepts)
- [Using Kubectl](#using-kubectl)

## Links

- <https://spacelift.io/blog/kubernetes-tutorial>
- <https://kubernetes.io/docs/concepts/overview/components/>
- <https://kubernetes.io/docs/tutorials/>

## Setup

Since [creating a cluster manually](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/) requires a lot of effort, we can use minikube which is a kubernetes distribution containing all kubernetes components. It also includes kubectl.

```sh
scoop install -g minikube
```

Start the cluster.

```sh
minikube start
```

**Note:** Make sure to `minikube delete` to cleanup any previous traces of the cluster.

Install kubectl separately using scoop or use minikube's kubectl.

```sh
minikube kubectl --
```

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

## Concepts

- **Pod:** A pod is a group of one or more containers, with shared storage and network resources, and a specification for how to run the containers. (Something like docker compose?)
- **Node:** A physical or virtual worker machine on which pods run.
- **Namespace:** Used to isolate groups of resources.
- **ReplicaSets:** Used to consistently replicate a pod and guarantees availability of a set number of replicas.
- **Deployment:** Higher level of abstraction for replica sets with support for declarative updates and rollbacks. Deployment objects can be used to specify the desired state of a set of pods.
- **Service:** Used to expose pods to the network for access to pods within the cluster or externally.
- **Ingress:** Closely related objects used to set up HTTP routes to services via a load balancer.
- **Job:** An object that creates a set of pods and waits for them to terminate. Provides a mechanism for running ad-hoc tasks in the cluster. Kubernetes also provides cron jobs which are a higher level abstraction of jobs.
- **Volume:** Mount external file storage inside pod.

## Using Kubectl

Create a pod.

```sh
kubectl run nginx --image nginx:latest
```

Create a deployment.

```sh
kubectl create deployment nginx --image nginx:latest --replicas 2
```

Get pods.

```sh
kubectl get pods
```

Scale a deployment.

```sh
kubectl scale deployment nginx --replicas 1
```

Expose a service.

```sh
kubectl expose deployment/nginx --port 80 --type NodePort
```

**Note:** `--type NodePort` exposes the service on the specified port of the node running the pods.

Get service details.

```sh
kubectl get services
kubectl get nodes -o wide
```

Get service URL through kubectl.

```sh
# Get the node URL.
kubectl get nodes -o wide
# Get the service port.
kubectl get services
```

Forward port to localhost.

```sh
kubectl port-forward service/nginx 8080:80
```

Get service URL through minikube.

```sh
minikube service nginx --url
```

Delete and cleanup resources.

```sh
kubectl delete service nginx
kubectl delete deployment nginx
```

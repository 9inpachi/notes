# Kubernetes

Kubernetes is a tool for deploying, scaling and monitoring containerized applications across multiple clusters. It makes it super simple to deploy highly available applications by taking care of the infrastructure.

It is a container centric infrasturture which can run applications on physical and virtual machines and also on the cloud.

## Concepts

- **Pod:** A pod is a group of one or more containers, with shared storage and network resources, and a specification for how to run the containers. (Something like docker compose?)
- **Node:** A physical or virtual worker machine.

## Architecture

![Kubernetes Components](./components-of-kubernetes.svg)

### Control Plane

Control plane's components make global decisions for the cluster (like scheduling) in addition to detecting and responding to cluster events.

- **kube-apiserver:** An API server that exposes the Kubernetes API which is the frontend of Kubernetes control plane.
- **etcd:** A highly available key value store used for storing all cluster data.
- **kube-scheduler:** A component that watches for newly created pods and selects a node for them to run on.

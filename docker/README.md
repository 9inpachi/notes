# Docker

## Set up docker getting-started

```
docker run -p 80:80 docker/getting-started
```

Now navigate to http://localhost for all the docs

## Key concepts

Container: An isolated filesystem where we can set up our own environment
Container Image: An image that has an already set up container environment

## Build a new image

1. Create a file named `Dockerfile` in your working directory.

```
# Start from the node:12-alpine container image
FROM node:12-alpine

# Set the working directory inside the docker container filesystem
WORKDIR /app

# Copy data from current directory in host to docker container filesystem
COPY . .

# Run a command
RUN yarn install:dependencies

# A directive that will directs to run "yarn start" on the docker run command
CMD ["yarn", "start"]
```

2. In your working directory, run this command to build the image using the Dockerfile.

```
# docker build [OPTIONS] PATH | URL | -
docker build -t test-image .
```

The `-t` refers to the image tag.

3. Run the container.

```
docker run -p 4200:4200 test-image
# docker run -p <host_port>:<container_port> <image_name>
```

The `-p` option is for port mapping of host and container.
The `-d` option is for running the container "detached" which means the container will run in background.

4. Tag and push the image

```
# Tag the image > docker tag <local_image_name> <remote_image_name>:<tag>
docker tag test-image 9inpachi/phoenix:latest

# Push the image to docker hub
docker login -u 9inpachi
docker push 9inpachi/phoenix
```

## Run a command

To simply run a single command in a container.

```sh
# docker exec <container_id> <command>
docker exec abcd1234 cat /file.txt
```

## Reference commands

```
sudo docker run -d -p 80:80 docker/getting-started
code Dockerfile
docker build -t phoenix-image .
sudo docker build -t phoenix-image .
docker run -p 4200:4200 phoenix-image
sudo docker run -p 4200:4200 phoenix-image
sudo docker ps
sudo docker port 8d27bdef0e61
sudo docker stop 8d27bdef0e61
sudo docker rm d22db23842ac
 # Stop and remove the image
sudo docker rm -f d22db23842ac
sudo docker image ls
 # Tag local image for pushing
sudo docker tag phoenix-image 9inpachi/phoenix
sudo docker login -u 9inpachi
sudo docker push 9inpachi/phoenix
```


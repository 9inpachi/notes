# Docker volumes

## Named volume

Used to connect specific filesystem paths of the container to the host machine.

1. Create the volume.

To create a volume at a host machine location handled by docker.

```sh
docker volume create todo-db
```

2. Map the host todo-db volume to a directory in docker container.

```sh
docker run -dp 3000:3000 -v todo-db:/etc/todos getting-started
```

`-v` option os used to define the volume and mapping to use. `getting-started` is a simple docker container with a todo app.

3. Make some changes to persist in the container.

Go to todo app and add a todo.

4. Remove the existing todo `getting-started` container.

```sh
docker rm -f <container_id>
```

5. Perform step 2 again and the todo data should be persisted.

## Checking volume

To check the volume info along with its mount path.

```sh
# docker volume inspect <volume_name>
docker volume inspect todo-db
```

## Bind mounts

Used to connect a specified host machine path to the path of the container.

To run a container with a binded mount. Go to the sample `docker-app` project directory and use this command.

```sh
docker run -dp 3000:3000 \
-w /app -v "$(pwd):/app" \
node:12-alpine \
sh -c "yarn install && yarn dev"
```

`-w` sets the current working directory inside the container where commands will run.
`-v` binds the current directory to `/app` in the container.
`sh -c` runs a command (`-c`) using shell (`sh`).

## Checking logs

```sh
docker logs -f <container_id>
```

`-f` for watching the container logs.

## Reference commands

```sh
docker volume create todo-db
docker volume ls
docker volume rm todo-db
docker run -dp 3000:3000 -v todo-db:/etc/todos getting-started
docker logs -f ab4b0058f2b8b2268c7d78b02fcb60dfe0738a1cc96be089fe9bd990498ada14
docker logs ab4b0058f2b8b2268c7d78b02fcb60dfe0738a1cc96be089fe9bd990498ada14
docker run -dp 3000:3000 -w /app -v "$(pwd):/app" node:12-alpine sh -c "yarn install && yarn run dev"
```


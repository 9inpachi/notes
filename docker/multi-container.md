# Multi-container apps

## Container networking

1. Create the network.

```sh
docker network create todo-app
```

2. Create database container in the network.

```sh
docker run -d \
--network todo-app --network-alias mysql \
-v todo-mysql-data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=secret \
-e MYSQL_DATABASE=todos \
mysql:5.7
```

`--network` the network the container is a part of.
`--network-alias` hostname of the container to access it through the network.
`-v` will automatically create the volume if it doesn't exist.
`-e` environment variables.

To check on which IP the container is running.

Run netshoot container.

```sh
docker run -it --network todo-app nicolaka/netshoot
```

And then type `dig mysql` to get the IP.

3. Run the app in the network.

```sh
docker run -dp 3000:3000 \
-w /app -v "$(pwd):/app" \
--network todo-app \
-e MYSQL_HOST=mysql \
-e MYSQL_USER=root \
-e MYSQL_PASSWORD=secret \
-e MYSQL_DB=todos \
node:12-alpine \
sh -c "yarn install && yarn dev"
```


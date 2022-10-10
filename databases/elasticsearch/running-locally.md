# Running Elasticsearch Locally

1. Pull the docker image.

   ```sh
   docker pull docker.elastic.co/elasticsearch/elasticsearch:8.4.3
   ```

2. Create a new network for Elasticsearch and Kibana.

   ```sh
   docker network create elastic
   ```

3. Start the Elasticsearch container. A password is generated for the `elastic` user. Scroll a bit up to find it. It also has instructions on how to reset the password.

   ```sh
   docker run --name es01 --net elastic -p 9200:9200 -p 9300:9300 -it docker.elastic.co/elasticsearch/elasticsearch:8.4.3
   ```

   - The container may not start initially because of a memory error. Fix it by increasing the max memory virtual areas.

     ```sh
     wsl -d docker-desktop # This will start the terminal for the docker-desktop VM.
     sysctl -w vm.max_map_count=262144
     ```

4. Copy the password and enrollment token and save them somewhere. These values only show when starting Elasticsearch for the first time. The enrollment token is used to join some cluster.
5. Copy the security certificate from the docker container to make secure requests.

   ```sh
   docker cp es01:/usr/share/elasticsearch/config/certs/http_ca.crt .
   ```

6. In a new terminal, make an authenticated call using the certificate and password to verify that Elasticsearch cluster can be reached.

   ```sh
   curl --cacert http_ca.crt -u elastic https://localhost:9200
   ```

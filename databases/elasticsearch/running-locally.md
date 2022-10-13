# Running Elasticsearch Locally

[Official Docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/run-elasticsearch-locally.html)

## Start Elasticsearch

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
     # This will start the terminal for the docker-desktop VM.
     wsl -d docker-desktop
     sysctl -w vm.max_map_count=262144
     ```

4. Copy the password and enrollment token and save them somewhere. These values only show when starting Elasticsearch for the first time. The enrollment token is used to join some cluster.
5. Copy the security certificate from the docker container to make secure requests.

   ```sh
   docker cp es01:/usr/share/elasticsearch/config/certs/http_ca.crt .
   ```

6. In a new terminal, make an authenticated call using the certificate and password to verify that Elasticsearch cluster can be reached.

   ```sh
   # Be sure to add the `--ssl-no-revoke` option on Windows. Ugh.
   curl --cacert http_ca.crt -u elastic https://localhost:9200
   ```

## Start Kibana

Once Elasticsearch is running, we can start Kibana.

1. Pull the docker image.

   ```sh
   docker pull docker.elastic.co/kibana/kibana:8.4.3
   ```

2. Run Kibana.

   ```sh
   docker run --name kibana --net elastic -p 5601:5601 docker.elastic.co/kibana/kibana:8.4.3
   ```

3. Once Kibana is running, open the generated URL in the browser.
   1. Copy the enrollment token from the Elasticsearch start logs and paste it in Kibana.
   2. Then login to Kibana using the username `elastic` and password from the Elasticsearch start logs.

## Starting Stopped Containers

1. Start the Elasticsearch container.

   ```sh
   docker start -ia es01
   ```

2. Start the Kibana container.

   ```sh
   docker start -ia kibana
   ```

Note that `es01` and `kibana` are the name of the containers set with the `--name` option earlier.

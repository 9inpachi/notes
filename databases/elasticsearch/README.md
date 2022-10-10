# Elasticsearch

[Official Docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/)

## Basic Concepts

- **Node:** A single instance of Elasticsearch.
- **Cluster:** Multiple Elasticsearch nodes clustered together. Data can be accessed from any node in the cluster.
- **Document:** The stored data which is a collection of fields.
- **Index:** Can be thought of as an optimized collection of documents and each document is a collection of fields, which are key-value pairs that contain data.
  - This is what is used to index and search data.
- **Shards:** A node contains multiple physical shards. An index (documents in an index) can be distributed across multiple shards.
  - Data can be accessed in parallel from these shards.
  - Shards have replicas distributed across multiple nodes which helps with availability.

## Searching Data

Types of queries the REST API supports:

1. Structured queries.
2. Full-text queries.
3. Complex queries that combine the two.

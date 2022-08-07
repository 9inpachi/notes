# System Design

## Terms

- **Horizontal Scaling:** Add additional nodes/servers horizontally so the load is distributed.
- **Vertical Scaling:** Adding resources to an already existing node/server.

## Databases Paradigms

Useful video: <https://youtu.be/W2Z7fbCLSTw>

1. **Key-Value Store**
   - Data stored in memory.
   - Used for caching, pub/sub (publish/subscribe) etc.
   - Fast but no data modeling options.
   - **Examples:** Redis, memcached.
2. **Wide-Column Database**
   - NoSQL.
   - Organizes data into flexible columns that are divided among row keys.
   - Can be spread across multiple servers or database nodes. Scales horizontally.
   - Not normally used as a primary database. Is useful for specific cases.
   - **Examples:** Cassandra, HBASE.
3. **Document Database**
   - Contains documents of key-value pairs.
   - Unstructured and don't require a schema.
   - Documents are a part of a collection.
   - Very general-purpose.
   - **Examples:** MongoDB, Firebase, DynamoDB.
4. **Relational Database**
   - Structured data with a pre-defined schema.
   - Contains relational data. (Primary key, foreign key, JOINs etc.)
   - SQL.
   - Consists of tables, rows and columns.
   - ACID: Atomicity, Consistency, Isolation, Durability.
   - **Examples:** PostgreSQL, MySQL, SQL Server.
5. **Graph Database**
   - Data represented as nodes.
   - Relationship represented with edges.
   - Nodes and edges are connected.
   - **Examples:** Neo4j.
6. **Search Database**
   - Mostly based on Apache Lucene.
   - Optimized for search.
   - Creates index of searchable terms.
   - For search engines.
   - **Examples:** Solr, ElasticSearch, Algolia, Meilisearch.
7. **Multi-MOdel Database**
   - Data is described through GraphQL.
   - Fauna automatically creates collections from GraphQL schema to store data and index to query data.
   - Uses multiple database paradigms based on what is required.
   - **Examples:** Fauna.
8. **Time-Series Database**
   - Optimized for processing time series data.
   - A time-series has a name and an optional set of labels.
   - Contains pairs ordered by timestamp.
   - **Examples:** InfluxDB, Apache Druid, MongoDB.
9. **Data Warehouse**
   - Central repositories of integrated data from one or more disparate sources.
   - For data analytics and business decisions.
   - Core component of business intelligence.
   - **Examples:** Oracle, Teradata.

# Database Replication

## Reason

Database replication is needed for large scale systems where a single database may not be able to support all the load.

## Command and Query Responsibility Segregation (CQRS)

Since reads happen a lot more than writes in a database, reads and writes can be separated from each other.

- Reads and writes are handled by different databases.
- There are multiple replicas of read databases which are kept in sync with a primary database where data is being written.
- Gives rise to issues like data inconsistency and synchronization.

## Different Ways to Replicate Database

- **Separated by reads and writes**. Having a primary database for writes and creating read replicas out of it.
- **Database sharding**. In sharding, the data is divided/partitioned into smaller chunks across multiple database nodes.
  - In **vertical sharding**, the data is partitioned by columns. For example, we keep half columns in one database node and half in another.
  - In **horizontal sharding**, the data is partitioned by rows. For example, half of the data rows exist in one database node and half in another.
  - After sharding, we have to create another layer of abstraction to point to the right data so the retrieval of data is fast.

## Ways to Synchronize Replicated Databases

- **Statement Based Replications:** Send and run write queries on read replicas.
  - Better way to do this is to make another query out of the inserted data and send it. Because the replica database will not have to search for the rows the data was added/changed in.
- **Binary Replication:** Binary output of the added data is transferred to the read replicas.
- **Logical Replication:** Replicating data based on replication identity (primary key).
- **Synchronous Replication:** Data commit success is reported back to the client only when all replicas have been updated.
- **Asynchronous Replication:** Data commit success is reported back to the client after success on the primary database. The replicas are updated asynchronously.
  - Has **eventual consistency**. The data may not be updated right away but eventually will.
- **One Directional:** Write to one database and that pushes changes to read replicas. Writing is not allowed to read replicas.
  - A disadvantage is that it doesn't allow scaling writes.
- **Two Directional:** Can issue writes to read replicas which allows scaling of writes.
  - Disadvantage is that conflicts arise when syncing the databases together since two databases were being written to simultaneously.

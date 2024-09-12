# The Graph

## References

- <https://thegraph.com/docs/en/about/>
- <https://www.youtube.com/watch?v=EJ2em_QkQWU>

## Introduction

The Graph is a protocol for indexing and querying data from blockchain networks. It allows developers to build and deploy decentralized applications (dApps) that can query and analyze data from blockchain networks.

It's a decentralized way for reading data from blockchain networks.

- It's cheap.
- Has redundancy (fallback to other nodes).
- Has an open API.

## Concepts

- **Subgraph**: A subgraph is a self-contained database that is created by indexing a specific blockchain network. It is a collection of data that is relevant to a particular dApp or project.
- **Query**: A query is a request for data from a subgraph. It is made using a GraphQL API.
- **Entity**: An entity is a type of data that is indexed by a subgraph. For example, a token is an entity.
- **Field**: A field is a property of an entity. For example, a token has a name, symbol, and total supply.
- **Filter**: A filter is a condition that is applied to an entity. For example, you can filter tokens by their name or symbol.
- **Aggregate**: An aggregate is a function that is applied to a set of entities. For example, you can aggregate the total supply of all tokens in a subgraph.

## Subgraph

Subgraphs are instructions for indexers. It's used to isolate data from the full graph to only the data that the subgraph needs.

### Configuring a Subgraph

- **subgraph.yaml**: This is the main configuration file for a subgraph. It is used to define the structure of the subgraph with entities, fields, and other configurations for a subgraph.
- **schema.graphql**: This is the GraphQL schema for a subgraph. It is used to define the entities/types that are queried from a subgraph and the blockchain network.
- **mapping.ts**: The mapping file has functions that are used to transform the data from when interacting with the subgraph.

## Setup

1. Install the Graph CLI.

```sh
npm install -g @graphprotocol/graph-cli
```

2. Initialize a new subgraph.

```sh
graph init --studio example
```

3. Select the mainnet Ethereum network.
4. Give the contract address of the `CryptoPunks` contract (0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb).
5. If fetching doesn't work, then go to https://miniscan.xyz/ and get the ABI of the contract.
6. Copy the ABI into the `crypto-punks.json` file and specify the file path to the CLI.
7. Get the start block of the `CryptoPunks` contract from https://miniscan.xyz/ and specify the block number to the CLI.
8. Run the stack locally.

```sh
docker compose up
```

9.In another terminal, create the node.

```sh
graph create --node http://localhost:8020/ example
```

10. Generate the types and build the project.

```sh
graph codegen
graph build
```

10. Deploy the subgraph.

```sh
graph deploy --node http://localhost:8020/ --ipfs http://localhost:5001 example
```

11. Open the GraphiQL interface to query the subgraph: <http://localhost:8000/subgraphs/name/example/graphql>
12. Use the GraphQL explorer to query the data.

```gql
query {
  punkTransfers(where: {}) {
    transactionHash
    punkIndex
    id
    from
  }
}
```

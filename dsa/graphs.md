# Graphs

<https://www.programiz.com/dsa/graph>

## Graph

A graph is a collection of nodes with data which are connected through edges.

```text
V (Vertices/Nodes) = { 1, 2, 3 }
E (Edges) = { { 1, 2 }, { 2, 3 } }
G (Graph) = { V, E }
```

### Terminologies

**Adjacency:** A vertex/node is adjacent to another vertex/node if there is an edge connecting them.

**Path:** A sequence of edges between two vertices.

**Directed Graph:** A graph in which each edge has a direction. That is, an edge { u, v } doesn't mean that there is an edge { v, u } as well. The edges have an arrow to indicate their direction.

**Connected Graph:** A graph in which each vertex is connected to every other vertex through a path.

### Graph Representation

#### Adjacency Matrix

An adjacency matrix is a 2D array of V x V vertices. Each row and column represent a vertex.

If the value of `matrix[i][j]` is `1`, then the vertices at `i` and `j` are adjacent and connected to each other.

|     | 0   | 1   | 2   |
| --- | --- | --- | --- |
| 0   | 0   | 1   | 0   |
| 1   | 1   | 0   | 0   |
| 2   | 1   | 0   | 0   |

An edge (0, 2) means that there is also an edge (2, 0) since this is an undirected graph. Edge lookup to check if two vertices are connected is very fast through this but takes memory/space.

#### Adjacency List

An adjacency list represents a graph as an array of linked lists. The array index of the list represents a vertex and each element in its linked list represents a connection to (or an edge with) another vertex or array index.

```
[0] -> [1 -> 2] (0 is adjacent to 1 and 2)
[1] -> [0 -> 2]
[2] -> [0 -> 1 -> 3]
[3] -> [2]
```

### Spanning Tree

A spanning tree is a sub-graph of a connected and undirected graph which includes all the vertices with the minimum possible number of edges.

The total number of spanning trees that can be created from a complete graph of `n` vertices is `n^(n-2)`.

#### Minimum Spanning Tree

A minimum spanning tree is a spanning tree in which the sum of the weight of the edges is as minimum as possible.

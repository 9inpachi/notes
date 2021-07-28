package graph;

/**
 * Youtube: https://www.youtube.com/watch?v=FtN3BYH2Zes
 */
public class BellmanFord {
  static class Edge {
    public int source, dest, weight = 0;

    Edge() {}

    Edge(int source, int dest, int weight) {
      this.source = source;
      this.dest = dest;
      this.weight = weight;
    }
  }

  static class Graph {
    // Single edge structure: [sourceVertex, destinationVertex, edgeWeight]
    public Edge[] edges;
    public int verticesCount;

    Graph(int vertices, int edgesCount) {
      verticesCount = vertices;
      edges = new Edge[edgesCount];
      
      for (int i = 0; i < edgesCount; i++) {
        edges[i] = new Edge();
      }
    }

    public void bellmanFord(int vertex) {
      int[] dist = new int[verticesCount];

      // Step 1: Fill all vertices with infinite value.
      for (int i = 0; i < verticesCount; i++) {
        dist[i] = Integer.MAX_VALUE;
      }
      // Set the vertex value of the starting vertex to 0 to start the process.
      dist[vertex] = 0;

      // Step 2: Relax the edges by iterating |V| - 1 (vertices - 1) times over
      // all of the edges and calculating source and destination weights based on edge weight.
      for (int i = 0; i < verticesCount - 1; i++) {
        // Iterate over all edges.
        for (int j = 0; j < edges.length; j++) {
          Edge edge = edges[j];
          int destWeight = dist[edge.source] + edge.weight;
          if (dist[edge.source] != Integer.MAX_VALUE && (destWeight < dist[edge.dest])) {
            dist[edge.dest] = destWeight;
          }
        }
      }

      // Step 3: Make sure there is not a negative cycle by iterating again and
      // making sure the weights don't change because they should not change after |V| - 1 iterations.
      for (int j = 0; j < edges.length; j++) {
        Edge edge = edges[j];
        int destWeight = dist[edge.source] + edge.weight;
        if (dist[edge.source] != Integer.MAX_VALUE && (destWeight < dist[edge.dest])) {
          throw new RuntimeException("The graph has a negative cycle. Cannot use Bellman Ford's algorithm.");
        }
      }

      printWeights(dist);
    }

    void printWeights(int[] dist) {
      for (int i = 0; i < dist.length; i++) {
        System.out.println("vertex=" + i + ", weight=" + dist[i]);
      }
    }
  }

  public static void main(String[] args) {
    Graph graph = new Graph(4, 5);

    graph.edges[0] = new Edge(0, 1, 5);
    graph.edges[1] = new Edge(0, 2, 4);
    graph.edges[2] = new Edge(1, 3, 3);
    graph.edges[3] = new Edge(2, 1, 6);
    graph.edges[4] = new Edge(3, 2, 2);

    graph.bellmanFord(0);
  }
}

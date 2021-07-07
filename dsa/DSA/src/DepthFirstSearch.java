import java.util.Iterator;
import java.util.LinkedList;

public class DepthFirstSearch {
  static class Graph {
    private LinkedList<Integer>[] adjacencyList;
    private boolean[] visited;

    Graph(int vertices) {
      adjacencyList = new LinkedList[vertices];
      visited = new boolean[vertices];

      for (int i = 0; i < vertices; i++) {
        adjacencyList[i] = new LinkedList<Integer>();
      }
    }

    Graph addEdge(int src, int dest) {
      adjacencyList[src].push(dest);
      adjacencyList[dest].push(src);

      return this;
    }

    void depthFirstSearch(int vertex) {
      visited[vertex] = true;
      System.out.print("Visited " + vertex + ", ");
      Iterator<Integer> it = adjacencyList[vertex].iterator();

      while (it.hasNext()) {
        int adjacentVertex = it.next();
        if (!visited[adjacentVertex]) {
          depthFirstSearch(adjacentVertex);
        }
      }
    }
  }

  public static void main(String[] args) {
    Graph graph = new Graph(3);
    graph.addEdge(0, 1);
    graph.addEdge(0, 2);
    graph.addEdge(2, 1);

    graph.depthFirstSearch(1);
  }
}

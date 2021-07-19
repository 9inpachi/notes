import java.util.Iterator;
import java.util.LinkedList;

public class BreadthFirstSearch {
  public static class Graph {
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

    void breadthFirstSearch(int vertex) {
      LinkedList<Integer> queue = new LinkedList<Integer>();
      visited[vertex] = true;
      queue.add(vertex);

      while (queue.size() != 0) {
        int i = queue.poll();
        System.out.print(i + " ");

        Iterator<Integer> it = adjacencyList[i].iterator();
        
        while(it.hasNext()) {
          int vertexInList = it.next();
          if (!visited[vertexInList]) {
            visited[vertexInList] = true;
            queue.add(vertexInList);
          }
        }
      }
    }
  }

  public static void main(String[] args) {
    Graph graph = new Graph(4);
    graph.addEdge(2, 1);
    graph.addEdge(3, 0);
    graph.addEdge(0, 3);

    graph.breadthFirstSearch(1);
  }
}

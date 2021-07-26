package graph;

public class AdjacencyMatrix {
  public boolean adjMatrix[][];
  private int numOfVertices;

  AdjacencyMatrix(int numOfVertices) {
    this.numOfVertices = numOfVertices;
    adjMatrix = new boolean[numOfVertices][numOfVertices];
  }

  void addEdge(int i, int j) {
    if (i == j) {
      return;
    }

    adjMatrix[i][j] = true;
    adjMatrix[j][i] = true;
  }

  void removeEdge(int i, int j) {
    if (i == j) {
      return;
    }

    adjMatrix[i][j] = false;
    adjMatrix[j][i] = false;
  }

  void print() {
    StringBuilder builder = new StringBuilder();

    builder.append("    ");
    for (int i = 0; i < this.numOfVertices; i++) {
      builder.append(i + " ");
    }
    builder.append("\n---");
    for (int i = 0; i < this.numOfVertices; i++) {
      builder.append("--");
    }

    for (int i = 0; i < this.numOfVertices; i++) {
      builder.append("\n" + i + " | ");
      for (boolean j : adjMatrix[i]) {
        builder.append((j ? 1 : 0) + " ");
      }
    }

    System.out.println(builder.toString());
  }

  public static void main(String[] args) {
    AdjacencyMatrix adjacencyMatrix = new AdjacencyMatrix(4);

    adjacencyMatrix.addEdge(0, 1);
    adjacencyMatrix.addEdge(0, 2);
    adjacencyMatrix.addEdge(1, 2);
    adjacencyMatrix.addEdge(2, 0);
    adjacencyMatrix.addEdge(2, 3);

    adjacencyMatrix.print();
  }
}

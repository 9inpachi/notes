import java.util.ArrayList;

public class Heap {
  private ArrayList<Integer> binaryArray = new ArrayList<Integer>();

  Heap insert(int value) {
    binaryArray.add(value);
    return this;
  }

  Heap remove(int index) {
    binaryArray.remove(index);
    return this;
  }

  void maxHeapify(int indexInTree) {
    int largest = indexInTree;
    int size = binaryArray.size();
    int leftChild = 2 * largest + 1; // 2i + 1
    int rightChild = 2 * largest + 2; // 2i + 2

    if (leftChild < size && binaryArray.get(leftChild) > binaryArray.get(largest)) {
      largest = leftChild;
    }
    if (rightChild < size && binaryArray.get(rightChild) > binaryArray.get(largest)) {
      largest = rightChild;
    }

    if (largest != indexInTree) {
      int temp = binaryArray.get(largest);
      binaryArray.set(largest, binaryArray.get(indexInTree));
      binaryArray.set(indexInTree, temp);

      maxHeapify(largest);
    }
  }

  void minHeapify(int indexInTree) {
    int smallest = indexInTree;
    int size = binaryArray.size();
    int leftChild = 2 * smallest + 1; // 2i + 1
    int rightChild = 2 * smallest + 2; // 2i + 2

    if (leftChild < size && binaryArray.get(leftChild) < binaryArray.get(smallest)) {
      smallest = leftChild;
    }
    if (rightChild < size && binaryArray.get(rightChild) < binaryArray.get(smallest)) {
      smallest = rightChild;
    }

    if (smallest != indexInTree) {
      int temp = binaryArray.get(smallest);
      binaryArray.set(smallest, binaryArray.get(indexInTree));
      binaryArray.set(indexInTree, temp);

      minHeapify(smallest);
    }
  }

  void convertToMaxHeap() {
    int size = binaryArray.size();
    for (int i = size / 2 - 1; i >= 0; i--) {
      maxHeapify(i);
    }
  }

  void convertToMinHeap() {
    int size = binaryArray.size();
    for (int i = size / 2 - 1; i >= 0; i--) {
      minHeapify(i);
    }
  }

  void print() {
    for (int value : binaryArray) {
      System.out.print(value + "_");
    }
    System.out.println();
  }

  public static void main(String[] args) {
    Heap heap = new Heap();
    heap.insert(10).insert(9).insert(2).insert(12);
    System.out.println("Unstructured tree");
    heap.print();
    heap.convertToMinHeap();
    System.out.println("Min Heap");
    heap.print();
    heap.convertToMaxHeap();
    System.out.println("Max Heap");
    heap.print();
  }
}

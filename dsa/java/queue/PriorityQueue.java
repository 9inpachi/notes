package queue;

import java.util.ArrayList;

/**
 * https://www.programiz.com/dsa/priority-queue
 */
public class PriorityQueue {
  private ArrayList<Integer> heapTree = new ArrayList<Integer>();

  /**
   * Last index of non-leaf node is given by: n/2 - 1. Index of left child is
   * given by (i is index of current node): 2i + 1 Index of right child is given
   * by (i is index of current node): 2i + 2
   */
  void heapify(int index) {
    int largest = index;
    int left = 2 * index + 1; // 2i + 1
    int right = 2 * index + 2; // 2i + 2

    int size = heapTree.size();
    if (left < size && heapTree.get(left) > heapTree.get(largest)) {
      largest = left;
    }
    if (right < size && heapTree.get(right) > heapTree.get(largest)) {
      largest = right;
    }

    if (largest != index) {
      int temp = heapTree.get(index);
      heapTree.set(index, heapTree.get(largest));
      heapTree.set(largest, temp);

      heapify(largest);
    }
  }

  PriorityQueue insert(int value) {
    int size = heapTree.size();
    heapTree.add(value);

    // Heapify the tree if there were existing nodes.
    if (size != 0) {
      for (int i = size / 2 - 1; i >= 0; i--) {
        heapify(i);
      }
    }

    return this;
  }

  PriorityQueue deleteNode(int value) {
    int size = heapTree.size();
    int i;
    for (i = 0; i < size; i++) {
      if (value == heapTree.get(i)) {
        break;
      }
    }

    heapTree.set(i, heapTree.get(size - 1));
    heapTree.remove(size - 1);

    if (heapTree.size() > 1) {
      for (int j = size / 2 - 1; j >= 0; j--) {
        heapify(j);
      }
    }

    return this;
  }

  void print() {
    for (int value : heapTree) {
      System.out.print(value + " ");
    }
  }

  public static void main(String[] args) {
    PriorityQueue queue = new PriorityQueue();

    queue.insert(1).insert(2).insert(4).insert(5).insert(7).insert(9);
    queue.deleteNode(40);

    queue.print();
  }
}

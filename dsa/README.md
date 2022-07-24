# Data Structures and Algorithms

## Data Structures

- Arrays
- Queues
  - Last In First Out (LIFO)
- Stacks
  - First In First Out (FIFO)
- Linked List

  ```java
  class ListNode<T> {
    T val;
    ListNode next;
  }
  ```

- Set
  - Unique values
- Hash Tables / Hash Map
  - Also called dictionary
- Trees

  - Binary Tree
  - Binary Search Tree
    Left node is lesser and right node is greater

    ```java
    class TreeNode<T> {
      T val;
      TreeNode left;
      TreeNode right;
    }
    ```

- Heaps

  - Kind of binary tree where the top/head node is either smallest (min heap) or largest (max heap)

    ```java
    // Custom classes/objects can also be used instead of Integer.
    Queue<Integer> minHeap = new PriorityQueue<>((i1, i2) -> Integer.compare(i1, i2));
    Queue<Integer> maxHeap = new PriorityQueue<>((i1, i2) -> Integer.compare(i2, i1));
    ```

- [Graphs](./graphs.md)
  - Adjacency List\
    We use a Map to store a list/set of nodes adjacent to each node
  - Adjacency Matrix\
    We use a 2D boolean array to mark if a node is connected to another

## Algorithms

- Sorting
  - [Quick Sort](../dsa-ts/src/ds/quick-sort.ts) - In-place (sorts the same array)
  - [Merge Sort](../dsa-ts/src/ds/merge-sort.ts)
- Djikstra's Algorithm
- Binary Search
- Two Pointers
- [Bit Manipulation](https://www.youtube.com/watch?v=NLKQEOgBAnw)
- Depth First Search
  - Stack (to avoid stack overflow) or recursion
- Breadth First Search
  - Uses Queue
- Topological Sort
- Matrix Iteration
- Sliding Window
- Memoization
  - Used in recursive divide and conquer algorithms

package queue;

/**
 * FIFO - First In First Out.
 */
public class CircularQueue {
  private int[] array;
  private int front;
  private int rear;
  private int size;

  CircularQueue(int queueSize) {
    array = new int[queueSize];
    size = queueSize;
    front = -1;
    rear = -1;
  }

  public CircularQueue enqueue(int value) {
    if (isFull()) {
      System.out.println("Queue is full.");
    } else {
      if (front == -1) {
        front = 0;
      }
      rear = (rear + 1) % size;
      array[rear] = value;
    }

    return this;
  }

  public CircularQueue dequeue() {
    if (isEmpty()) {
      System.out.println("Queue is empty.");
    } else {
      if (front == rear) {
        front = -1;
        rear = -1;
      } else {
        front = (front + 1) % size;
      }
    }

    return this;
  }

  public Boolean isEmpty() {
    return front == -1;
  }

  public Boolean isFull() {
    return (front == 0 && rear == size - 1) || (front == rear + 1);
  }

  public void print() {
    if (isEmpty()) {
      System.out.println("Queue is empty.");
      return;
    }

    int i;
    for (i = front; i != rear; i = (i + 1) % size) {
      System.out.println("value=" + array[i] + " - i=" + i + " - front=" + front + " - rear=" + rear);
    }
    System.out.println("value=" + array[i] + " - i=" + i + " - front=" + front + " - rear=" + rear);
    System.out.println();
  }

  public static void main(String[] args) {
    CircularQueue queue = new CircularQueue(4);
    queue.enqueue(1).enqueue(2).enqueue(3).enqueue(4).dequeue().enqueue(5).dequeue().dequeue().enqueue(6).dequeue()
        .dequeue();
    queue.print();
  }
}

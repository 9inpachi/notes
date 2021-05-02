/**
 * FIFO - First In First Out.
 */
public class Queue {
  private int[] array;
  private int front;
  private int rear;
  private int size;

  Queue(int queueSize) {
    array = new int[queueSize];
    size = queueSize;
    front = -1;
    rear = -1;
  }

  public Queue enqueue(int value) {
    if (isFull()) {
      System.out.println("Queue is full.");
    } else {
      if (front == -1) {
        front = 0;
      }
      array[++rear] = value;
    }

    return this;
  }

  public Queue dequeue() {
    if (isEmpty()) {
      System.out.println("Queue is empty.");
    } else {
      if (front >= rear) {
        front = -1;
        rear = -1;
      } else {
        front++;
      }
    }

    return this;
  }

  public Boolean isEmpty() {
    return front == -1;
  }

  public Boolean isFull() {
    return rear == size - 1;
  }

  public void print() {
    for (int i = front; i <= rear; i++) {
      System.out.print(array[i] + (i == rear ? "" : "__"));
    }
    System.out.println();
  }

  public static void main(String[] args) {
    Queue queue = new Queue(4);
    queue.dequeue().enqueue(1).enqueue(2).dequeue().enqueue(3).enqueue(4).enqueue(5);
    queue.print();
  }
}

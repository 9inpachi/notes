/**
 * Double ended queue.
 */
public class Deque {
  private int[] arr;
  private int size;
  int front;
  int rear;

  Deque(int size) {
    this.size = size;
    arr = new int[size];
    front = -1;
    rear = 0;
  }

  Boolean isEmpty() {
    return front == -1;
  }

  Boolean isFull() {
    return (front == 0 && rear == size - 1) || front == rear + 1;
  }

  Deque insertFront(int value) {
    if (isFull()) {
      System.out.println("Queue is full.");
      return this;
    }

    if (front == -1) {
      front = 0;
      rear = 0;
    } else if (front == 0) {
      front = size - 1;
    } else {
      front--;
    }

    arr[front] = value;

    return this;
  }

  Deque insertRear(int value) {
    if (isFull()) {
      System.out.println("Queue is full.");
      return this;
    }

    if (front == -1) {
      front = 0;
      rear = 0;
    } else if (rear == size - 1) {
      rear = 0;
    } else {
      rear++;
    }

    arr[rear] = value;

    return this;
  }

  Deque deleteFront() {
    if (isEmpty()) {
      System.out.println("Queue is empty.");
      return this;
    }

    if (front == size - 1) {
      front = 0;
    } else {
      front++;
    }

    return this;
  }

  Deque deleteRear() {
    if (isEmpty()) {
      System.out.println("Queue is empty.");
      return this;
    }

    if (rear == 0) {
      rear = size - 1;
    } else {
      rear--;
    }

    return this;
  }

  void print() {
    int i;
    for (i = front; i != rear; i++) {
      if (i == size) {
        i = 0;
      }
      System.out.print(arr[i] + "__");
    }
    System.out.print(arr[i] + "__");

    System.out.println();
  }

  public static void main(String[] args) {
    Deque queue = new Deque(5);

    queue.insertFront(1);
    queue.insertRear(2);
    queue.insertFront(3);
    queue.insertRear(4);
    queue.insertRear(5);
    queue.insertRear(6);

    queue.print();
  }
}

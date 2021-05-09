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

    if (front < 1) {
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

    if (rear == size - 1) {
      rear = 0;
    } else {
      rear++;
    }

    arr[rear] = value;

    return this;
  }
}

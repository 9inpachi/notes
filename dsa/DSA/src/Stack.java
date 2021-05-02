/**
 * LIFO - Last In First Out.
 */
public class Stack {
  private int[] array;
  public int top;
  private int size;

  Stack(int stackSize) {
    size = stackSize;
    array = new int[size];
    top = -1;
  }

  public Stack push(int value) {
    if (isFull()) {
      System.out.println("Stack is full.");
      System.exit(1);
    }
    array[++top] = value;
    return this;
  }

  public int pop() {
    if (isEmpty()) {
      System.out.println("Stack is empty.");
      System.exit(1);
    }
    return array[top--];
  }

  public Boolean isEmpty() {
    return top == -1;
  }

  public Boolean isFull() {
    return top == size - 1;
  }

  public int size() {
    return top + 1;
  }

  public void print() {
    for (int i = top; i >= 0; i--) {
      System.out.println("_____" + array[i]);
    }
  }

  public static void main(String[] args) throws Exception {
    Stack stack = new Stack(10);
    stack.push(0);
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.push(4);
    stack.push(5);
    stack.pop();
    stack.pop();
    stack.push(6);
    stack.push(7);
    stack.push(8);
    stack.push(9);
    stack.push(10);
    stack.push(12);
    stack.print();
  }
}

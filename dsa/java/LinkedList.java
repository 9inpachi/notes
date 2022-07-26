class Node {
  int data;
  Node next;

  Node(int data) {
    this.data = data;
    this.next = null;
  }
}

public class LinkedList {
  Node head = null;

  LinkedList insertEnd(int value) {
    if (head == null) {
      head = new Node(value);
      return this;
    }

    Node temp = head;

    while (temp.next != null) {
      temp = temp.next;
    }

    Node newNode = new Node(value);
    temp.next = newNode;

    return this;
  }

  LinkedList insertStart(int value) {
    Node newNode = new Node(value);

    newNode.next = head;
    head = newNode;

    return this;
  }

  LinkedList insertMiddle(int value) {
    if (head == null) {
      head = new Node(value);
      return this;
    }

    Node temp = head;
    while (temp.next != null) {
      if (temp.data <= value && temp.next.data >= value) {
        break;
      }
      temp = temp.next;
    }

    Node newNode = new Node(value);
    newNode.next = temp.next;
    temp.next = newNode;

    return this;
  }

  LinkedList deleteByValue(int value) {
    Node temp = head;
    Node prevNode = temp;
    Boolean nodeFound = false;

    while (temp != null) {
      if (temp.data == value) {
        nodeFound = true;
        break;
      }
      prevNode = temp;
      temp = temp.next;
    }

    if (nodeFound) {
      prevNode.next = temp.next;
      temp = null;
    }

    return this;
  }

  LinkedList deleteStart() {
    Node temp = head;
    head = temp.next;
    temp = null;

    return this;
  }

  LinkedList deleteEnd() {
    if (head.next == null) {
      head = null;
      return this;
    }

    Node temp = head;
    Node prevNode = temp;
    while (temp.next != null) {
      prevNode = temp;
      temp = temp.next;
    }
    prevNode.next = null;

    return this;
  }

  void print() {
    Node temp = head;

    while (temp != null) {
      System.out.print(temp.data + "__");
      temp = temp.next;
    }

    System.out.println();
  }

  public static void main(String[] args) {
    LinkedList linkedList = new LinkedList();

    linkedList.insertEnd(1).insertEnd(2).insertEnd(4).insertEnd(4).insertEnd(5);
    linkedList.print();
    linkedList.deleteByValue(2).deleteByValue(3).deleteByValue(5).deleteByValue(15);
    linkedList.deleteEnd().deleteEnd().deleteEnd();
    linkedList.print();
  }
}

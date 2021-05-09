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

  LinkedList insert(int value) {
    if (head == null) {
      head = new Node(value);
      return this;
    }

    Node node = head;

    while (node.next != null) {
      node = node.next;
    }

    Node newNode = new Node(value);
    node.next = newNode;

    return this;
  }

  LinkedList delete(int value) {
    Node node = head;
    Node prevNode = node;
    Boolean nodeFound = false;

    while (node.next != null) {
      if (node.data == value) {
        nodeFound = true;
        break;
      }
      prevNode = node;
      node = node.next;
    }

    if (nodeFound) {
      prevNode.next = node.next;
      node = null;
    }

    return this;
  }

  void print() {
    Node node = head;

    while (node != null) {
      System.out.print(node.data + "__");
      node = node.next;
    }

    System.out.println();
  }

  public static void main(String[] args) {
    LinkedList linkedList = new LinkedList();

    linkedList.insert(1).insert(2).insert(3).insert(4).insert(5);
    linkedList.print();
    linkedList.delete(2).delete(3).delete(10);
    linkedList.print();
  }
}

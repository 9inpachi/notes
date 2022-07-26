import java.util.ArrayList;
import java.util.Collections;

class LinkedListNode<K, V> {
  K key;
  V value;
  LinkedListNode<K, V> next = null;

  LinkedListNode(K key, V value) {
    this.key = key;
    this.value = value;
  }

  void print() {
    LinkedListNode<K, V> temp = this;

    while (temp != null) {
      System.out.print(temp.key + "__");
      temp = temp.next;
    }

    System.out.println();
  }
}

/**
 * HashMap implementation using linked lists for collision chaining. Collision
 * is when two values pairs have the same index in array, so we make a linked
 * list to have multiple values at that index of array.
 */
public class Map<K, V> {
  ArrayList<LinkedListNode<K, V>> mapArray;
  int size = 100;
  int elementsSize = 0;

  Map(int size) {
    this.size = size;
    mapArray = new ArrayList<LinkedListNode<K, V>>(Collections.nCopies(size, null));
  }

  int size() {
    return mapArray.size();
  }

  void put(K key, V value) {
    int index = getArrayIndex(key);
    LinkedListNode<K, V> headNode = mapArray.get(index);

    if (headNode == null) {
      headNode = new LinkedListNode<K, V>(key, value);
      mapArray.set(index, headNode);
      return;
    }

    LinkedListNode<K, V> temp = headNode;
    LinkedListNode<K, V> lastNode = temp;

    while (temp != null) {
      // If the key already exists.
      if (temp.key == key) {
        temp.value = value;
        elementsSize++;
        return;
      }

      lastNode = temp;
      temp = temp.next;
    }

    LinkedListNode<K, V> newNode = new LinkedListNode<K, V>(key, value);
    lastNode.next = newNode;

    elementsSize++;
  }

  V get(K key) {
    int index = getArrayIndex(key);
    LinkedListNode<K, V> node = mapArray.get(index);

    while (node != null) {
      if (node.key == key) {
        return node.value;
      }
      node = node.next;
    }

    System.out.println("No value found for key " + key);
    return null;
  }

  void remove(K key) {
    int index = getArrayIndex(key);
    LinkedListNode<K, V> head = mapArray.get(index);

    if (head == null) {
      return;
    }

    head = removeFromLinkedList(key, head);
    mapArray.set(index, head);
  }

  LinkedListNode<K, V> removeFromLinkedList(K key, LinkedListNode<K, V> head) {
    if (head.key == key) {
      head = head.next;
    }

    LinkedListNode<K, V> temp = head;
    LinkedListNode<K, V> prevNode = temp;

    while (temp != null) {
      if (temp.key == key) {
        prevNode.next = temp.next;
        temp = null;
        break;
      }

      prevNode = temp;
      temp = temp.next;
    }

    return head;
  }

  /**
   * We get the index by doing a hash operation (hash function), getting an int
   * hash code as a kind of random value, and then modding (%) it to get the index
   * in array's size range. The array has linked lists which contain multiple key
   * value pairs for chaining.
   */
  private int getArrayIndex(K key) {
    int hashCode = key.hashCode();
    return hashCode % size;
  }

  public static void main(String[] args) {
    Map<String, String> hashMap = new Map<String, String>(3);
    hashMap.put("someKey1", "Some value of key 1");
    hashMap.put("someKey2", "Some value of key 2");
    hashMap.put("someKey3", "Some value of key 3");
    hashMap.put("someKey3", "Some value of key 3 updated");
    System.out.println(hashMap.get("someKey2"));
    System.out.println(hashMap.get("someKey1"));
    System.out.println(hashMap.get("someKey3"));
    hashMap.remove("someKey3");
    System.out.println(hashMap.get("someKey3"));
  }
}

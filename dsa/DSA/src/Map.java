import java.util.ArrayList;

class LinkedListNode<K, V> {
  K key;
  V value;
  LinkedListNode<K, V> next = null;

  LinkedListNode(K key, V value) {
    this.key = key;
    this.value = value;
  }
}

/**
 * HashMap implementation using linked lists for collision chaining. Collision
 * is when two values pairs have the same index in array, so we make a linked
 * list to have multiple values at that index of array.
 */
public class Map<K, V> {
  ArrayList<LinkedListNode<K, V>> mapArray = new ArrayList<LinkedListNode<K, V>>();
  int size = 100;

  Map(int size) {
    this.size = size;
  }

  void put(K key, V value) {
    int index = getArrayIndex(key);
    LinkedListNode<K, V> headNode = mapArray.get(index);

    if (headNode == null) {
      headNode = new LinkedListNode<K, V>(key, value);
      return;
    }

    LinkedListNode<K, V> temp = headNode;
    while (temp.next != null) {
      temp = temp.next;
    }
    LinkedListNode<K, V> newNode = new LinkedListNode<K, V>(key, value);
    temp.next = newNode;
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
    
  }
}

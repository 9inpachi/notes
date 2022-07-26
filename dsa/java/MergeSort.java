import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

public class MergeSort {
  public static void main(String args[]) {
    List<Integer> sorted = mergeSort(Arrays.asList(10, 1, 30, -30, 2, -10000000));
    System.out.println(sorted.toString());
  }

  public static List<Integer> mergeSort(List<Integer> arr) {
    if (arr.size() <= 1)
      return arr;

    int half = arr.size() / 2;
    List<Integer> left = arr.subList(0, half);
    List<Integer> right = arr.subList(half, arr.size());

    left = mergeSort(left);
    right = mergeSort(right);

    return merge(left, right);
  }

  public static List<Integer> merge(List<Integer> arr1, List<Integer> arr2) {
    int m = arr1.size(), n = arr2.size();
    int i = 0, j = 0;

    List<Integer> result = new ArrayList<>();

    while (i < m && j < n) {
      if (arr1.get(i) < arr2.get(j)) {
        result.add(arr1.get(i++));
      } else {
        result.add(arr2.get(j++));
      }
    }

    while (i < m) {
      result.add(arr1.get(i++));
    }
    while (j < n) {
      result.add(arr2.get(j++));
    }

    return result;
  }
}
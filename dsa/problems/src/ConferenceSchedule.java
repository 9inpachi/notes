import java.util.Arrays;
import java.util.List;

public class ConferenceSchedule {
  public static void main(String[] args) {
    printResult(Arrays.asList(1, 1, 2), Arrays.asList(3, 2, 4), 2);
    printResult(Arrays.asList(1, 3, 3, 4, 6), Arrays.asList(2, 4, 5, 7, 7), 3);
  }

  public static void printResult(List<Integer> scheduleStart, List<Integer> scheduleEnd, int expected) {
    System.out.println("Expected: " + expected);
    System.out.println("Actual: " + maxPresentations(scheduleStart, scheduleEnd));
  }

  // We remove minimum number of overlapping intervals and then get the maximum non-overlapping intervals.
  public static int maxPresentations(List<Integer> scheduleStart, List<Integer> scheduleEnd) {
    int n = scheduleStart.size();
    int count = 0, prevEnd = scheduleEnd.get(0);

    for (int i = 1; i < n; i++) {
      if (scheduleStart.get(i) >= prevEnd) {
        prevEnd = scheduleEnd.get(i);
      } else {
        prevEnd = Math.min(prevEnd, scheduleEnd.get(i));
        count++;
      }
    }

    return n - count;
  }
}

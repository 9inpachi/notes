import java.util.HashSet;
import java.util.Set;

public class StringReduction {
  public static void main(String[] args) {
    System.out.println("Expected: " + 2);
    System.out.println("Actual: " + getMinDeletions("abab"));
    System.out.println("Expected: " + 2);
    System.out.println("Actual: " + getMinDeletions("abcab"));
  }

  public static int getMinDeletions(String s) {
    Set<Character> set = new HashSet<>();

    for (char c : s.toCharArray()) {
      set.add(c);
    }

    return s.length() - set.size();
  }
}

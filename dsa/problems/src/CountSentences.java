import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CountSentences {
  public static void main(String[] args) {
    printResult(Arrays.asList("listen", "silent", "it", "is"), Arrays.asList("listen it is silent"), Arrays.asList(4));
    printResult(Arrays.asList("listen", "silent", "it", "ti", "is"), Arrays.asList("listen it is silent"), Arrays.asList(8));
    printResult(Arrays.asList("abc", "bca", "cba"), Arrays.asList("abc bca cba"), Arrays.asList(27));
    printResult(Arrays.asList("bats", "tabs", "in", "cat", "act"), Arrays.asList("cat the bats", "in the act", "act tabs in"), Arrays.asList(4, 2, 4));
    printResult(Arrays.asList("the", "bats", "tabs", "in", "ni", "cat", "act"), Arrays.asList("cat the bats", "act tca tca", "act tabs in"), Arrays.asList(4, 8, 8));
  }

  public static void printResult(List<String> wordSet, List<String> sentences, List<Integer> expected) {
    System.out.println("Expected: " + expected.toString());
    System.out.println("Actual: " + countSentences(wordSet, sentences));
  }

  public static List<Long> countSentences(List<String> wordSet, List<String> sentences) {
    List<Long> result = new ArrayList<>();

    // Grouping Anagrams

    Map<String, Integer> anagramsMap = new HashMap<>();

    for (String word : wordSet) {
      String key = getKey(word);
      anagramsMap.put(key, anagramsMap.getOrDefault(key, 0) + 1);
    }

    // Grouping Anagrams End

    for (String sentence : sentences) {
      int sentencesCount = 1;
      for (String word : sentence.split(" ")) {
        String key = getKey(word);
        if (anagramsMap.containsKey(key)) {
          sentencesCount *= anagramsMap.get(key);
        }
      }

      result.add((long) sentencesCount);
    }

    return result;
  }

  public static String getKey(String word) {
    char[] chars = new char[26];
    for (char c : word.toCharArray()) {
      chars[c - 'a']++;
    }

    return String.valueOf(chars);
  }
}

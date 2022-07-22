// 1. Basic Generics

fun <K, V, M : MutableMap<K, V>> Map<K, V>.partitionTo(map1: M, map2: M, predicate: (Map.Entry<K, V>) -> Boolean): Pair<M, M> {
  for (entry in this) {
    var mapToPutIn: M = if (predicate(entry)) map1 else map2
    mapToPutIn += entry.toPair()
  }

  return Pair(map1, map2)
}

fun partitionMap() {
  val map = mapOf(0 to "Hello", 1 to "World", 2 to "!", 3 to "!", 4 to "?")
  val wordRegex = """\w+""".toRegex()
  val (words, notWords) = map.partitionTo(HashMap(), HashMap()) { (_, value) -> wordRegex.matches(value) }

  println(words)
  println(notWords)
  check(words == mapOf(0 to "Hello", 1 to "World"))
  check(notWords == mapOf(2 to "!", 3 to "!", 4 to "?"))
}

partitionMap()

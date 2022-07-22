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

// 2. Type Projections (Covariance, Contravariance, Invariance)

/*

Source: https://proandroiddev.com/understanding-generics-and-variance-in-kotlin-714c14564c47

Covariant (out):      Subtype can be assigned to or used in place of a supertype.
                      Animal <- Cat (Cat is a subtype)
                      Java: <? extends Animal>
                      Kotlin: <out E> (limit to only allow returning of type E and not accepting it as an argument to any method)
                      If there are multiple subtypes that extend from a supertype, then we can pass the subtype but it should always return the supertype.
                      Returning subtype doesn't make sense since it contains multiple of them and we can't cast another subtype to the return type. The only overlap between subtypes (Cat, Rabit) is the supertype (Animal).

Invariant:            When two types are not compatible at all. Types have no subtype to supertype relationship.

Contravariant (in):   Reverse of covariant. When the subtype and supertype relation is reversed.
                      Animal <- Cat (supertype <- subtype)
                      Compare<Cat> <- Compare<Animal> (supertype <- subtype)
                      Java: <? super Cat>
                      Kotlin: <in E> (limit to only allow accepting type E as an argument to any method and not allowing it to be returned from a method)

*/

// Covariant

interface CovariantInterface<out T> {
  fun get(): T
  // fun set(value: T) // Not allowed.
}

class CovariantExample<T>(val value: T) {
  fun get(): T = value
}

println(CovariantExample<String>("Hello covariant").get())

// Contravarient

interface ContravarientInterface<in T> {
  // fun get(): T // Not allowed.
  fun set(value: T)
}

class ContravarientExample<T>() {
  var value: T? = null

  fun set(v: T) {
    value = v
  }

  fun print() = println(value)
}

val contravariant = ContravarientExample<String>()
contravariant.set("Hello contravariant")
contravariant.print()

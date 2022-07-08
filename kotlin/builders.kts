// 1. Function Literals with Receiver

// Same as extension functions but scoped to a variable. See classes.kts:44.

fun functionLiteralWithReceiver() {
  val isEven: Int.() -> Boolean = { this % 2 == 0 }
  val isOdd: Int.() -> Boolean = { this % 2 != 0 }

  println(2.isEven())
  println(5.isEven())
  println(5.isOdd())
}

functionLiteralWithReceiver()

// 2. Map Builder Using Function Literals with Receiver

// Useful when created builders/initializers.

// `Unit` is the same as `void`.
fun <K, V> buildMutableMap(build: HashMap<K, V>.() -> Unit): Map<K, V> {
  val map = HashMap<K, V>()
  map.build()

  return map
}

fun buildMapUsage(): Map<Int, String> = buildMutableMap {
  put(0, "0")
  put(1, "1")
  put(2, "2")
}

println(buildMapUsage())

// 3. The `apply` Function

// Applies the passed lambda to the object.

val applyMap = HashMap<Int, Int>().apply {
  put(0, 0)
  put(1, 1)
}

println(applyMap)

// 4. Builders Implementation

open class Tag(val name: String) {
  protected val children = mutableListOf<Tag>()

  override fun toString() = "<$name>${children.joinToString("")}</$name>"
}

class Table : Tag("table") {
  fun tr(init: Tr.() -> Unit) {
    children += Tr().apply(init)
  }
}

class Tr : Tag("tr") {
  fun td(init: Td.() -> Unit) {
    children += Td().apply(init)
  }
}

class Td : Tag("td")

fun table(init: Table.() -> Unit): Table {
  return Table().apply(init)
}

fun createTable(): Table {
  return table {
    tr {
      td { }
      td { }
    }
  }
}

println(createTable())

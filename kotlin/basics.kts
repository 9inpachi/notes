// 1. Hello World!

fun start(): String = "Hello World!"
println(start())

// 2. Arguments (Named and Default)

// fun joinToString(
//   separator: String = ", ",
//   prefix: String = "",
//   postfix: String = "",
//   /* ... */
// ): String

fun joinOptions(options: Collection<String>) = options.joinToString(prefix = "(", postfix = ")")
println(joinOptions(listOf("hello", "world")))

// 3. Triple-quoted Strings

val question = "What's 2 x 5"
val answer = "10"
val tripleQuotedString = """
  #question = "$question"
  #answer = "$answer"
""".trimMargin("#")

println(tripleQuotedString)

// 4. String Templates
// Triple-quoted strings can also be used for regex expressions to avoid escaping characters.

val month = "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)"
// Date format "dd mmm, yyyy"
val pattern = """\d{2} $month, \d{4}""".toRegex()

println("22 Feb, 2022 " + pattern.matches("22 Feb, 2022"))
println("22 FEB, 2022 " + pattern.matches("22 FEB, 2022"))

// 5. Nullable Types

fun printMessage(message: String? = null): String = "Message has length " + if (message?.length == null) 0 else message.length
println(printMessage("Has message"))
println(printMessage())

// 6. Nothing Type
// Return type of a function that always throws an exception.

fun failWithWrongAge(age: Number?): Nothing = throw IllegalArgumentException("Wrong age: $age")
fun checkAge(age: Number?) {
  if (age == null || age !in 0..120) {
    failWithWrongAge(age)
  }

  println("Given age is $age")
}

checkAge(10)
// Throws exception.
// checkAge(null)

// 7. Lambdas

val isEven: (Int) -> Boolean = { num: Int -> num % 2 == 0 }
val numbersList = listOf(10, 5, 7)

println(numbersList.any(isEven))

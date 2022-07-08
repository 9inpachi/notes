// Import for 4. Named Import
import kotlin.random.Random as KRandom

// 1. Data Classes

data class Person(val name: String, val age: Int)

fun comparePeople(): Boolean {
  val p1 = Person("John", 30)
  val p2 = Person("John", 30)

  return p1 == p2
}

println(comparePeople())

// 2. Smart Casts

interface Expression
class Num(val value: Int) : Expression
class Sum(val left: Expression, val right: Expression): Expression

fun evaluateExpression(expression: Expression): Int {
  return when (expression) {
    is Num -> expression.value
    is Sum -> evaluateExpression(expression.left) + evaluateExpression(expression.right)
    else -> throw IllegalArgumentException("Unknown expression")
  }
}

println(evaluateExpression(Sum(Num(3), Num(4))))

// 3. Sealed Classes/Interfaces

// All subclasses/implementations of sealed class/interface are known at compile time.

// In the above example, we make the `Expression` interface sealed (`sealed interface Expression`).
// We no longer need the `else` condition in `when` because the implementations are known at compile time.

// 4. Named Import

println(KRandom.nextInt(200))

// 5. Extension Functions

// Custom functions used to extend types or classes.

data class RationalNumber(val numerator: Int, val denominator: Int)

fun Int.r(): RationalNumber = RationalNumber(this, 1)
fun Pair<Int, Int>.r(): RationalNumber = RationalNumber(this.first, this.second)

fun printRationalNumber(rationalNumber: RationalNumber) = println("${rationalNumber.numerator}/${rationalNumber.denominator}")

val integer: Int = 4
val pair: Pair<Int, Int> = Pair(2, 5)

printRationalNumber(integer.r())
printRationalNumber(pair.r())

// 6. Constructors

// Primary Constructor

class PersonPrimaryConstructor(val name: String) {
  init {
    println("Created object with name: " + name)
  }
}

// Secondary Constructor

class PersonSecondaryConstructor {
  constructor(name: String) {
    println("Created object with name: " + name)
  }
}

val person1 = PersonPrimaryConstructor("Primary Constructor Name")
val person2 = PersonSecondaryConstructor("Secondary Constructor Name")

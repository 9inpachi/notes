import java.util.Calendar

// 1. Comparison and Operator Overloading

data class Date(val year: Int, val month: Int, val day: Int) : Comparable<Date> {
  override operator fun compareTo(other: Date) = when {
      year != other.year -> year - other.year
      month != other.month -> month - other.month
      else -> day - other.day
    }
}

val date1 = Date(2012, 12, 5)
val date2 = Date(2022, 12, 5)

println(date1 < date2)

// 2. For Loop and Custom Range

fun Date.followingDate(): Date {
  val c = Calendar.getInstance()
  c.set(this.year, this.month, this.day)
  val dayTimeInMs = 24 * 60 * 60 * 1000L
  val timeInMs = c.timeInMillis + dayTimeInMs
  val result = Calendar.getInstance()
  result.timeInMillis = timeInMs

  return Date(result.get(Calendar.YEAR), result.get(Calendar.MONTH), result.get(Calendar.DATE))
}

class DateRange(val start: Date, val end: Date): Iterable<Date> {
  override fun iterator(): Iterator<Date> = object : Iterator<Date> {
    var current = start

    override fun next(): Date {
      if (!this.hasNext()) throw NoSuchElementException()
      val prev = current
      current = prev.followingDate()

      return prev
    }

    override fun hasNext(): Boolean = current <= end
  }
}

operator fun Date.rangeTo(other: Date) = DateRange(this, other)

val startDate = Date(2022, 1, 1)
val endDate = Date(2022, 1, 5)

if (Date(2022, 1, 3) in startDate..endDate) {
  println("Date is in range.")
}

for (date in startDate..endDate) {
  println(date)
}

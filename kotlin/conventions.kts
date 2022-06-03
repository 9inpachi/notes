// 1. Comparison and Operator Overloading

data class Date(val year: Int, val month: Int, val day: Int) : Comparable<Date> {
  override operator fun compareTo(other: Date) = when {
      year != other.year -> year - other.year
      month != other.month -> month - other.month
      else -> day - other.day
    }
  
  override operator fun rangeTo(other: Date) Collection<Date> {
    
  }
}

val date1 = Date(2012, 12, 5)
val date2 = Date(2022, 12, 5)

println(date1 < date2)
// println(Date(2010, 12, 3) in date1,,date2)

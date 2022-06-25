// 1. Utility Functions

val list: List<String> = listOf("Hello", "World", "Hello", "World")

println(list.toSet())

// 2. Sorting

val unsortedList: List<String> = listOf("a", "aa", "aaa")

println(unsortedList.sortedByDescending{ it.length })

// 3. Mapping and Filtering

val numbersList = listOf(1, 5, 10, 12)

println(numbersList.map{ it * 2 })
println(numbersList.filter{ it <= 5 })

// 4. Associate

val associateList = listOf("item 1", "item 2", "item 3")

println(associateList.associateBy{ it.split(" ")[1] })
println(associateList.associateWith{ it.split(" ")[1] })
println(associateList.associate{ it.split(" ")[1] to it.split(" ")[0] })

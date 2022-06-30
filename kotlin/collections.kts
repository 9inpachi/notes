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

// 5. Group By

val groupByList = listOf("a", "aa", "b", "bb")

println(groupByList.groupBy{ it.length })

// 6. Partition and Destructuring

val partitionList = listOf("a", "aa", "b", "bb")

val partition = partitionList.partition{ it.contains("a") }
println(partition)

val (positivePart, negativePart) = partition
// Destructuring is done by `componentN` functions. `component1` gives the first element, `component2` the second and so on.
println(positivePart == partition.component1())
println(negativePart == partition.component2())

// 7. FlatMap

data class Product(val name: String, val priceTiers: List<Int>, val startPrice: Int? = priceTiers[0])

// Flatten nested collections to a single list. In this case, `priceTiers` are flattened to a single list.
val flatMapList = listOf(Product("a", listOf(1, 2, 3)), Product("b", listOf(3, 4, 5)))

println(flatMapList.flatMap{ it.priceTiers })

// 8. Min and Max

val minMaxList = listOf(Product("a", listOf(1, 2)), Product("b", listOf(3, 4, 5)))
val allPrices = minMaxList.flatMap(Product::priceTiers)

println(allPrices.minOrNull())
println(allPrices.maxOrNull())
println(minMaxList.minByOrNull{ it.priceTiers.size })
println(minMaxList.maxByOrNull{ it.priceTiers.size })

// 9. Sum

val sumList = listOf(Product("a", listOf(1), 1), Product("b", listOf(3), 5))

println(sumList.sumOf{ it.startPrice!! })

// 10. Fold and Reduce

// Fold: We specify an initial value and the first step uses that value as the accumulated value.
// Reduce: The first value in list is taken as the accumulated value and the first step starts from the second value in list.

val foldReduceList = listOf(1, 20, 40)

val sumLambda: (Int, Int) -> Int = { accumulated: Int, current: Int -> accumulated + current }

println(foldReduceList.fold(10, sumLambda))
println(foldReduceList.reduce(sumLambda))

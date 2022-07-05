// 1. Getters and Setters

class PropertyGetterSetter {
  var property: Int = 0
    get() = field + 2
    set(value) {
      field = value + 2
    }
}

val propertyGetterSetter = PropertyGetterSetter()
println(propertyGetterSetter.property)
propertyGetterSetter.property = 10
println(propertyGetterSetter.property)

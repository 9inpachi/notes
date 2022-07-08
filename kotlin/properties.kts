import kotlin.properties.ReadWriteProperty
import kotlin.reflect.KProperty

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

// 2. Lazy Property

// A property whose initial value is calculated when getting it for the first time.

class LazyProperty(val initializer: () -> Int) {
  var _lazy: Int? = null

  val lazy: Int
    get() {
      if (_lazy == null) {
        println("Property `lazy` initialized. This will only appear once.")
        _lazy = initializer()
      }

      return _lazy!!
    }

  val lazyTwo: Int by lazy{
    println("Property `lazyTwo` initialized. This will only appear once.")
    initializer()
  }
}

// Another syntax of using lambda.
val lazyProperty = LazyProperty{ 10 }

println(lazyProperty.lazy)
println(lazyProperty.lazy)
println(lazyProperty.lazyTwo)
println(lazyProperty.lazyTwo)

// 3. Custom Delegate

// Delegate syntax: val/var <property_name>: <Type> by <expression>
// With delegates, the getters and setters of a property are delegated to some other part of code.

class SimpleStringDelegate<R> : ReadWriteProperty<R, String> {
  var stringValue: String? = null

  override fun getValue(thisRef: R, property: KProperty<*>): String {
    return if (stringValue == null) "null" else stringValue!!
  }

  override fun setValue(thisRef: R, property: KProperty<*>, value: String) {
    stringValue = value
  }
}

class CustomDelegateExample {
  var property: String by SimpleStringDelegate()
}

val customDelegateExample = CustomDelegateExample()

println(customDelegateExample.property)
customDelegateExample.property = "Some Value"
println(customDelegateExample.property)

# Design Patterns

Link: <https://java-design-patterns.com/patterns/>

This only includes popularly used patterns.

## Creational

### Abstract Factory

Provides an interface for creating family of related or dependent objects without specifying their concrete classes.

```java
interface King {}
interface Castle {}
interface Army {}

class ElfKing implements King {}
class ElfCastle implements Castle {}
class ElfArmy implements Army {}

interface KingdomFactory {
  King createKing();
  Caste createCastle();
  Army createArmy();
}

class ElfKingdomFactory implements KingdomFactory {}

class FactoryMaker {
  enum KingdomType {};
  KingdomFactory makeFactory(KingdomType kingdomType) {}
}
```

### Builder

#### Telescoping Constructor

```java
class Hero {
  // This is the telescoping constructor.
  Hero(String name) {
    this(name, null, false, null);
  }

  Hero(String name, String power, boolean canFly, String height) {
    this.name = name;
    this.power = power;
    this.canFly = canFly;
    this.height = height;
  }
}
```

#### Builder Pattern

The same constructor process can create different representations as objects.

```java
Hero hero = Hero.builder().withName("Test").withPower("Power").build();
```

### Factory

Using a factory to create objects based on the argument received to factory.

```java
class ShapeFactory {
  public static Shape createShape(ShapeType type) {
    switch(type) {
      case CIRCLE:
        return new Circle();
      case SQUARE:
        return new Square();
      case TRIANGLE:
        return new Triangle();
      default:
        throw new RuntimeException("Invalid shape type");
    }
  }
}

ShapeFactory factory = new ShapeFactory();
factory.createShape(ShapteType.CIRCLE).draw();
factory.createShape(ShapteType.SQUARE).draw();
```

### Singleton

A class only has a single instance which can be accessed globally.

```java
class Singleton {
  private static Singleton instance;
  public static Singleton getInstance() {
    if (instance == null) instance = new Singleton();
    return instance;
  }
}
```

## Structural

### Adapter

Also known as wrapper. Convert a class's interface to another one so others can consume a simpler and expected version of the interface.

```java
interface Basket {
  Item[] getItems();
}

interface CheckoutService {
  void processOrder(Item[] items);
}

class CheckoutAdapter {
  Basket basket;
  CheckoutService checkoutSerive;

  void checkoutBasket() {
    Item[] basketItems = basket.getItems();
    checkoutService.processOrder(basketItems);
  }
}
```

### Bridge

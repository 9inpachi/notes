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

Decouple an abstraction from it's implementation, so the two can vary independently. Bridge pattern prefers composition over inheritence.

```java
interface Enchantment {
  void onActivate();
  void apply();
  void onDeactivate();
}

class Sword {
  Sword(Enchantment enchantment) {}
}

// Instead of.
class SwordWithEnchantment implements Enchantment {}
```

### Composite

Compose objects into tree structures to represent part-whole hierarchies. Composite lets consumer treat individual objects and composition of objects (higher in hierarchy) uniformly in the same way.

### Decorator

Also known as wrapper. Decorator allow attaching additional responsibilities to objects dynamically. A flexible alternative to subclassing for extending functionality.

```java
interface Troll {
  void attack();
}

class SimpleTroll implements Troll {
  void attack() {}
}

// A clubbed troll is a simple troll with a club. A club is a stick that can be used to hit.
class ClubbedTroll implements Troll {
  Troll decorated;
  ClubbedTroll(Troll decorated) {
    this.decorated = decorated;
  }

  void attack() {
    this.decorated.attack();
    // Attack with club.
  }
}
```

### Flyweight

Use sharing to support large number of fine-grained objects. It is used to minimize memory usage or computational expenses by sharing as much as possible with similar objects.

```java
interface Potion {
  void drink();
}

class HealingPotion implements Potion {}
class StrengthPotion implements Potion {}

enum PotionType = { Healing, Strength };

class PotionFactory {
  Map<PotionType, Potion> map;

  PotionFactory() {
    map = new EnumMap<>(PotionType.class);
  }

  Potion createPotion(PotionType type) {
    Potion potion = map.get(type);
    if (potion != null) {
      return potion;
    }

    switch (type) {
      case Healing:
        potion = new HealingPotion();
        break;
      case Strength:
        potion = new StrengthPotion();
        break;
    }

    map.put(type, potion);

    return potion;
  }
}

class AlchemistShop {
  public static void main(String[] args) {
    PotionFactory factory = new PotionFactory();

    List<Potion> topShelf = List.of(
      factory.createPotion(PotionType.Healing),
      factory.createPotion(PotionType.Healing)
    );
    List<Potion> bottomShelf = List.of(
      factory.createPotion(PotionType.Strength),
      factory.createPotion(PotionType.Strength)
    );

    topShelf.forEach(Potion::drink);
    bottomShelf.forEach(Potion::drink);
  }
}
```

# Design Patterns

Link: <https://java-design-patterns.com/patterns/>

This only includes popularly used patterns.

- [Creational](#creational)
  - [Abstract Factory](#abstract-factory)
  - [Builder](#builder)
    - [Telescoping Constructor](#telescoping-constructor)
    - [Builder Pattern](#builder-pattern)
  - [Factory](#factory)
  - [Singleton](#singleton)
- [Structural](#structural)
  - [Adapter](#adapter)
  - [Bridge](#bridge)
  - [Composite](#composite)
  - [Decorator](#decorator)
  - [Flyweight](#flyweight)
- [Behavioral](#behavioral)
  - [Chain of Responsibility](#chain-of-responsibility)
  - [Command](#command)
  - [Strategy](#strategy)
  - [Template Method](#template-method)

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

ShapeFactory.createShape(ShapteType.CIRCLE).draw();
ShapeFactory.createShape(ShapteType.SQUARE).draw();
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
  CheckoutService checkoutService;

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

## Behavioral

### Chain of Responsibility

Avoid coupling the sender of a request to one receiver and give more than one object the responsibility to handle the request. Chain the receiving objects and pass the request along the chain until an object handles it.

```java
class Request {
  RequestType type;
  void markHandled() {}
}

abstract class RequestHandler {
  RequestHandler next;

  RequestHandler(RequestHandler next) {
    this.next = next;
  }

  void handleRequest(Request req) {
    if (next != null) {
      next.handleRequest();
    }
  }
}

class OrcCommander extends RequestHandler {
  RequestType typeToHandle;

  OrcCommander(RequestHandler next) {
    super(next);
  }

  void handleRequest(Request req) {
    if (req.type == typeToHandle) {
      req.markHandled();
    } else {
      super.handleRequest(req);
    }
  }
}

class OrcSoldier extends RequestHandler {
  RequestType typeToHandle;

  OrcSoldier(RequestHandler next) {
    super(next);
  }

  void handleRequest(Request req) {
    if (req.type == typeToHandle) {
      req.markHandled();
    } else {
      super.handleRequest(req);
    }
  }
}

class OrcKing {
  RequestHandler handlersChain;

  OrcKing() {
    handlersChain = new OrcCommander(new OrcSoldier());
  }

  void makeRequest(Request req) {
    handlersChain.handleRequest(req);
  }
}
```

### Command

Also known as Action, Transaction. Encapsulate a request as an object. Allows parameterizing clients with different requests, queue and log requests, and support undoable operations.

For example, a Wizard can cast a spell on a Goblin and undo it.

```java
class Wizard {
  Deque<Runnable> undoStack = new Deque<>();
  void castSpell(Runnable spell) {}
  void undoLastSpell() {}
}

class Goblin {
  void changeSize() {}
  void changeVisibility() {}
}

Wizard wizard = new Wizard();
Goblin goblin = new Goblin();

wizard.castSpell(goblin::changeSize);
wizard.castSpell(goblin::changeVisibility);

wizard.undoLastSpell(); // Undoes visibility change.
wizard.undoLastSpell(); // Undoes size change.
```

### Strategy

Also known as Policy. Strategy patterns lets us define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithms vary independently from the clients that use it.

```java
interface FightingStrategy {
  void execute();
}

class MagicStrategy implements FightingStrategy {
  void execute() { log("Attack with magic"); }
}

class SwordStrategy implements FightingStrategy {
  void execute() { log("Attack with sword"); }
}

class Fighter {
  FightingStrategy strategy;

  void setStrategy(FightingStrategy strategy) {
    this.strategy = strategy;
  }

  void attack() {
    strategy.execute();
  }
}

Fighter fighter = new Fighter();
log("Goblin spotted");
fighter.setStrategy(new SwordStrategy());
fighter.attack();
log("Dragon appeared");
fighter.setStrategy(new MagicStrategy());
fighter.attack();
```

### Template Method

Template method lets subclasses redefine certains steps of an algorithm while keeping the structure of the algorithm.

```java
abstract class StealingMethod {
  protected abstract String pickTarget();
  protected abstract void confuseTarget(String target);
  protected abstract void stealFromTarget(String target);
  public void steal() {
    String target = pickTarget();
    log("Starting to steal from " + target);
    this.confuseTarget();
    this.stealFromTarget();
  }
}

class StealBySnatching extends StealingMethod {
  @Override
  void confuseTarget(String target) {
    log("Make loud sound elsewhere to confuse " + target);
  }

  @Override
  void stealFromTarget(String target) {
    log("Quickly grab the item and steal from " + target);
  }
}

class StealByThreatening extends StealingMethod {
  @Override
  void confuseTarget(String target) {
    log("Take out a gun and point to " + target);
  }

  @Override
  void stealFromTarget(String target) {
    log("Ask for item from the " + target);
  }
}

class Thief {
  StealingMethod method;

  Thief(StealingMethod method) {
    this.method = method;
  }

  void setMethod(StealingMethod method) {
    this.method = method;
  }

  void steal() {
    this.method.steal();
  }
}

Thief thief = new Thief(new StealBySnatching());
thief.steal();
thief.setMethod(new StealByThreateningMethod());
thief.steal();
```

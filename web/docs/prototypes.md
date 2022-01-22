# JavaScript Prototypes

## Prototypes

A mechanism by which JavaScript objects inherit features from one another. It is a built-in property of every JavaScript object.

Link: <https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes>

### Prototype Chaining

A prototype of an object is an object itself and has its own prototype, making a prototype chain. The chain ends when a prototype has `null` as its own prototype.

When accessing property of an object, if the property cannot be found on the object itself, then the chained prototypes are checked until the `null` prototype is reached in which case `undefined` is returned. `myObject.hasOwnProperty("prop")` looks for properties this way.

Logging the chain of prototypes.

```js
const date = new Date();
let object = date;

do {
  object = Object.getPrototypeOf(object);
  console.log(object);
} while (object);

// Date.prototype
// Object.prototype
// null
```

### Properties

Own Properties: These are the properties that are directly added to the object and not the prototype of the object. (`const o = { a: 1 }`)

Prototype Properties: These are the properties that are not part of the object itself but the object's prototype (and chained prototypes).

### Shadowing Properties

Defining a property with the same name as defined in the object's prototype is called shadowing of the property.

```js
const date = new Date();
console.log(date.getMonth()); // 0 to 11

date.getMonth = function () {
  console.log("Overriding getMonth");
};
console.log(date.getMonth()); // "Overriding getMonth"
```

This is expected given how the prototype chain works. When we call `getMonth`, the browser looks in the `date` object first and then moves on to subsequent prototypes only if the `date` object does not define it.

### Setting a Prototype

Using `Object.create`.

```js
const personPrototype = {
  greet() {
    console.log("hello");
  },
};

const person = Object.create(personPrototype);
person.greet(); // greet's implementation is provided by the prototype.
```

Using a constructor.

```js
const personPrototype = {
  greet() {
    console.log("Hello", this.name);
  },
};

function Person(name) {
  this.name = name;
}

Person.prototype = personPrototype;
// This is important because otherwise the property points to constructor of `personPrototype` which is `Object`.
Person.constructor = Person;
```

Standard.

```js
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log("Hello", this.name);
};
```

## Prototypal Inheritance

Link: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain>\
Classes and prototypal inheritance: <https://www.digitalocean.com/community/tutorials/demystifying-es6-classes-and-prototypal-inheritance>

Overwriting/setting `prototype` breaks the prototype chain.

```js
function Test() {
  this.a = "a";
  this.b = "b";
}

// WRONG
Test.prototype = { b: "b", c: "c" }; // Will not be able to access
// RIGHT
Test.prototype.b = "b_new";
Test.prototype.d = "d";

const t = new Test(); // { a: "a", b: "b" }
// EXAMPLE OF PROPERTY SHADOWING
console.log(t.b); // This outputs `b` and not `b_new` because the object has an own property `b`. The prototype also has the property but it's not visited because of Property Shadowing.
```

The flow of chaining and how object's own and prototype properties are accessed is following:

1. Object's own properties (`{ a, b }`)
1. If own property not found, object's prototype properties (`{ b, c }`)
1. If no proprety on prototype, prototype of the prototype is checked
1. The chaining continues until a `null` prototype is reached (mostly at `Object.prototype` level)

### Inheritance

```js
const animal = {}; // Inherits properties from `Object.prototype`.
animal.eat = true;

const cat = Object.create(animal); // Inherits properties from `animal` and `Object.prototype`.
cat.sound = true;

const lion = Object.create(cat); // Inherits properties from `cat`, `animal` and `Object.prototype`.
lion.roar = true;

console.log(lion.eat); // true
console.log(lion.sound); // true
console.log(lion.roar); // true
console.log(lion.toString()); // Inherits from `Object.prototype`.
```

#### Methods for Extending Prototype Chain

1. New initialization
1. `Object.create`
1. `Object.setPrototypeOf`
1. Using the `__proto__` property

Example using `Object.create`.

```js
function Animal(name) {
  this.name = name;
}
Animal.prototype.eat = true;

// Create a new object because assigning `Animal.prototype` to `Cat.prototype` will create a reference
// and adding properties to `Cat.prototype` will also add them to `Animal.prototype`.
const animalPrototype = Object.create(Animal.prototype);

function Cat(name) {
  // This is the constructor from `Animal`.
  this.constructor(name);
  this.name += " is the name set by Cat";
}
Cat.prototype = animalPrototype; // Like class's extends
Cat.prototype.sound = true;

const animal = new Animal("Woof");
console.log(animal.name); // Woof
console.log(animal.eat); // true
console.log(animal.sound); // undefined

const cat = new Cat("Meow");
console.log(cat.name); // Meow is the name set by Cat
console.log(cat.eat); // true
console.log(cat.sound); // true
console.log("------");
```

ES6 equivalent of the above.

```js
class Animal {
  eat = true;

  constructor(name) {
    this.name = name;
  }
}

class Cat extends Animal {
  sound = true;

  constructor(name) {
    super(name);
    this.name += " is the name set by Cat";
  }
}

const animal = new Animal("Woof");
console.log(animal.name); // Woof
console.log(animal.eat); // true
console.log(animal.sound); // undefined

const cat = new Cat("Meow");
console.log(cat.name); // Meow is the name set by Cat
console.log(cat.eat); // true
console.log(cat.sound); // true
console.log("------");
```

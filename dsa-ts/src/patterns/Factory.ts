/**
 * Factory is a pattern in which we hide the object creation logic.
 * That is we don't use the classes directly to create objects but
 * use some other class to create them so we don't end up exposing the actual classes.
 */

//

class Product {
  constructor(
    public name: string,
    public price: number
  ) { }
}

class Food extends Product {
  weight: number;

  constructor(
    name: string,
    price: number,
    ...args: Array<any>
  ) {
    super(name, price);
    this.weight = args[0];
  }
}

class Drink extends Product {
  ml: number;
  package: string;

  constructor(
    name: string,
    price: number,
    ...args: Array<any>
  ) {
    super(name, price);
    this.ml = args[0];
    this.package = args[1]
  }
}

enum ProductTypes {
  DRINK,
  FOOD
}

class ProductFactory {
  static createProduct(type: ProductTypes, name: string, price: number, ...args: any[]): Product {
    switch (type) {
      case ProductTypes.FOOD:
        return new Food(name, price, ...args);
      case ProductTypes.DRINK:
        return new Drink(name, price, ...args);
    }
  }
}

// Usage

const coke = ProductFactory.createProduct(ProductTypes.DRINK, 'Coke', 20, 250);

console.assert((coke instanceof Drink), "Wrong implementation");
console.assert((coke instanceof Product), "Wrong implementation");
console.assert(!(coke instanceof Food), "Wrong implementation");

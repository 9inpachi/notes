
class Product {
  name: string;
  price: number;

  setName(name: string) {
    this.name = name;
  }

  setPrice(price: number) {
    this.price = price;
  }
}

class ProductBuilder {
  product: Product;

  constructor() {
    this.product = new Product();
  }

  setName(name: string): ProductBuilder {
    this.product.setName(name);
    return this;
  }

  setPrice(price: number): ProductBuilder {
    this.product.setPrice(price);
    return this;
  }

  getProduct(): Product {
    return this.product;
  }
}

const builder = new ProductBuilder();
builder
  .setName('Coke')
  .setPrice(20);
const product = builder.getProduct();

console.assert(product.name === 'Coke', "Wrong implementation");
console.assert(product.price === 20, "Wrong implementation");

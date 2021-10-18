package org.practice.designpatterns.factory;

interface Shape {
  void draw();
}

enum ShapeType {
  CIRCLE,
  SQUARE,
  TRIANGLE
};

class Circle implements Shape {
  @Override
  public void draw() {
    System.out.println("Drew Circle");
  }
}

class Square implements Shape {
  @Override
  public void draw() {
    System.out.println("Drew Square");
  }
}

class Triangle implements Shape {
  @Override
  public void draw() {
    System.out.println("Drew Triangle");
  }
}

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

/**
 * A pattern to create objects without exposing the internal creation logic
 * and making use of a common interface to refer to the object.
 * Creational Pattern.
 */
public class Factory {
  public static void main(String[] args) {
    ShapeFactory.createShape(ShapeType.SQUARE).draw();
    ShapeFactory.createShape(ShapeType.CIRCLE).draw();
    ShapeFactory.createShape(ShapeType.TRIANGLE).draw();
  }
}

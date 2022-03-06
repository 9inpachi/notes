package org.practice.designpatterns.abstractfactory;

interface Shape {
  void draw();
}

enum ShapeType {
  SQUARE,
  RECTANGLE
};

class Square implements Shape {
  @Override
  public void draw() {
    System.out.println("Drew Square");
  }
}

class Rectangle implements Shape {
  @Override
  public void draw() {
    System.out.println("Drew Rectangle");
  }
}

class RoundedSquare implements Shape {
  @Override
  public void draw() {
    System.out.println("Drew Rounded Square");
  }
}

class RoundedRectangle implements Shape {
  @Override
  public void draw() {
    System.out.println("Drew Rounded Rectangle");
  }
}

abstract class AbstractShapeFactory {
  abstract Shape createShape(ShapeType type);
}

class ShapeFactory extends AbstractShapeFactory {
  @Override
  Shape createShape(ShapeType type) {
    switch(type) {
      case SQUARE:
        return new Square();
      case RECTANGLE:
        return new Rectangle();
      default:
        throw new RuntimeException("Invalid shape type");
    }
  }
}

class RoundedShapeFactory extends AbstractShapeFactory {
  @Override
  Shape createShape(ShapeType type) {
    switch(type) {
      case SQUARE:
        return new RoundedSquare();
      case RECTANGLE:
        return new RoundedRectangle();
      default:
        throw new RuntimeException("Invalid shape type");
    }
  }
}

class FactoryMaker {
  static AbstractShapeFactory getShapeFactory(boolean rounded) {
    return rounded ? new RoundedShapeFactory() : new ShapeFactory();
  }
}

/**
 * A pattern that works around a super factory that can be used to create/get
 * other factories. Such factory is called factory of factories.
 * Creational Pattern.
 */
public class AbstractFactory {
  public static void main(String[] args) {
    // Normal
    FactoryMaker.getShapeFactory(false).createShape(ShapeType.SQUARE).draw();
    FactoryMaker.getShapeFactory(false).createShape(ShapeType.RECTANGLE).draw();

    // Rounded
    FactoryMaker.getShapeFactory(true).createShape(ShapeType.SQUARE).draw();
    FactoryMaker.getShapeFactory(true).createShape(ShapeType.RECTANGLE).draw();
  }
}

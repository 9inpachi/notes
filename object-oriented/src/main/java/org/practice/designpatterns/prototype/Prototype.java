package org.practice.designpatterns.prototype;

abstract class Shape implements Cloneable {
  abstract void draw();

  public Shape makeCopy() {
    System.out.println("Cloning shape");

    try {
      return (Shape) super.clone();
    } catch (CloneNotSupportedException e) {
      e.printStackTrace();
    }

    return null;
  }
}

class Square extends Shape {
  @Override
  public void draw() {
    System.out.println("Drew Square");
  }
}

class Circle extends Shape {
  @Override
  public void draw() {
    System.out.println("Drew Circle");
  }
}

class CloneFactory {
  public static Shape getClone(Shape shape) {
    return shape.makeCopy();
  }
}

/**
 * Pattern used to create a clone of an object. Used when creating a new object is costly
 * and the object already has some information (for example from database).
 * Creational Pattern.
 */
public class Prototype {
  public static void main(String[] args) {
    Square square = new Square();
    Square squareCloned = (Square) CloneFactory.getClone(square);

    square.draw();
    squareCloned.draw();

    System.out.println("Square hashcode: " + square.hashCode());
    System.out.println("Square clone hashcode: " + squareCloned.hashCode());
  }
}

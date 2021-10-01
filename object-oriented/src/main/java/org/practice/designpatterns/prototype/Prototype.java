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

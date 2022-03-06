package org.practice.oop;

abstract class Animal {
  private final String name;

  Animal(String name) {
    this.name = name;
  }

  public void eat() {
    System.out.println(this.name + " is eating");
  }

  public abstract void speak();
}

class Dog extends Animal {
  Dog() {
    super("Dog");
  }

  public void speak() {
    System.out.print("Bark!");
  }
}

public class Abstraction {
  public static void main(String[] args) {
    Animal dog = new Dog();
    dog.eat();
    dog.speak();
  }
}

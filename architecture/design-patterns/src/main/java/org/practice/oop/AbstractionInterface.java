package org.practice.oop;

interface AnimalInterface {
  public void eat();

  public void speak();
}

class DogFromInterface implements AnimalInterface {
  @Override
  public void eat() {
    System.out.println("Dog is eating");
  }

  @Override
  public void speak() {
    System.out.println("Bark!");

  }
}

public class AbstractionInterface {
  public static void main(String[] args) {
    AnimalInterface dog = new DogFromInterface();
    dog.eat();
    dog.speak();
  }
}

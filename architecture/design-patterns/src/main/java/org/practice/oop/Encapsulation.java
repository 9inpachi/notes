package org.practice.oop;

import java.io.Serializable;

public class Encapsulation implements Serializable {
  private String someProperty;

  public void setSomeProperty(String value) {
    someProperty = value;
  }

  public String getSomeProperty() {
    return someProperty;
  }

  public static void main(String[] args) {
    Encapsulation enc = new Encapsulation();

    enc.setSomeProperty("Property value");
    System.out.println(enc.getSomeProperty());
  }
}

package org.practice.designpatterns;

interface Image {
  public void display();
}

class RealImage implements Image {
  final private String fileName;

  RealImage(String fileName) {
    this.fileName = fileName;
    this.loadImage();
  }

  private void loadImage() {
    System.out.println("Image " + fileName + " loaded.");
  }

  @Override
  public void display() {
    System.out.println("Image " + fileName + " displayed.");
  }
}

class ProxyImage implements Image {
  private RealImage image;
  final private String fileName;

  ProxyImage(String fileName) {
    this.fileName = fileName;
  }

  @Override
  public void display() {
    if (image == null) {
      image = new RealImage(fileName);
    }
    image.display();
  }
}

/**
 * A pattern in which a class represents the functionality of another class.
 * Structural Pattern.
 */
public class Proxy {
  public static void main(String[] args) {
    Image image = new ProxyImage("fileName.jpg");
    // Loads the first time.
    image.display();
    // Doesn't load the second time.
    image.display();
  }
}

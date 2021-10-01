package org.practice.designpatterns;

class SingletonConfig {
  private final static SingletonConfig instance = new SingletonConfig();

  private SingletonConfig() {
  }

  public static SingletonConfig getInstance() {
    return instance;
  }

  public void getConfig() {
    System.out.println("Getting config");
  }
}

public class Singleton {
  public static void main(String[] args) {
    SingletonConfig instance = SingletonConfig.getInstance();
    instance.getConfig();
  }
}

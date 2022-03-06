package org.practice.designpatterns.adapter;

interface Drink {
  void prepare();

  void drink();
}

class Tea {
  public void make() {
    System.out.println("Making tea.");
  }

  public void drink() {
    System.out.println("Drinking tea.");
  }
}

class Juice {
  public void make() {
    System.out.println("Making juice.");
  }

  public void shake() {
    System.out.println("Shaking juice.");
  }

  public void drink() {
    System.out.println("Drinking juice.");
  }
}

class DrinkAdapter implements Drink {
  private Juice juice;
  private Tea tea;
  final private String type;

  DrinkAdapter(String type) {
    this.type = type;

    if (type.equals("hot")) {
      tea = new Tea();
    } else {
      juice = new Juice();
    }
  }

  @Override
  public void prepare() {
    if (type.equals("hot")) {
      tea.make();
    } else {
      juice.make();
    }
  }

  @Override
  public void drink() {
    if (type.equals("hot")) {
      tea.drink();
    } else {
      juice.shake();
      juice.drink();
    }
  }
}

/**
 * Pattern used to adapt some existing class to work with a different interface.
 * Structural Pattern.
 */
public class Adapter {
  public static void main(String[] args) {
    // Hot drink.
    Drink adapter = new DrinkAdapter("hot");
    adapter.prepare();
    adapter.drink();

    // Cold drink.
    Drink adapterCold = new DrinkAdapter("cold");
    adapterCold.prepare();
    adapterCold.drink();
  }
}



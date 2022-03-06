package org.practice.designpatterns.observer;

import java.util.ArrayList;
import java.util.List;

abstract class Observer<T> {
  abstract void onUpdate(T value);
}

class Subject<T> {
  List<Observer<T>> observers = new ArrayList<>();
  private T state;

  T getState() {
    return this.state;
  }

  void setState(T state) {
    this.state = state;
    this.notifyAllObservers(state);
  }

  void attach(Observer<T> observer) {
    this.observers.add(observer);
  }

  private void notifyAllObservers(T state) {
    for (Observer<T> observer : observers) {
      observer.onUpdate(state);
    }
  }
}

class Observable<T> extends Observer<T> {
  final String identifier;

  Observable(String identifier) {
    this.identifier = identifier;
  }

  @Override
  void onUpdate(T value) {
    System.out.println("onUpdate of observer " + this.identifier + " called with " + value);
  }
}

/**
 * Pattern used when there is a one-tp-many relationship between objects.
 * That is, when one object is updated, it's dependents are notified of the change.
 * Behavioral Pattern.
 */
public class ObserverPattern {
  public static void main(String[] args) {
    Subject<Integer> subject = new Subject<>();
    subject.attach(new Observable<>("OBSERVER_1"));
    subject.attach(new Observable<>("OBSERVER_2"));
    subject.attach(new Observable<>("OBSERVER_3"));

    subject.setState(123);
    assert subject.getState() == 123;
    subject.setState(345);
    assert subject.getState() == 345;
  }
}

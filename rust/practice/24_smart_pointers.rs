use std::ops::Deref;

// Box<T> Smart Pointer

// This is a special data structure used to demonstrate the `Box<T>`.
enum List {
  // We use `Box<List>` instead of `List` because Rust at compile time sees this
  // type's value as recursive with infinite size and `Box<List>` makes the
  // value a pointer in stack that points to heap. And rust considers only the
  // pointer here which is of a known size.
  Cons(i32, Box<List>),
  Nil,
}

use crate::List::{Cons, Nil};

fn main1() {
  let list = Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nil))))));
}

// `Deref` Trait

struct CustomBox<T>(T);

impl<T> CustomBox<T> {
  fn new(x: T) -> CustomBox<T> {
    CustomBox(x)
  }
}

impl<T> Deref for CustomBox<T> {
  // The `type Target = T;` syntax defines an associated type for the `Deref`
  // trait to use. Associated types are a slightly different way of declaring a
  // generic parameter.
  type Target = T;

  fn deref(&self) -> &Self::Target {
    &self.0
  }
}

fn main2() {
  let x = 5;
  let y = CustomBox::new(x);

  assert_eq!(x, *y);
}

// The `Drop` trait.

struct CustomValue(String);

impl Drop for CustomValue {
  fn drop(&mut self) {
    println!("Custom pointer dropped with value: '{}'", self.0);
  }
}

fn main3() {
  let val = CustomValue(String::from("Hello World!"));
  // Force drop with `std::mem::drop`.
  // std::mem::drop(val);
  println!("Do some operations");
}

// `Rc<T>` for Multiple References to a Value

enum RcList {
  // We use `Rc<List>` so the value here can have multiple references.
  RcCons(i32, Rc<RcList>),
  RcNil,
}

use crate::RcList::{RcCons, RcNil};
use std::rc::Rc;

fn main() {
  let a = Rc::new(RcCons(12, Rc::new(RcCons(10, Rc::new(RcNil)))));
  println!("Checkpoint 1: {}", Rc::strong_count(&a));

  let b = RcCons(2, Rc::clone(&a));
  println!("Checkpoint 2 after creating b: {}", Rc::strong_count(&a));

  {
    let c = RcCons(5, Rc::clone(&a));
    println!("Checkpoint 3 after creating c: {}", Rc::strong_count(&a));
  }

  println!("Checkpoint 4 after cleaning c: {}", Rc::strong_count(&a));
}

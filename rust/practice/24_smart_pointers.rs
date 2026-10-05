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

fn main() {
  let x = 5;
  let y = CustomBox::new(x);

  assert_eq!(x, *y);
}

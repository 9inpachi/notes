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

fn main() {
  let list = Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nil))))));
}

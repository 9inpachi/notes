use std::cmp::PartialOrd;

// `T: PartialOrd` limits the type to ones that implement the `PartialOrd` trait
// which are types that can be compared and have an order.
fn largest<T: PartialOrd>(values: &[T]) -> &T {
  let mut largest = &values[0];

  for value in values {
    if value > largest {
      largest = value;
    }
  }

  largest
}

fn main1() {
  let num_values: [i32; 4] = [1, 3, 199, 3];
  let largest_num = largest(&num_values);
  println!("Largest num: {largest_num}");

  let char_values: [char; 3] = ['c', 'a', 'd'];
  let largest_char = largest(&char_values);
  // Or
  // let largest_char = largest::<char>(&char_values);
  println!("Largest char: {largest_char}");
}

// Generics in Structs
struct PointSimple<T> {
  x: T,
  y: T,
}
// Example: let point = PointSimple { x: 10, y: 10 }

struct Point<T, U> {
  x: T,
  y: U,
}
// Example: let point = Point { x: 10.0, y: 3 }

// Generics in Enums
enum Answer<T> {
  Yes(T),
  No(T),
}

// Generics in Method Definitions
impl<X1, Y1> Point<X1, Y1> {
  fn mixup<X2, Y2>(self, other: Point<X2, Y2>) -> Point<X1, Y2> {
    Point {
      x: self.x,
      y: other.y,
    }
  }
}

// Constraints on Generic Types
impl PointSimple<f32> {
  // This method is only usable with `f32` type.
  fn distance_from_origin(&self) -> f32 {
    (self.x.powi(2) + self.y.powi(2)).sqrt()
  }
}

fn main() {
  let point = PointSimple { x: 10.0, y: 10.0 };
  let distance = point.distance_from_origin();

  println!("Distance from origin: {distance}");
}

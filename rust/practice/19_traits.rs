trait Shape {
  fn get_area(&self) -> u32;
}

struct Rectangle {
  width: u32,
  height: u32,
}

impl Shape for Rectangle {
  fn get_area(&self) -> u32 {
    self.width * self.height
  }
}

struct Triangle {
  base: u32,
  height: u32,
  hypotenuse: u32,
}

impl Shape for Triangle {
  fn get_area(&self) -> u32 {
    (self.base * self.height) / 2
  }
}

fn main1() {
  let rectangle = Rectangle {
    width: 10,
    height: 20,
  };
  let triangle = Triangle {
    base: 10,
    height: 20,
    hypotenuse: 10,
  };

  println!(
    "Rectangle={} Triangle={}",
    rectangle.get_area(),
    triangle.get_area()
  )
}

// A trait method can have a default implementation, then it isn't
// required to implement it.
trait Car {
  fn get_drive_system(&self) -> String {
    String::from("Front Wheel Drive")
  }
}

struct ToyotaAuris {
  engine_capacity: u32,
  model_year: u32,
}

// The `get_drive_system`'s default implementation will be used since we
// didn't override the implementation here.
impl Car for ToyotaAuris {}

// Traits as function parameters.
fn half_of_area(shape: &impl Shape) -> u32 {
  shape.get_area() / 2
}
// The following is equivalent and is the full syntax.
fn half_of_area_2<T: Shape>(shape: &T) -> u32 {
  shape.get_area() / 2
}

// Multiple traits required.
impl ToString for Rectangle {
  fn to_string(&self) -> String {
    format!("rectangle({}, {})", self.width, self.height)
  }
}
fn half_of_area_with_name<T: Shape + ToString>(shape: &T) -> (String, u32) {
  (shape.to_string(), shape.get_area())
}

fn main() {
  let rectangle = Rectangle {
    width: 10,
    height: 10,
  };
  println!("Half of area: {}", half_of_area(&rectangle));

  // This call can only work for `Rectangle` and not `Triangle` as
  // `Triangle` does not implement the `ToString` trait.
  let (rectangle_id, rectangle_half_area) = half_of_area_with_name(&rectangle);
  println!("{} with half of area {}", rectangle_id, rectangle_half_area);
}

// Returning types that implement traits.
fn construct_rect_shape() -> impl Shape {
  Rectangle {
    width: 100,
    height: 50,
  }
}

// Conditional methods for types with implemented traits.
struct TestConditional<T> {
  val: T,
}

impl<T: ToString> TestConditional<T> {
  // This function can only be called if `T` type implements the
  // `ToString` trait. If a type is used that doesn't implement it, this
  // function isn't available for that type.
  fn test_fn(&self) {}
}

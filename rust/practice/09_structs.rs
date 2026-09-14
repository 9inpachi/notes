// Definig a struct.
struct User {
  active: bool,
  username: String,
  email: String,
  sign_in_count: u32,
}

fn main1() {
  // Create an instance of a struct.
  let user = User {
    active: true,
    username: String::from("username123"),
    email: String::from("email@test.com"),
    sign_in_count: 0,
  };

  let mut user1 = build_user(
    String::from("mutable_user"),
    String::from("mutable@user.com"),
  );
  user1.sign_in_count += 1;

  // Updating a struct using the update syntax.

  // It's improtant to note that struct update syntax uses `=` like an
  // assigment. `user1` will not be usable after this because
  // `user1.username` ends up "moving" to `user2`. The other fields for
  // the struct are still usable because the primitive types implement
  // the `Copy` trait and `email` is not "moved".
  let user2 = User {
    email: String::from("email@test.com"),
    ..user1
  };
}

fn build_user(username: String, email: String) -> User {
  User {
    active: true,
    // These are field init shorthands like in JavaScript.
    username,
    email,
    sign_in_count: 0,
  }
}

// Defining a tuple struct.
struct Point(i32, i32, i32);

// Unit-like structs similar to `()` tuple.
struct AlwaysEqual;

fn main2() {
  let point = Point(10, 20, 100);

  // To destructure a tuple struct, we need to specify the name.
  let Point(x, y, z) = point;
  println!("{x}, {y}, {z}");
}

#[derive(Debug)]
struct Rectangle {
  width: u32,
  height: u32,
}

fn main3() {
  let rect = Rectangle {
    width: 100,
    height: 100,
  };

  println!("Area of rectangle is: {}", area(&rect));
}

fn area(rectangle: &Rectangle) -> u32 {
  rectangle.width * rectangle.height
}

fn main() {
  let scale = 10;

  let rect = Rectangle {
    // The `dbg` macro prints the value and returns ownership back.
    width: dbg!(30 * scale),
    height: 20,
  };

  dbg!(&rect);

  // Using `println` with the `#[derive(Debug)]` outer attribute on
  // `Rectangle` trait.
  println!("{rect:?}");
  // Pretty print.
  println!("{rect:#?}");
}

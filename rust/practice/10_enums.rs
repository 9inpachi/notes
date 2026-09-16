// This s a simple enum that doesn't hold any values.
enum IpAddrSimple {
  V4,
  V6,
}

// Complex enums can have specific value types.
enum Message {
  // Simple
  Quit,
  // Struct-like
  Move { x: i32, y: i32 },
  // Simple value
  Write(String)
  // Tuple
  ChangeColor(i32, i32, i32),
}

// Like structs, enums can have methods as well.
impl Message {
  fn call(&self) {
    // `self` will be the reference to the enum value.
  }
}

fn main1() {
  let m = Message::Write(String::from("Hello"));
  // `m` will be the `self` in the `call` function.
  m.call();
}

fn main() {
  let some_num = Some(10);
  let some_char = Some('c');

  // For `None`, `Option` type needs to be specified as Rust cannot infer the type.
  let absent_value: Option<i32> = None;
}

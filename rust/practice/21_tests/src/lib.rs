pub fn add(a: u32, b: u32) -> u32 {
  a + b
}

#[cfg(test)]
mod tests {
  // Using relative path to move up to get access to all items outside the
  // `tests` module.
  use super::*;

  #[test]
  fn test_add() {
    let result = add(32, 32);
    assert_eq!(result, 64);
  }

  #[test]
  fn failing_test() {
    // panic!("I will fail");

    // Message on failure.
    // let result = add(32, 32);
    // assert_eq!(result, 32, "This is a failure message, result was {result}");
  }
}

struct Rectangle {
  width: u32,
  height: u32,
}

impl Rectangle {
  fn can_hold(&self, other: &Rectangle) -> bool {
    self.width > other.width && self.height > other.height
  }
}

#[cfg(test)]
mod tests2 {
  use super::*;

  #[test]
  fn larger_can_hold_smaller_test() {
    let larger = Rectangle {
      width: 100,
      height: 100,
    };
    let smaller = Rectangle {
      width: 50,
      height: 50,
    };

    // Boolean assert.
    assert!(larger.can_hold(&smaller));
  }

  #[test]
  fn smaller_cannot_hold_larger_test() {
    let smaller = Rectangle {
      width: 50,
      height: 50,
    };
    let larger = Rectangle {
      width: 100,
      height: 100,
    };

    // Boolean assert.
    assert!(!smaller.can_hold(&larger));
  }
}

pub struct Guess {
  value: i32,
}

impl Guess {
  pub fn new(value: i32) -> Guess {
    if value < 1 || value > 100 {
      panic!("Guess value must be between 1 and 100, got {value}.");
    }

    Guess { value }
  }
}

#[cfg(test)]
mod tests3 {
  use super::*;

  #[test]
  // This tests that a `panic` is expected.
  #[should_panic]
  fn greater_than_100() {
    Guess::new(200);
  }

  #[test]
  // `panic`ing with an expected message.
  #[should_panic(expected = "message should match")]
  fn panic_with_message() {
    panic!("The message should match the attribute.");
  }
}

#[cfg(test)]
mod tests4 {
  #[test]
  // A test where an `Ok` return passes the test and an `Err` fails it.
  fn test_using_result() -> Result<(), String> {
    let n = 10;

    if n < 100 {
      Ok(())
    } else {
      Err(String::from("Not true. Test failed."))
    }

  }
}

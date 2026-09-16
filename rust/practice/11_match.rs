#[derive(Debug)]
enum Size {
  XL,
  L,
  M,
  // This enum variant is holding additional data.
  S(String),
}

fn main1() {
  let size = Size::M;
  let numbers_size = size_in_numbers(&size);

  println!("Size {size:?} = {numbers_size}");

  let size_small = Size::S(String::from("Small"));
  let s_numbers_size = size_in_numbers(&size_small);

  println!("Size {size_small:?} = {s_numbers_size}");
}

fn size_in_numbers(size: &Size) -> u8 {
  // This returns the value from the function.
  match size {
    Size::XL => 60,
    Size::L => 50,
    Size::M => 40,
    // We can use multiline statements by using braces.
    Size::S(full_name) => {
      println!("Using {full_name} size");
      30
    }
  }
}

fn main2() {
  option_usage();

  dice_roll(2);
}

fn option_usage() {
  let five = Some(5);
  // This is Some(6);
  let six = add_one(five);

  match six {
    Some(i) => println!("{i}"),
    None => (),
  }

  // This is none.
  let _none = add_one(None);
}

fn add_one(val: Option<i32>) -> Option<i32> {
  match val {
    Some(i) => Some(i + 1),
    None => None,
  }
}

// Catch all example.
fn dice_roll(num: i32) {
  match num {
    3 => println!("Winner!"),
    5 => println!("Loser!"),
    other => println!("Rolled {other}. Do it again."),
    // If `other` value is not needed. Use `_` as placeholder.
    // _ => println!("Wrong dice. Do it again."),
  }
}

fn main() {
  let optional: Option<i32> = Some(10);
  // `if let` is concise syntax for `match` where `None` or `other` need
  // to be specified. That's not needed with `if let`.
  if let Some(value) = optional {
    println!("The optional has a value of {value}");
  }

  // With an `else`.
  if let Some(value) = optional {
    println!("Has value {value}");
  } else {
    println!("No value");
  }

  // `let else` is the inverse of `if let`. This could be used to return
  // early in a function and process real values straightforwardly.
  let Some(value) = optional else {
    println!("Useful for only `else` cases");
    // Code in `let else` must diverge. So it needs `return` or `panic`
    // or process exit.
    return;
  };

  // Assigning result.
  let value_fallback = if let Some(value) = optional { value } else { 0 };
}

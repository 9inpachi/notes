const MINUTES_IN_DAY: u32 = 60 * 24;

// Mutable Variable
fn main1() {
  // This is a mutable variable. Without `mut` we cannot change the
  // variable value afterwards.
  let mut x = 5;
  x = x * 2;
  println!("x value: {x}");
}

// Variable Shadowing
fn main2() {
  // This variable is `shadowed` below.
  let x = 5;
  // This variable `overshadows` the first assignment.
  let x = x + 1;

  {
    // This overshadows the variable only for the current scope.
    let x = x * 2;
    println!("x in scope: {x}");
  }

  println!("x: {x}");
}

// Variable Shadowing Usage
fn main() {
  // With shadowing, since we are effectively creating a new variable, the type
  // of the new variable can be different. We cannot do the same with `mut` as
  // the type must remain same for mutable variables.
  let spaces = "   ";
  // Notice we don't need something like `spaces_len`.
  let spaces = spaces.len();
}

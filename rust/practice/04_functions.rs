fn main() {
  another_function();
  print_labeled(5, 's');
  statements_and_expressions();
  println!("Addition: {}", add(5, 5));
  // Pretty printed empty tuple (like `void`).
  println!("{:?}", no_return());
}

// Function can be defined above or below the caller. (Kind of like hoisting)
fn another_function() {
  println!("Coming from another function");
}

fn print_labeled(value: i32, label: char) {
  println!("{value}{label}");
}

fn statements_and_expressions() {
  // Example Statements
  let x = 5;
  let y = x + 5;

  // Example Expressions
  // The curly braces block is an expression.
  let r = {
    let x = 5;
    // This is an expression but adding a semicolon at the end of it will make
    // it a statement.
    x + 1
  };

  // Calling a macro is an expression. This line itself is a statement as it has
  // a semicolon.
  println!("Hello World");
}

fn add(v1: i32, v2: i32) -> i32 {
  // This is an expression and is the return value of this function.
  v1 + v2
}

fn no_return() {
  // Since there is a semicolon at the end, this function doesn't return
  // anything but an empty tuple `()`.
  1 + 1;
}

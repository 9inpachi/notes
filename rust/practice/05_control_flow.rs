// Conditional
fn main1() {
  let num = 5;

  // Condition in the `if` statement must be a boolean otherwise there will be
  // an error.
  if num < 3 {
    println!("Number is less than 3");
  } else {
    println!("Number is greater than or equal to 3");
  }

  // Else if
  let num = 6;

  if num % 2 == 0 {
    println!("Divisible by 2");
  } else if num % 3 == 0 {
    println!("Divisible by 3");
  } else if num % 4 == 0 {
    println!("Divisible by 4");
  } else {
    println!("Not divisble by 2, 3 or 4");
  }

  // `if` in a let statement.
  let condition: bool = true;
  let x = if condition { 2 } else { 3 };
}

// Loops
fn main() {
  // Labeling an outer loop.
  let mut count = 0;

  // `counting_up` is the label of the loop here.
  'counting_up: loop {
    println!("count: {count}");

    let mut remaining = 10;

    loop {
      println!("remaining: {remaining}");

      if remaining == 9 {
        break;
      }

      if count == 2 {
        break 'counting_up;
      }

      remaining -= 1;
    }

    count += 1;
  }

  println!("End count = {count}");

  // While Loop
  let mut num = 10;

  while num != 0 {
    println!("{num}");
    num -= 1;
  }

  let arr = [1, 2, 3];
  let mut index = 0;

  while index < 3 {
    println!("arr value: {}", arr[index]);
    index += 1;
  }

  // For Loop
  for element in arr {
    println!("arr value in for: {element}");
  }

  for element in (1..4).rev() {
    println!("for loop in range: {element}");
  }
}

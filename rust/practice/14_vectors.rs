fn main1() {
  let mut v1: Vec<i32> = Vec::new();

  // Macro for creating a vector with default elements.
  let v2 = vec![1, 2, 3];

  // Updating a vector.
  v1.push(1);
  v1.push(2);
  v1.push(3);

  // Reading from a vector.
  // This will panic if there is no item at index 2.
  let third: &i32 = &v1[2];
  // This will return an `Option` where we can handle `None` value ourselves.
  let third: Option<&i32> = v1.get(2);
  match third {
    Some(num) => println!("Value at index 2: {num}"),
    None => println!("No value at index 2"),
  }
}

fn main2() {
  let mut v = vec![1, 2, 3];
  // We get an immutable reference to the first element.
  let first = &v[0];

  // This will not work because we have an immutable reference to the first
  // element of `v` (&v[0]) and if the vector size changes and the vector data needs to
  // be moved to a different space in memory, it will cause issues if we mutate
  // the vector.
  // v.push(4);

  println!("The first element is: {first}");
}

fn main3() {
  let v = vec![1, 2, 3];

  for i in &v {
    println!("{i}");
  }

  // Iterating over mutable references.
  let mut v = vec![1, 2, 3];
  for i in &mut v {
    *i += 10;
    println!("{i}");
  }
}

// Storing multiple types in a vector with enums.
#[derive(Debug)]
enum Cell {
  Int(i32),
  Float(f64),
  Text(String),
}

fn main() {
  let row: Vec<Cell> = vec![
    Cell::Int(24),
    Cell::Float(25.4),
    Cell::Text(String::from("Hello")),
  ];

  println!("{row:?}");
}

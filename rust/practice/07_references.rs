fn main1() {
  let s = String::from("Hello");

  // This passes an "immutable" reference of `s` to the function so the
  // ownership remains with `s` instead of it becoming invalidated and
  // moving to the function.
  let len = calculate_length(&s);

  // `s` is still usable here because it was not invalidated.
  println!("The string {s} has length {len}");
}

fn calculate_length(s: &String) -> usize {
  s.len()
}

fn main2() {
  let mut s = String::from("Hello");

  // This is a mutable reference and it allows us to update the value of
  // the variable inside the function.
  add_to_string(&mut s);
}

fn add_to_string(s: &mut String) {
  s.push_str(" World");
}

fn main() {
  let mut s = String::from("Hello");

  // This will fail as there can only be 1 mutabla reference to a value at a time.
  // let r1 = &mut s;
  // let r2 = &mut s;

  // println!("{r1}, {r2}");

  // Following are two options to deal with this.

  // Option 1: Declare a scope for the mutable reference.
  {
    let r1 = &mut s;
    println!("{r1}");
  }
  let r2 = &mut s;
  println!("{r2}");

  // Option 2: Only create the second reference after the last usage of
  // the first reference. A reference's scope starts from where it is
  // introduced and continues through the last time the reference is
  // used.
  let re1 = &mut s;
  println!("{re1}");

  // `re1` will not be used after this and is this out of scope at this point.
  let re2 = &mut s;
  println!("{re2}");
}

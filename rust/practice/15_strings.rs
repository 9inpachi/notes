fn main1() {
  // String literal.
  let str_literal = "String Literal";

  let s: String = str_literal.to_string();
  let s = "String Literal".to_string();

  let s = String::from(str_literal);
}

fn main2() {
  // Updating a string.
  let mut s = String::from("Hello");

  let s2 = " World!";
  // The `push_str` takes a string slice (&str) because we don't want to
  // transfer ownership of `s2` to the `push_str` method and keep `s2` usable
  // afterwards.
  s.push_str(s2);

  println!("{s} | {s2}");

  // `push` takes a single char.
  let mut s = String::from("lo");
  s.push('l');

  println!("{s}");
}

fn main3() {
  // Concatenating with +.
  let s1 = String::from("Hello");
  let s2 = String::from(" World!");
  // Using the `+` operator moves ownership of `s1` to s3. This is because the
  // underlying function's signature looks like this: `fn add(self, s: &str) ->
  // String`
  let s3 = s1 + &s2;

  // `s1` is no longer usable here.
  println!("{s3}");

  let s1 = String::from("tic");
  let s2 = String::from("tac");
  let s3 = String::from("toe");

  // This is a bit unwieldy.
  // let s = s1 + "-" + &s2 + "-" + &s3;
  // println!("{s}");

  // Concatenating with the `format` macro.
  let s = format!("{s1}-{s2}-{s3}");
  println!("{s}");
}

fn main4() {
  // Slicing strings.
  let hello = "Здравствуйте";
  // This slice contains 4 bytes of the string.
  let s = &hello[0..4];

  // This will fail here because each letter in `hello` is at least 4 bytes
  // long.
  // let s = &hello[0..2];
}

fn main() {
  // Iterating over strings.
  for c in "hello".chars() {
    print!("{c} ");
  }

  println!();

  // Iterating over bytes.
  for b in "hello".bytes() {
    print!("{b} ");
  }
}

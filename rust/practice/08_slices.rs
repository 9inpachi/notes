fn main() {
  let str_literal = "Hello World!";

  // `&str_literal[..]` creates a slice that references the original
  // string.
  let found = first_word(&str_literal[..]);

  println!("{found}");

  // Other ways of slicing a string.
  println!("{}", &str_literal[0..3]);
  println!("{}", &str_literal[..3]); // This is the same as `0..3`.
  println!("{}", &str_literal[5..]); // This is the same as `5..length`.

  // Slicing an array.
  let a = [1, 2, 3, 4];
  assert_eq!(&[1, 2], &a[0..2]);
}

// `&str` is the type for a String slice.
fn first_word(s: &str) -> &str {
  let bytes = s.as_bytes();

  for (i, &item) in bytes.iter().enumerate() {
    if item == b' ' {
      return &s[0..i];
    }
  }

  // This is for 0 to s.len().
  &s[..]
}

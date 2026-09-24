// `'a` here is a generic lifetime that tells the compiler that the lifetime of
// the returned reference is tied to the parameters and in this particular case,
// whichever parameter has the shortest lifetime, that will be used for the
// returned reference. More details in README.md.
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
  if x.len() > y.len() {
    x
  } else {
    y
  }
}

fn main1() {
  let str1 = String::from("Hello");
  let str2 = "World!";

  let long = longest(str1.as_str(), str2);

  println!("{long}");

  // This is a static lifetime which makes the affected reference live as long
  // as the program runs. It's the full syntax for string literals.
  let s: &'static str = "Test";
}

struct ImportantExcerpt<'a> {
  // String slice.
  part: &'a str,
}

fn main() {
  let text = String::from("Hello. World");
  let first = text.split('.').next().unwrap();
  let i = ImportantExcerpt { part: first };
}

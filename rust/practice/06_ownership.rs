fn main1() {
  // String literal and it's scope. String literals get fixed size in memory.
  {
    // `s` is not in scope here.
    let s = "Hello"; // `s` is valid from this point forward.
  } // `s` is no longer valid after this scope.

  // Fixed sized types are stored directly in stack and not heap.
  {
    let val1 = 5;
    // `val2` is just a copy of `val1` and doesn't point to the same value as
    // `val1` (not a pointer).
    let val2 = val1;

    // Both `val1` and `val2` can be used here unlike the `String` type where
    // `val1` would have been invalidated (see below).
  }

  // String from `String` type with memory management.
  {
    // This is stored and managed by the `String` type on the heap and used for
    // strings that change size at runtime.
    let mut s = String::from("Hello");
    s.push_str(", world!");
  } // `s.drop()` is called once `s` is out of scope to free heap in memory.

  // Variable `move` when first variable is invalidated when assigned to a new
  // variable. This is shallow copy.
  {
    let s1 = String::from("hello");
    // `s2` is created as a `shallow` copy. The `s1` pointer data in stack is
    // copied and a new `s2` pointer data in stack is created with the same
    // pointer address, length and size as `s1`.
    let s2 = s1;

    // At this point, `s1` cannot be used as Rust `invalidates` the first
    // variable and `moves` ownership to the second variable to avoid double
    // pointers.

    // This will throw an error.
    // println!("{s1} world");
  }

  // Variable deep copy.
  {
    let s1 = String::from("Hello");
    // This creates an intentional deep copy and stores s2 at a different
    // location in heap compared to s1.
    let s2 = s1.clone();

    // Both `s1` and `s2` can be used here.
  }
}

fn main2() {
  let s = String::from("Hello");

  // Using tuples to return the passed value is a pattern for
  // getting a return value along with the original arg.
  let (s2, len) = calculate_length(s);

  println!("String {s2} has a length of {len}");
}

fn calculate_length(s: String) -> (String, usize) {
  let length = s.len();
  (s, length)
}

fn main() {
  let s = String::from("Hello");
  // Passing `s` is like assigning it to a new variable and invalidates this
  // variable and `moves` it to the function.
  take_ownership(s);

  // `s` is not usable here as passing `s` to a function `moves` the variable to
  // the one inside the function.

  // This throws a compiler error.
  // println!("{s}");

  let n = 5;
  // Since integer is stored in stack and is not a complex type, a copy of it is
  // created in the function and `n` is still usable after the function call.
  make_copy(n);

  println!("{n}");
}

fn take_ownership(str: String) {
  println!("{str}");
}

fn make_copy(num: i32) -> i32 {
  println!("{num}");
  num + 1
}

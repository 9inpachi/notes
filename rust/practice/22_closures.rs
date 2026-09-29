#[derive(Debug)]
struct Rectangle {
  width: u32,
  height: u32,
}

fn main() {
  let mut list = [
    Rectangle {
      width: 10,
      height: 1,
    },
    Rectangle {
      width: 3,
      height: 5,
    },
    Rectangle {
      width: 7,
      height: 12,
    },
  ];

  list.sort_by_key(|r| r.width);
  println!("{list:#?}");

  let mut sort_ops: Vec<String> = vec![];
  let value = String::from("Closure called");
  let mut sort_call_count = 0;

  list.sort_by_key(|r| {
    sort_call_count += 1;
    // This won't work because in this closure, the compiler will use the
    // `FnOnce` trait for it because the `value` is moved/transferred to the
    // `sort_ops` vector and trying to use it again on a second pass will lead
    // to an error as `value` would not exist then.
    //------- sort_ops.push(value);
    r.width
  });

  println!("Sort called {sort_call_count} times");
}

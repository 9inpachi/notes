use std::collections::HashMap;

fn main1() {
  let mut map = HashMap::new();
  map.insert(String::from("test1"), 10);
  map.insert(String::from("test2"), 20);

  println!("{map:?}");

  // Getting values.

  let key = String::from("test1");
  // `HashMap.get` returns `Option<&i32>` so we use `copied()` to get
  // `Option<i32>` instead. `HashMap.get` returns `None` if there is no value.
  // We also use `.unwrap_or` here to use a fallback value in case of `None`.
  let val = map.get(&key).copied().unwrap_or(0);

  println!("{val}");

  // Iterating over the HashMap.
  for (key, value) in &map {
    println!("{key}: {value}");
  }

  // Passing values moves ownership to the HashMap.
  let mut str_map = HashMap::new();
  let key = String::from("hello");
  let value = String::from("world");

  str_map.insert(key, value);
  // `key` and `value` are not usable anymore since ownership has moved to the
  // HashMap.

  println!("{str_map:?}");
}

fn main() {
  // Overwriting a value.
  let mut map = HashMap::new();
  map.insert(String::from("key"), 10);
  map.insert(String::from("key"), 20);

  println!("{map:?}");

  // Only add if key is not present.
  map.entry(String::from("key1")).or_insert(30);

  // Updating values inline.

  let s = "hello to the hello world";
  let mut count_map = HashMap::new();

  for word in s.split_whitespace() {
    let count = count_map.entry(word).or_insert(0);
    // `or_insert` returns a mutable reference (`&mut val`) to the value which
    // we can derefence and update the value of.
    *count += 1;
  }

  println!("{count_map:?}");
}

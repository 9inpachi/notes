use std::fs::File;
use std::io::{self, ErrorKind, Read};

fn main1() {
  // Using `Result` to handle recoverable errors.
  let file_result = File::open("hello.txt");

  let file = match file_result {
    Ok(file) => file,
    Err(error) => panic!("Error opening file {error:?}"),
  };
}

fn main2() {
  // Match on different errors.
  let file_result = File::open("hello.txt");

  let file = match file_result {
    Ok(file) => file,
    Err(error) => match error.kind() {
      // If file not found, create a new file.
      ErrorKind::NotFound => match File::create("hello.txt") {
        Ok(fc) => fc,
        Err(e) => panic!("Problem creating the file: {e:?}"),
      },
      _ => {
        panic!("Problem opening the file: {error:?}");
      }
    },
  };
}

fn main3() {
  // Shortcut for panic on error.
  // `unwrap` will either return the file or panic.
  let file_result = File::open("hello.txt").unwrap();
  // `expect` on `Result` is similar to `unwrap` except that it passes a message
  // to the `panic` call.
  let file_result = File::open("hello.txt").expect("Expected a file to be there");
}

fn main() {
  let result = read_name_from_file();
  println!("Failed with error: {result:?}");
}

// Propagating errors back to the caller.
fn read_name_from_file() -> Result<String, io::Error> {
  let file_result = File::open("hello.txt");

  let mut file = match file_result {
    Ok(file) => file,
    Err(error) => return Err(error),
  };

  let mut username = String::new();

  match file.read_to_string(&mut username) {
    Ok(_) => Ok(username),
    Err(e) => Err(e),
  }
}

fn read_name_from_file_simple() -> Result<String, io::Error> {
  // The `?` at the end either gives the result or returns the error to the
  // caller.
  let mut file = File::open("hello.txt")?;
  let mut username = String::new();
  // Call or return in case of error with `?`.
  file.read_to_string(&mut username)?;
  Ok(username)
}

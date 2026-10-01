// Just checking package availability. Not used.
use rand;

pub fn add_one(num: u64) -> u64 {
  num + 1
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn it_works() {
    let result = add_one(2);
    assert_eq!(result, 3);
  }
}

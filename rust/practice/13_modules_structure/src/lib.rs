// `mod` brings the file `src/front_of_house.rs` into the module tree at the
// crate root. Without this declaration the file is never compiled and the path
// `crate::front_of_house` does not exist.
mod front_of_house;

use crate::front_of_house::hosting::add_to_waitlist;

pub fn eat_at_restaurant() {
  add_to_waitlist();
}

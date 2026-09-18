// `front_of_house` is accessible in `eat_at_restaurant` because
// they are siblings.
mod front_of_house {
  // `hosting` needs to be made public as it's inside another module
  // and `eat_at_restaurant` doesn't have access to it.
  pub mod hosting {
    // This function also needs to be made public to be accessed
    // from `eat_at_restaurant`.
    pub fn add_to_waitlist() {}
  }
}

fn eat_at_restaurant() {
  // Absolute
  // Absolute paths to modules start with `crate` which is the library's root.
  crate::front_of_house::hosting::add_to_waitlist();

  // Relative
  front_of_house::hosting::add_to_waitlist();
}

// Using `super`.
fn deliver_order() {}

mod back_of_house {
  fn fix_incorrect_order() {
    cook_order();
    // Since `fix_incorrect_order` is a part of the `back_of_house` module,
    // using `super` moves it one above and to the `crate` (root) level.
    super::deliver_order();
  }

  fn cook_order() {}

  pub struct Breakfast {
    // This is public.
    pub toast: String,
    // This is private.
    seasonal_fruit: String,
  }

  impl Breakfast {
    pub fn summer(toast: &str) -> Breakfast {
        Breakfast {
            toast: String::from(toast),
            seasonal_fruit: String::from("peaches"),
        }
    }
  }
}

fn breakfast_at_restaurant() {
    let mut breakfast = back_of_house::Breakfast::summer("Wheat");
    breakfast.toast = String::from("Whole Wheat");
    // This will throw an error as the field is private.
    // breakfast.seasonal_fruit = String::from("apple");

    println!("I'd like {} toast please", breakfast.toast);
}

fn main() {
    breakfast_at_restaurant();
}



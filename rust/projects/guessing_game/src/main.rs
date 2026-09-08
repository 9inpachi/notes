use std::cmp::Ordering;
use std::io;

use rand::Rng;

fn main() {
  println!("Guess a number!");

  let secret_number = rand::thread_rng().gen_range(1..=100);

  // Remove this in real program.
  // println!("The secret number is: {secret_number}");

  // This is an infinite loop.
  loop {
    println!("Input your guess: ");

    let mut guess = String::new();

    io::stdin()
      .read_line(&mut guess)
      .expect("Failed to read line");

    let guess: u32 = match guess.trim().parse() {
      Ok(num) => num,
      Err(_) => continue,
    };

    println!("You guessed: {guess}");

    match guess.cmp(&secret_number) {
      Ordering::Less => println!("Guess too small"),
      Ordering::Greater => println!("Guess too big"),
      Ordering::Equal => {
        println!("Guess correct!");
        // Break the infinite loop.
        break;
      }
    }
  }
}

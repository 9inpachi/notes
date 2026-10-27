// Encapsulation

// The struct is public but its members are private.
pub struct AveragedCollection {
  list: Vec<i32>,
  average: f64,
}

impl AveragedCollection {
  pub fn new() -> AveragedCollection {
    AveragedCollection {
      list: vec![],
      average: 0.0,
    }
  }

  pub fn add(&mut self, num: i32) {
    self.list.push(num);
    self.update_average();
  }

  pub fn remove(&mut self) -> Option<i32> {
    let result = self.list.pop();

    match result {
      Some(val) => {
        self.update_average();
        Some(val)
      }
      None => None,
    }
  }

  pub fn average(&self) -> f64 {
    self.average
  }

  fn update_average(&mut self) {
    let sum: i32 = self.list.iter().sum();
    self.average = sum as f64 / self.list.len() as f64;
  }
}

fn main() {
  let mut averaged = AveragedCollection::new();

  averaged.add(10);
  averaged.add(20);

  println!("Average: {}", averaged.average());

  averaged.remove();

  println!("Average: {}", averaged.average());
}

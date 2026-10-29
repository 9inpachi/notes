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

fn main1() {
  let mut averaged = AveragedCollection::new();

  averaged.add(10);
  averaged.add(20);

  println!("Average: {}", averaged.average());

  averaged.remove();

  println!("Average: {}", averaged.average());
}

// Shared Behavior

// An interface
pub trait Draw {
  fn draw(&self);
}

// Some implementations
#[derive(Debug)]
pub struct Button {
  label: String,
  width: u32,
  height: u32,
}

impl Draw for Button {
  fn draw(&self) {
    println!("Drew Button {:?}", self);
  }
}

#[derive(Debug)]
pub struct SelectBox {
  options: Vec<String>,
  width: u32,
  height: u32,
}

impl Draw for SelectBox {
  fn draw(&self) {
    println!("Drew SelectBox {:?}", self);
  }
}

// User of the interface.
pub struct Screen {
  // Usage of the interface. The `Box<dyn Draw>` here is a "trait object" which
  // defines that any type implementing this trait can be used here.
  pub components: Vec<Box<dyn Draw>>,
}

impl Screen {
  pub fn run(&self) {
    for component in self.components.iter() {
      component.draw();
    }
  }
}

fn main() {
  let screen = Screen {
    components: vec![
      Box::new(Button {
        width: 32,
        height: 8,
        label: String::from("Ok"),
      }),
      Box::new(SelectBox {
        width: 100,
        height: 100,
        options: vec![String::from("Option 1"), String::from("Option 2")],
      }),
    ],
  };

  screen.run();
}

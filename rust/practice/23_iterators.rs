fn main1() {
  let v = vec![1, 2, 3];
  let mut v_iter = v.iter();

  assert_eq!(v_iter.next(), Some(&1));
  assert_eq!(v_iter.next(), Some(&2));
  assert_eq!(v_iter.next(), Some(&3));
  assert_eq!(v_iter.next(), None);
}

#[derive(PartialEq, Debug)]
struct Shoe {
  size: u32,
  name: String,
}

fn shoes_of_size(shoes: Vec<Shoe>, shoe_size: u32) -> Vec<Shoe> {
  shoes
    .into_iter()
    .filter(|shoe| shoe.size == shoe_size)
    .collect()
}

fn main() {
  let shoes = vec![
    Shoe {
      size: 2,
      name: String::from("Adidas"),
    },
    Shoe {
      size: 3,
      name: String::from("Nike"),
    },
    Shoe {
      size: 3,
      name: String::from("Bata"),
    },
  ];

  let filtered_shoes = shoes_of_size(shoes, 2);

  assert_eq!(
    filtered_shoes,
    vec![Shoe {
      size: 2,
      name: String::from("Adidas"),
    }]
  );
}

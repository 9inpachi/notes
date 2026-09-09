// Scalar Types
fn main1() {
  // Integers
  // Unsigned integer u8 can hold 0 to 255.
  let unsigned_x: u8 = 10;
  // Signed integer i8 can hold -128 to 127.
  let signed_x: i8 = -100;

  // Floats
  let float_default = 10.4; // f64
  let float_f32: f32 = 10.4;

  // Numeric Operations

  let sum = 5 + 10;
  let difference = 10.5 - 30.2;
  let product = 10.5 * 2.5;

  // Division
  let quotient = 10.5 / 2.5;
  let truncated = -5 / 3; // Gives -1 as integers are floored.

  let remainder = 10 % 3;

  // Booleans
  let truthy = true;
  let falsy: bool = false;

  // Character
  let c = 'z';
  let cc: char = 'Z';
}

// Compound Types
fn main() {
  // Tuples
  // Tuples are considered a single compound element.
  let tup: (u32, f64, char) = (300, 20.4, 'Z');
  // Tuple destructuring.
  let (x, y, z) = tup;

  // We can also access tuple values by using `.{index}`.
  let int_num = tup.0;
  let float_num = tup.1;
  let c = tup.2;

  // `unit` - a tuple without any values. Default return type.
  let tup: () = ();

  // Arrays
  let arr = [1, 2, 3];
  // An array of type i8 and with a length of 5.
  let arr: [i8; 5] = [1, 2, 3, 4, 5];
  // Creates an array of 5 elements with an initial value 3 for all elements.
  let arr = [3; 5];

  let third_el = arr[2];

  // This will panic the program at runtime if `index` is an input or dynamic
  // value.
  // let invalid_el = arr[index];
}

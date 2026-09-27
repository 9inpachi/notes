use tests::add;

mod common;

#[test]
fn add_integration_test() {
  // Try running with `cargo test -- --show-output` to see the println.
  common::setup();

  let result = add(2, 2);
  assert_eq!(result, 4);
}

// `src/main.rs` is its own crate root, separate from `src/lib.rs`. It reaches
// the library's public items through the package name, not through `crate::`.
use modules_structure::eat_at_restaurant;

fn main() {
  eat_at_restaurant();
}

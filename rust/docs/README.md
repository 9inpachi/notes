# Rust Notes

- [Resources](#resources)
- [Install Rust](#install-rust)
- [Cargo](#cargo)
- [Concepts](#concepts)
  - [Crates](#crates)
  - [Data Types](#data-types)
    - [Integer](#integer)
    - [Floats](#floats)
    - [Compound Data Types](#compound-data-types)
      - [Tuples](#tuples)
      - [Arrays](#arrays)
  - [Functions](#functions)
    - [Statements and Expressions](#statements-and-expressions)
  - [Ownership](#ownership)
    - [Stack and Heap](#stack-and-heap)
    - [Ownership Rules](#ownership-rules)
    - [String Type](#string-type)
    - [Memory and Allocation](#memory-and-allocation)
      - [Stack and Heap](#stack-and-heap-1)
    - [Stack Only Data (Copy)](#stack-only-data-copy)
    - [References](#references)
      - [Dangling References](#dangling-references)
    - [Ownership in Functions](#ownership-in-functions)
    - [Slice Type](#slice-type)
  - [Structs](#structs)
    - [Derived Traits](#derived-traits)
    - [Struct Methods](#struct-methods)
    - [Associated Functions](#associated-functions)
    - [Multiple `impl` Blocks](#multiple-impl-blocks)
  - [Enums](#enums)
    - [Option Enum](#option-enum)

## Resources

- <https://doc.rust-lang.org/stable/book/title-page.html>

## Install Rust

```sh
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

## Cargo

Cargo is the Rust's build and package management tool.

```sh
# Create a new project.
cargo new hello_cargo

# Build the project and then run from `./target/debug/hello_cargo`.
cargo build

# Directly run the project with `main()` as the entrypoint.
cargo run

# Check code without creating an executable.
cargo check

# Building for release to compile with optimizations. Outputs in `./target/release/hello_cargo`.
cargo build --release

# Update dependencies (and rewrite Cargo.lock) based on the semantic version specified in Cargo.toml.
cargo update
```

## Concepts

### Crates

A crate is a collection of Rust source code files. There are two types of crates.

- **Binary crates** which are executable.
- **Library crates** which contain code intended to be used by other programs and can't be executed on its own.

Cargo is used for coordination of external crates. We declare external crates by specifying them in the `[dependencies]` section of `Cargo.toml`.

```toml
[dependencies]
rand = "0.8.5"
```

After adding a dependency, `cargo build` can be used to build the dependency and transitive dependencies added because of it.

### Data Types

Rust is a statically typed language so it must know about types of all variables at compile time.

Rust has four scalar data types.

- Integer
- Floating point numbers
- Boolean
- Character

#### Integer

Integers can be signed and unsigned (with negative values) and support the following primitive types.

```
i8, u8
i16, u16
i32, u32
i64, u64
```

Integers can be written in any of the following forms.

- Decimal: 10_000
- Hex: 0xfff
- Octal: 0o77
- Binary: 0b1111_0000
- Byte (only u8): b'A'

#### Floats

Floats have two primitive types f32 and f64 with f64 being the default.

#### Compound Data Types

##### Tuples

Tuples are used to compound multiple types.

```rs
let tup: (u32, f64, char) = (300, 20.4, 'Z');
```

**Tuples without any values are special and called "unit".** This value and its corresponding type are both written `()` and represent an empty value or an empty return type. Expressions implicitly return the unit value if they don’t return any other value.

##### Arrays

Array are of fixed length and all their values must be of the same type.

```rs
// An array of u8 type and with a length of 3 elements.
let arr: [u8; 3] = [1, 2, 3];
```

### Functions

#### Statements and Expressions

- Statements are instructions that perform some action and do not return a value.
- Expressions evaluate to a resultant value.

### Ownership

#### Stack and Heap

Important read for better understanding: <https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html#the-stack-and-the-heap>

Stack and Heap are parts of memory available to our code for use at runtime.

**Stack:**

Stack stores and removes data from the memory through LIFO (Last In First Out) like how stacks usually work.

**Heap:**

Heap usually stores variable length data at a particular address in memory with a particular length (current size) and capacity (max size).

When we put data on the heap, we request a certain amount of space. The memory allocator finds a big enough spot, marks the spot as being in use and returns a pointer to the spot which is the address of that location. This is called allocating on the heap and also just _allocating_. As pointer to the heap is known and fixed size, we can store the pointer on the stack.

Pushing to the stack is faster than allocating on the heap because the allocator never has to search for a place to store new data; that location is always at the top of the stack.

Comparatively, allocating space on the heap requires more work because the allocator must first find a big enough space to hold the data and then perform bookkeeping to prepare for the next allocation.

#### Ownership Rules

- Each value in Rust has an owner.
- There can only be one owner at a time.
- When the owner goes out of scope, the value will be dropped.

#### String Type

A normal string variable `let s = "hello"` is hard coded into code, is called a string literal and has a fixed size known at compile time.

On the other hand, the `String` type if used manages the data allocated on the heap and is able to store an amount of text that is unknown at compile time.

```rs
let mut s = String::from("hello");
s.push_str(", world!"); // push_str() appends a literal to a String
```

#### Memory and Allocation

For integers and other simple types that have a fixed size, their values are stored entirely on the stack. So when the variables are re-assigned, the new variable gets a copy of the value instead of a reference to the heap in the stack.

For complex types like `String` (`String::from("Hello")`), a pointer is stored in stack that points to a location in heap. So when the variable is re-assigned (`let s2 = s1`), `s2` creates a new pointer in stack with the same pointer address, length and capacity as `s1` pointing to the same location in heap.

To prevent double pointers in complex types, when we do trivial `let s2 = s1`, `s1` is invalidated (pointer is removed from stack) and is `moved` to `s2`. `s1` becomes unusable at this point. This is shallow copy. See [06_ownership.rs](../practice/06_ownership.rs) for example.

For deep copy of complex types, `let s2 = s1.clone()` can be used to create a new variable with a new pointer in stack and a new space in heap copying the data of `s1`. With this, the `move` doesn't happen and both `s1` and `s2` are usable.

##### Stack and Heap

From my understanding, think of stack as a first layer in memory that either stores the value or a pointer to the value. Heap is the second layer of memory that stores larger data. If a variable is of fixed size (like i32), then the value is directly stored in the stack. If the variable is of variable size (like String), then a pointer is stored in the stack that points to a location in heap that contains the data.

A pointer includes the following information.

| name     | value                                  |
| -------- | -------------------------------------- |
| ptr      | address_in_heap                        |
| len      | 4 (length of data currently stored)    |
| capacity | 5 (total capacity allocated in memory) |

In the following image, the pointer data is stored in stack and the right table shows the heap in memory.

![Pointers](./assets/01_pointers.svg)

#### Stack Only Data (Copy)

For data like integers that are only stored in stack and not heap. A `Copy` trait can be placed on types to implement how data should be copied. A type with `Drop` trait cannot have `Copy` trait as such a type requires special memory handling which is not supported for data stored in stack only.

#### References

Creating a reference (e.g. `fn test(s: &String);`) enables us to refer/point to a variable without taking ownership of it.

The action of creating a reference is called _borrowing_. A reference _borrows_ the value of a variable.

Only mutable references can update the value of the variable. Mutable references have a restriction that there can only on 1 mutable reference to a value at a time.

```rs
let mut s = String::from("hello");

let r1 = &mut s;
// This will throw a compilation error.
let r2 = &mut s;

println!("{r1}, {r2}");
```

A reference's scope starts from where it is introduced and continues through the last time the reference is used.

```rs
let mut s = String::from("hello");

let r1 = &mut s;
println!("{r1}");

// This will work as r1 is out of scope at this point.
let r2 = &mut s;
println!("{r2}");
```

##### Dangling References

Dangling references are created by a dangling pointer which points to a location in memory that may have been given to someone else. This could be due to that part of memory being freed up but the dangling pointer still pointing to it.

Rust compiler guarantees that there will never be dangling references.

```rs
fn main() {
  let reference_to_nothing = dangle();
}

fn dangle() {
  let s = String::from("hello");
  &s;
} // `s` goes of of scope and is dropped after the function ends unless the `value` itself is returned.
```

#### Ownership in Functions

Functions handle variables/arguments in the following ways.

1. Take ownership of the variable.

   ```rs
   fn test(var: String) {}
   ```

2. Borrow immutably. That is, only be able to read the value and never update it.

   ```rs
   fn test(var: &String) {}
   ```

3. Borrow mutably. That is, to be able to update the value inside the function.

   ```rs
   fn test(var: &mut String) {}
   ```

#### Slice Type

Slices let you reference a contiguous sequence of elements in a collection. A slice is a kind of reference, so it does not have ownership.

### Structs

```rs
struct User {
  username: String,
  email: String,
  active: bool,
};

let user = User {
  username: String::from("test"),
  email: String::from("test@email.com"),
  active: true,
};
```

Rust provides a struct update syntax for reusing fields from an existing struct. But for fields that use complex types and heap like `String`, the ownership of the field is moved to the new struct instance and the old struct becomes unusable unless the fields are redefined by the new struct instance.

```rs
let user1 = User {
  username: String::from("test"),
  email: String::from("test@email.com"),
  active: true,
};

let user2 = User {
  email: String::from("test2@email.com"),
  ..user1,
};

// Since `user1.username` was not redefined, it's ownership was moved to `user2`.
```

#### Derived Traits

When using `println!()` macro, the `{variable}` syntax uses the `Display` trait of a type. Structs don't have an implementation of the `Display` trait by default.

For debugging, we can put the `:?` specifier (`{variable:?}`) to tell Rust to use the `Debug` trait for printing. We have to put the `#[derive(Debug)]` outer attribute to the struct to enable it.

```rs
#[derive(Debug)]
struct User {
  name: String,
};
```

We can also use `:#?` which pretty prints the struct.

We can also use the `dbg!()` macro which returns ownership in case a value is passed to it or we can also pass a reference to avoid giving ownership to the macro.

```rs
let user = User {
  email: dbg!(30 * 10), // This will print the value and return the same value back.
};

// This uses the reference for printing.
dbg!(&user);
```

#### Struct Methods

```rs
impl Rectangle {
  fn area(&self) -> u32 {
    self.width * self.height
  }
}
```

Rust automatically handles dereferencing unlike C++.

```cpp
object.someMethod(); // Rust: object.someMethod();
objectPtr->somMethod(); // Rust: objectPtr.someMethod();
(*objectPtr).somMethod();
```

#### Associated Functions

All functions defined inside `impl` are called _associated functions_ because they are associated with the type being implemented. We can define functions inside `impl` that are not methods and don't have `self` as the first parameter. These functions are for used when the instance of a type is not needed, for example, for creating the instance itself (`String::from()`).

```rs
impl Rectangle {
  // This is an associated function but not a method.
  fn square(size: u32) -> Self {
    Self {
      width: size,
      height: size
    }
  }
}

let square = Rectangle::square(20);
```

#### Multiple `impl` Blocks

It's valid for each struct to have multiple `impl` blocks.

```rs
impl Type {
  fn method1(&self) {}
}

impl Type {
  fn method2(&self) {}
}

let t = Type {};
t.method1();
t.method2();
```

### Enums

Enums in Rust can be simple or hold struct-like values.

```rs
enum Message {
  Quit,
  Move { x: i32, y: i32 },
  Write(String)
  ChangeColor(i32, i32, i32),
}
```

#### Option Enum

Rust does not have `null` but it has an enum that encodes the concept of a value being present or absent.

```rs
enum Option<T> {
    None,
    Some(T),
}
```

This enum is very commonly used and is included in the prelude so we don't need to explicitly import it. `Some` and `None` can also be used without the `Option::` prefix. 

use std::thread;
use std::time::Duration;

fn main1() {
  // Thread will prematurely exit once the main thread finishes unless
  // `handle.join()` is called.
  let handle = thread::spawn(|| {
    for i in 1..10 {
      println!("spawned thread {i}");
      thread::sleep(Duration::from_millis(1));
    }
  });

  // This will block the main thread (this program). It will prevent the main
  // thread to perform work or exit until the thread is finished.
  handle.join().unwrap();

  for i in 1..5 {
    println!("main thread {i}");
    thread::sleep(Duration::from_millis(1));
  }
}

fn main2() {
  let v = vec![1, 2, 3];

  // We need to use `move` because `v` may outlive the main program.
  let handle = thread::spawn(move || {
    println!("spawn thread moved vector {v:?}");
  });

  handle.join().unwrap();

  // println!("main thread vector {:?}", v);
}

// Message Passing with Channels

use std::sync::mpsc;

fn main3() {
  // tx = transmitter , rx = receiver
  let (tx, rx) = mpsc::channel();

  thread::spawn(move || {
    let val = String::from("Hello");
    tx.send(val).unwrap();

    // We cannot use `val` after this because the variable has `moved` to the
    // `send` function and after that the receiving thread takes ownership of
    // the variable. This is because of how ownership transfers in Rust to
    // prevent use of the variable in case it is modified or dropped by the
    // receiving thread.
    // println!("{val}");
  });

  // `rx.recv` blocks the main program and wait until the value is received.
  // There is also `rx.try_recv` which doesn't stop the main program and
  // immediately returns a Result but that requires polling for the result until
  // it's received.
  let received = rx.recv().unwrap();
  println!("Received value: {received}");
}

// Example to make sure messages are actually being passed between threads by
// sending in intervals.
fn main4() {
  let (tx, rx) = mpsc::channel();

  thread::spawn(move || {
    let list = vec![1, 10, 3, 200, 500, 23, 54];

    for item in list {
      tx.send(item).unwrap();
      thread::sleep(Duration::from_secs(1));
    }
  });

  for received in rx {
    println!("Received {received}");
  }
}

// Multiple Producers
fn main() {
  let (tx, rx) = mpsc::channel();
  // We can clone the transmitter to create another producer.
  let tx1 = tx.clone();

  thread::spawn(move || {
    let list = vec![100, 101, 102, 103];

    for item in list {
      tx.send(item).unwrap();
      thread::sleep(Duration::from_secs(1));
    }
  });

  thread::spawn(move || {
    let list = vec![200, 201, 202, 203];

    for item in list {
      tx1.send(item).unwrap();
      thread::sleep(Duration::from_secs(1));
    }
  });

  for received in rx {
    println!("Received {received}");
  }
}

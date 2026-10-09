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

fn main() {
  let v = vec![1, 2, 3];

  // We need to use `move` because `v` may outlive the main program.
  let handle = thread::spawn(move || {
    println!("spawn thread moved vector {v:?}");
  });

  handle.join().unwrap();

  // println!("main thread vector {:?}", v);
}

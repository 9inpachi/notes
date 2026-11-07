use std::{
  sync::{mpsc, Arc, Mutex},
  thread,
};

pub struct ThreadPool {
  workers: Vec<Worker>,
  sender: Option<mpsc::Sender<Job>>,
}

type Job = Box<dyn FnOnce() + Send + 'static>;

impl ThreadPool {
  /// Create a new thread pool.
  ///
  /// The size is the number of threads in the pool.
  ///
  /// # Panics
  ///
  /// The `new` function will panic if the size is 0.
  pub fn new(size: usize) -> ThreadPool {
    assert!(size > 0);

    let (sender, receiver) = mpsc::channel();
    let receiver = Arc::new(Mutex::new(receiver));
    let mut workers = Vec::with_capacity(size);

    for i in 0..size {
      workers.push(Worker::new(i, Arc::clone(&receiver)));
    }

    ThreadPool {
      workers,
      sender: Some(sender),
    }
  }

  pub fn execute<F>(&self, f: F)
  where
    F: FnOnce() + Send + 'static,
  {
    let job = Box::new(f);
    self.sender.as_ref().unwrap().send(job).unwrap();
  }
}

// Graceful shutdown.
impl Drop for ThreadPool {
  fn drop(&mut self) {
    drop(self.sender.take());

    for worker in self.workers.drain(..) {
      println!("Shutting down worker {}", worker.id);

      worker.thread.join().unwrap();
    }
  }
}

struct Worker {
  id: usize,
  thread: thread::JoinHandle<()>,
}

impl Worker {
  fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {
    let thread = thread::spawn(move || loop {
      // The `lock` call acquires the mutex, providing mutually exclusive
      // access. `recv` is a blocking function, so the thread keeps holding the
      // mutex while waiting for a message to arrive.
      //
      // This ensures that only one thread at a time can access the receiver and
      // wait for a job. Other threads attempting to acquire the mutex will
      // block until the current thread receives a job and releases the lock.
      //
      // Once a job is received, the temporary MutexGuard is dropped at the end
      // of the statement, releasing the mutex so another thread can proceed.
      let received_job = receiver.lock().unwrap().recv();

      match received_job {
        Ok(job) => {
          println!("Worker {id} received a job; executing.");
          job();
        }
        Err(_) => {
          println!("Worker {id} disconnected; shutting down.");
          break;
        }
      }
    });

    Worker { id, thread }
  }
}

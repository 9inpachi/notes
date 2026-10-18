use trpl::{Either, Html};
use std::time::Duration;

async fn page_title(url: &str) -> Option<String> {
  let response = trpl::get(url).await;
  let response_text = response.text().await;

  Html::parse(&response_text)
    .select_first("title")
    .map(|tag| tag.inner_html())
}

async fn page_title_2(url: &str) -> (&str, Option<String>) {
  let response = trpl::get(url).await;
  let response_text = response.text().await;

  let title = Html::parse(&response_text)
    .select_first("title")
    .map(|tag| tag.inner_html());

    (url, title)
}

fn main1() {
  let args: Vec<String> = std::env::args().collect();

  trpl::block_on(async {
    let url = &args[1];
    match page_title(url).await {
      Some(title) => println!("The title is {title}"),
      None => println!("No title for URL"),
    }
  });

  // Concurrent futures
  trpl::block_on(async {
    let title_future_1 = page_title_2(&args[1]);
    let title_future_2 = page_title_2(&args[2]);
    
    // `trpl::select` returns the future that resolved first.
    let (url, title) = match trpl::select(title_future_1, title_future_2).await {
        Either::Left(left) => left,
        Either::Right(right) => right,
    };

    println!("URL loaded first: {url}");

    match title {
        Some(valid_title) => println!("The title is: {valid_title}"),
        None => println!("No title found"),
    }
  });
}

fn main2() {
  trpl::block_on(async {
    // Similar to `thread::spawn`. But this doesn't spawn an OS thread.
    let handle = trpl::spawn_task(async {
      for i in 1..10 {
        println!("First task number: {i}");
        trpl::sleep(Duration::from_millis(500)).await;
      }
    });

    // Without spawning a new thread.
    for i in 1..5 {
      println!("First task number: {i}");
      trpl::sleep(Duration::from_millis(500)).await;
    }

    // Wait for the spawned task to finish.
    handle.await.unwrap();
  });
}

fn main3() {
  trpl::block_on(async {
    let fut1 = async {
      for i in 1..10 {
        println!("First task number: {i}");
        trpl::sleep(Duration::from_millis(500)).await;
      }
    };

    let fut2 = async {
      for i in 1..5 {
        println!("First task number: {i}");
        trpl::sleep(Duration::from_millis(500)).await;
      }
    };

    // This is similar to `thread::spawn`'s returned handled
    // (handle.join().unwrap()) but works differently as futures by `trpl::join`
    // are executed "fairly" in the sense that both futures are checked and
    // executed alternatively equally often.
    trpl::join(fut1, fut2).await;
  });
}

fn main() {
  trpl::block_on(async {
    let (tx, mut rx) = trpl::channel();

    // `tx` needs to be dropped for the `while let` for receive to break. We use
    // `move` to move ownership of `tx` to the `async` block. If we don't do
    // that, we get stuck in a loop that the `trpl::block_on` async block never
    // ends because of `rx_fut` never ending because `tx` variable still exists.
    let tx_fut = async move {
      let vals = vec![10, 20, 31, 54, 21];

      for val in vals {
        tx.send(val).unwrap();
        trpl::sleep(Duration::from_millis(500)).await;
      }
    };

    let rx_fut = async {
      while let Some(val) = rx.recv().await {
        println!("Received value {val}");
      }
    };

    trpl::join(tx_fut, rx_fut).await;
    // Program doesn't shut and waits forever for new messages.
  });
}

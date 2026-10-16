use trpl::{Either, Html};

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

fn main() {
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

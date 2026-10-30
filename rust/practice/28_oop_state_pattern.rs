struct Post {
  state: Option<Box<dyn State>>,
  content: String,
}

impl Post {
  fn new() -> Post {
    Post {
      state: Some(Box::new(Draft {})),
      content: String::new(),
    }
  }

  fn add_text(&mut self, text: &str) {
    self.content.push_str(text);
  }

  fn request_review(&mut self) {
    if let Some(s) = self.state.take() {
      // This will return the next state (PendingReview).
      self.state = Some(s.request_review());
    }
  }

  fn approve(&mut self) {
    if let Some(s) = self.state.take() {
      // This will return the next state (Published).
      self.state = Some(s.approve());
    }
  }

  fn content(&self) -> &str {
    self.state.as_ref().unwrap().content(self)
  }
}

trait State {
  fn request_review(self: Box<Self>) -> Box<dyn State>;
  fn approve(self: Box<Self>) -> Box<dyn State>;
  fn content<'a>(&self, post: &'a Post) -> &'a str {
    ""
  }
}

struct Draft {}

impl State for Draft {
  fn request_review(self: Box<Self>) -> Box<dyn State> {
    Box::new(PendingReview {})
  }

  fn approve(self: Box<Self>) -> Box<dyn State> {
    self
  }
}

struct PendingReview {}

impl State for PendingReview {
  fn request_review(self: Box<Self>) -> Box<dyn State> {
    self
  }

  fn approve(self: Box<Self>) -> Box<dyn State> {
    Box::new(Published {})
  }
}

struct Published {}

impl State for Published {
  fn request_review(self: Box<Self>) -> Box<dyn State> {
    self
  }

  fn approve(self: Box<Self>) -> Box<dyn State> {
    self
  }

  fn content<'a>(&self, post: &'a Post) -> &'a str {
    &post.content
  }
}

fn main() {
  let mut post = Post::new();

  post.add_text("Hello world");
  assert_eq!("", post.content());

  post.request_review();
  post.approve();
  assert_eq!("Hello world", post.content());
}

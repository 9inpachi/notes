use std::{
  fs,
  io::{prelude::*, BufReader},
  net::{TcpListener, TcpStream},
};

fn main() {
  let listener = TcpListener::bind("127.0.0.1:7878").unwrap();

  for stream in listener.incoming() {
    let stream = stream.unwrap();

    handle_stream_selective(stream);
  }
}

fn handle_stream(mut stream: TcpStream) {
  let buf_reader = BufReader::new(&stream);

  // This is how the request format looks line separate by lines.
  // ```
  // Method Request-URI HTTP-Version CRLF
  // headers CRLF
  // message-body
  // ```
  let http_request: Vec<_> = buf_reader
    .lines()
    .map(|result| result.unwrap())
    .take_while(|line| !line.is_empty())
    .collect();

  println!("Received request: {http_request:#?}");

  // This is how the response format should look.
  // ```
  // HTTP-Version Status-Code Reason-Phrase CRLF
  // headers CRLF
  // message-body
  // ```
  // Tip: Try this in curl (curl -i http://127.0.0.1:7878)
  let response_status = "HTTP/1.1 200 OK";
  let content = fs::read_to_string("hello.html").unwrap();
  let content_len = content.len();

  let response = format!("{response_status}\r\nnContent-Length: {content_len}\r\n\r\n{content}");

  stream.write_all(response.as_bytes()).unwrap();
}

fn handle_stream_selective(mut stream: TcpStream) {
  let buf_reader = BufReader::new(&stream);
  let request_line = buf_reader.lines().next().unwrap().unwrap();

  let (response_status, response_file) = if request_line == "GET / HTTP/1.1" {
    ("HTTP/1.1 200 OK", "hello.html")
  } else {
    ("HTTP/1.1 404 NOT FOUND", "404.html")
  };

  let content = fs::read_to_string(response_file).unwrap();
  let content_len = content.len();

  let response = format!("{response_status}\r\nnContent-Length: {content_len}\r\n\r\n{content}");

  stream.write_all(response.as_bytes()).unwrap();
}

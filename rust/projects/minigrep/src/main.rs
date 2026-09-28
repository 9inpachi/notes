use minigrep::{search, search_case_insensitive};
use std::env;
use std::error::Error;
use std::fs;
use std::process;

fn main() {
  let args: Vec<String> = env::args().collect();

  let config = Config::build(&args).unwrap_or_else(|err| {
    // `eprintln` prints to standard error (stderr).
    eprintln!("Could not parse arguments: {err}");
    process::exit(1);
  });

  println!(
    "Searching file {} for text {}",
    config.file_path, config.search_text
  );

  if let Err(e) = run(config) {
    eprintln!("Error while searching");
    process::exit(1);
  }
}

fn run(config: Config) -> Result<(), Box<dyn Error>> {
  let contents = fs::read_to_string(config.file_path)?;

  let results = if config.ignore_case {
    search_case_insensitive(&config.search_text, &contents)
  } else {
    search(&config.search_text, &contents)
  };

  for line in results {
    println!("{line}");
  }

  Ok(())
}

struct Config {
  search_text: String,
  file_path: String,
  ignore_case: bool,
}

impl Config {
  fn build(args: &[String]) -> Result<Config, &'static str> {
    if args.len() < 3 {
      return Err("Two arguments [query] [file_path] required");
    }

    let search_text = args[1].clone();
    let file_path = args[2].clone();

    let ignore_case = env::var("IGNORE_CASE").is_ok();

    Ok(Config {
      file_path,
      search_text,
      ignore_case,
    })
  }
}

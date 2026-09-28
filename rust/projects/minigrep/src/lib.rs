// We define an explicit lifetime `'a` for `contents` because the result
// references are linked to the content since the result comes from the content.
// So the result references need to be valid as long as the contents are valid.
pub fn search<'a>(search_text: &str, contents: &'a str) -> Vec<&'a str> {
  let mut result = Vec::new();

  for line in contents.lines() {
    if line.contains(search_text) {
      result.push(line);
    }
  }

  result
}

pub fn search_case_insensitive<'a>(search_text: &str, contents: &'a str) -> Vec<&'a str> {
  let search_text = search_text.to_lowercase();
  let mut result = Vec::new();

  for line in contents.lines() {
    if line.to_lowercase().contains(&search_text) {
      result.push(line);
    }
  }

  result
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn test_case_sensitive() {
    let search_text = "duct";
    let contents = "\
Rust:
safe, fast, productive.
Pick three.";

    assert_eq!(
      vec!["safe, fast, productive."],
      search(search_text, contents)
    );
  }

  #[test]
  fn test_case_insensitive() {
    let search_text = "rUst";
    let contents = "\
Rust:
safe, fast, productive.
Pick three.
Trust me.";

    assert_eq!(
      vec!["Rust:", "Trust me."],
      search_case_insensitive(search_text, contents)
    );
  }
}

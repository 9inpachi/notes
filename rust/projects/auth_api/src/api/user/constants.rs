pub const USERNAME_RE: &str = r"^[a-zA-Z0-9_]{3,20}$";
pub const FULL_NAME_RE: &str = r"^[\p{L}]+(?:[ '-][\p{L}]+)*$";
pub const PASSWORD_RE: &str = r"^[A-Za-z0-9!@#$%^&*()_+\-=.,?]{8,}$";

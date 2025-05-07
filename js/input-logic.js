// Shared logic: Validate email
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Shared logic: Validate password
function validatePassword(password) {
  return password.length >= 8;
}

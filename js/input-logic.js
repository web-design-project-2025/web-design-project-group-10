// Shared logic: Validate email
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Shared logic: Validate password
function validatePassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return {
    isValid:
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar,
    errors: [
      password.length < minLength
        ? "Password must be at least 8 characters long."
        : "",
      !hasUpperCase
        ? "Password must include at least one uppercase letter."
        : "",
      !hasLowerCase
        ? "Password must include at least one lowercase letter."
        : "",
      !hasNumber ? "Password must include at least one number." : "",
      !hasSpecialChar
        ? "Password must include at least one spacial character."
        : "",
    ].filter((error) => error),
  };
}

// Shared: Display message
function showMessage(form, message, isError = true) {
  const existing = form.querySelector(".message");
  if (existing) existing.remove();
}

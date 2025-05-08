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
  const div = document.createElement("div");
  div.className = "message";
  div.style.color = isError ? "red" : "green";
  div.style.marginTop = "10px";
  div.textContent = message;
  form.appendChild(div);
}

// Shared: Display logged-in message
function showSignedInMessage(container, firstName) {
  const existing = container.querySelector(".signed-in-message");
  if (existing) existing.remove();
  const div = document.createElement("div");
  div.className = "signed-in-message";
  div.style.color = "green";
  div.style.marginTop = "10px";
  div.textContent = "Welcome back, ${firstName}! You are already signed in.";
  container.insterBefore(div, container.querySelector("form"));
}

//Sign-up page
if (document.getElementById("signup-form")) {
  const form = document.getElementById("signup-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const firstName = document.getElementById("name").value.trim();
    const lastName = document.getElementById("surname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeat-password").value;

    let errors = [];
    if (!validateEmail(email)) {
      errors.push("Please enter a valid email adress");
    }
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      errors.push(...passwordValidation.errors);
    }
    if (password !== repeatPassword) {
      errors.push("Passwords do not match.");
    }

    if (errors.length > 0) {
      showMessage(form, errors.join(" "), true);
      return;
    }

    const userData = { firstName, lastName, email, password, isSignedIn: true };
    localStorage.setItem("user", JSON.stringify(userData));
    showMessage(form, "Sign-up successful! You are signed in.", false);
    form.reset();
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user.isSignedIn) {
    showSignedInMessage(form.parentElement, user.firstName);
  }
}

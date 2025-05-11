document.addEventListener("DOMContentLoaded", () => {
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
          ? "Password must include at least one special character."
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
    if (!firstName) return;
    const existing = container.querySelector(".signed-in-message");
    if (existing) existing.remove();
    const div = document.createElement("div");
    div.className = "signed-in-message";
    div.style.color = "green";
    div.style.marginTop = "10px";
    div.textContent = `Welcome back, ${firstName}! You are already signed in.`;
    container.insertBefore(div, container.querySelector("form"));
  }

  //Sign-up page
  if (document.getElementById("signup-form")) {
    console.log("Sign-up form detected");
    const form = document.getElementById("signup-form");
    form.addEventListener("submit", (e) => {
      console.log("Sign-up form submitted");
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
        console.log("Sign-up errors:", errors);
        showMessage(form, errors.join(" "), true);
        return;
      }

      const userData = {
        firstName,
        lastName,
        email,
        password,
        isSignedIn: true,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      showMessage(form, "Sign-up successful! You are signed in.", false);
      form.reset();
      if (typeof updateHeader === "function") {
        updateHeader();
        console.log("Header updated after signup");
      } else {
        console.error("updateHeader not found");
      }
      setTimeout(() => {
        // location.href was retrieved from https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
        window.location.href = "profile.html";
        //End of citation
      }, 100);
    });

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.isSignedIn) {
      showSignedInMessage(form.parentElement, user.firstName);
    }
  }

  //Login page
  if (document.getElementById("login-form")) {
    console.log("Login form detected");
    const form = document.getElementById("login-form");
    form.addEventListener("submit", (e) => {
      console.log("Login form submitted");
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      let errors = [];
      if (!validateEmail(email)) {
        errors.push("Please enter a valid email adress");
      }
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user.email !== email || user.password !== password) {
        errors.push("Invalid email or password.");
      }

      if (errors.length > 0) {
        console.log("Login errors:", errors);
        showMessage(form, errors.join(" "), true);
        return;
      }

      user.isSignedIn = true;
      localStorage.setItem("user", JSON.stringify(user));
      showMessage(form, "Login successful! Welcome back!", false);
      form.reset();
      if (typeof updateHeader === "function") {
        updateHeader();
        console.log("Header updated after login");
      } else {
        console.error("updateHeader not found");
      }
      setTimeout(() => {
        // location.href was retrieved from https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
        window.location.href = "index.html";
        //End of citation
      }, 100);
    });

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.isSignedIn) {
      showSignedInMessage(form.parentElement, user.firstName);
    }
  }

  //Contact page
  if (document.getElementById("contact-form")) {
    console.log("Contact form detected");
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", (e) => {
      console.log("Contact form submitted!");
      e.preventDefault();
      const firstName = document.getElementById("name").value.trim();
      const lastName = document.getElementById("surname").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      let errors = [];
      if (!firstName) {
        errors.push("Please enter your first name.");
      }
      if (!lastName) {
        errors.push("Please enter your last name.");
      }
      if (!validateEmail(email)) {
        errors.push("Please enter a valid email address.");
      }
      if (!message) {
        errors.push("Please enter your message.");
      }

      if (errors.length > 0) {
        console.log("Contact errors:", errors);
        showMessage(form, errors.join(" "), true);
        return;
      }

      const submissions = JSON.parse(
        localStorage.getItem("contactSubmissions") || "[]"
      );
      submissions.push({ firstName, lastName, email, message });
      localStorage.setItem("contactSubmissions", JSON.stringify(submissions));
      showMessage(form, "Message sent successfully! Thank you!", false);
      form.reset();
    });
  }
});

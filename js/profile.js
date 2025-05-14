document.addEventListener("DOMContentLoaded", function () {
  // Update the user name
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = document.getElementById("user-name");
  if (user.firstName && user.lastName) {
    userName.textContent = `Hello, ${user.firstName} ${user.lastName}`;
  }

  //Logout
  const signOutBtn = document.getElementById("sign-out-btn");
  signOutBtn.addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    user.isSignedIn = false;
    localStorage.setItem("user", JSON.stringify(user));
    updateHeader(); //comes from components.js
    window.location.href = "index.html";
  });

  //PROFILE INFO

  const name = document.getElementById("name");
  const surname = document.getElementById("surname");
  const email = document.getElementById("email");
  if (user.firstName) {
    name.textContent = `Name: ${user.firstName}`;
  }
  if (user.lastName) {
    surname.textContent = `Surname: ${user.lastName}`;
  }
  if (user.firstName) {
    email.textContent = `E-mail: ${user.email}`;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Update the user name
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = document.getElementById("user-name");
  if (user.firstName && user.lastName) {
    userName.textContent = `Hello, ${user.firstName} ${user.lastName}`;
  }

  //Logout
  const signOutBtn = document.getElementById("sign-out-btn");
  signOutBtn.addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    user.isSignedIn = false;
    localStorage.setItem("user", JSON.stringify(user));
    updateHeader(); //comes from components.js
    window.location.href = "index.html";
  });
});

// API PROFILE PIC

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const avatarUrl = `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${user.firstName}`;
  document.getElementById("avatar").src = avatarUrl;
});

// PROFILE NAVIGATION

const profileElement = document.getElementById("profile-section");
const favoritesElement = document.getElementById("favorites-section");
const buttonElementProfile = document.getElementById("profile-button");
const buttonElementFavorites = document.getElementById("favorites-button");

buttonElementProfile.addEventListener("click", function (event) {
  event.preventDefault();
  favoritesElement.style.display = "none";
  profileElement.style.display = "block";
});

buttonElementFavorites.addEventListener("click", function (event) {
  event.preventDefault();
  profileElement.style.display = "none";
  favoritesElement.style.display = "block";
});

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

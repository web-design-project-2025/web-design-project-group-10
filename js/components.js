function loadComponent(path, placeholderId) {
  fetch(path)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById(placeholderId).innerHTML = data;
      if (placeholderId === "header-place") {
        initializeHamburgerMenu();
        updateHeader();
      }
    });
}
//hamburger menu moved here to initialize
function initializeHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu-container");

  if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
      menu.classList.toggle("show");
    });
  }
}

function updateHeader() {
  const loggedInDiv = document.getElementById("logged-in");
  const loggedOutDiv = document.getElementById("logged-out");
  const user = JSON.parse(localStorage.getElementById("user") || "{}");
  const isLoggedIn = user.isSignedIn;

  if (isLoggedIn) {
    loggedInDiv.style.display = "block";
    loggedOutDiv.style.display = "none";
  } else {
    loggedInDiv.style.display = "none";
    loggedOutDiv.style.display = "block";
  }
}
//loading components
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header.html", "header-place");
  loadComponent("footer.html", "footer-place");
});

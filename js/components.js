function loadComponent(path, placeholderId) {
  fetch(path)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById(placeholderId).innerHTML = data;
      if (placeholderId === "header-place") {
        initializeHamburgerMenu();
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
//loading components
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header.html", "header-place");
  loadComponent("footer.html", "footer-place");
});

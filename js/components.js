function loadComponent(path, placeholderId) {
  fetch(path)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById(placeholderId).innerHTML = data;
    });
}

// Load common components
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header.html", "header-place");
  loadComponent("footer.html", "footer-place");
});

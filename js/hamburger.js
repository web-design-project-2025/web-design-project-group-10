const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu-container");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("show");
});

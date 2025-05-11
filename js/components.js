function loadComponent(path, placeholderId) {
  fetch(path)
    .then((res) => res.text())
    .then((data) => {
      const placeholder = document.getElementById(placeholderId);
      if (placeholder) {
        placeholder.innerHTML = data;
        if (placeholderId === "header-place") {
          setTimeout(() => {
            initializeHamburgerMenu();
            updateHeader();
          }, 50);
        }
      } else {
        console.error(`Placeholder ${placeholderId} not found`);
      }
    })
    .catch((error) => console.error(`Error loading ${path}:`, error));
}

//hamburger menu moved here to initialize
function initializeHamburgerMenu() {
  try {
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".menu-container");
    if (hamburger && menu) {
      hamburger.addEventListener("click", () => {
        menu.classList.toggle("show");
      });
    } else {
      console.error("Hamburger or menu not found");
    }
  } catch (error) {
    console.error("Error in initializeHamburgerMenu:", error);
  }
}

function updateHeader() {
  try {
    const loggedInDiv = document.getElementById("logged-in");
    const loggedOutDiv = document.getElementById("logged-out");
    if (!loggedInDiv || !loggedOutDiv) {
      console.error("Error: logged-in or logged-out div not found");
      return;
    }
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const isLoggedIn = user.isSignedIn === true;

    console.log("updateHeader called, isLoggedIn:", isLoggedIn);
    loggedInDiv.style.display = isLoggedIn ? "block" : "none";
    loggedOutDiv.style.display = isLoggedIn ? "none" : "block";
  } catch (error) {
    console.error("Error is updateHeader:", error);
  }
}

//loading components
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header.html", "header-place");
  loadComponent("footer.html", "footer-place");
  setTimeout(() => {
    updateHeader();
  }, 100);
});

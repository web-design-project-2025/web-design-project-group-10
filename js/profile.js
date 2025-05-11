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

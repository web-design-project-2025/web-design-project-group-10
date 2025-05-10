function addProfileInfo() {
  let user = JSON.parse(localStorage.getItem("user"));
  const container = document.getElementById("profile-welcome");

  container.innerHTML = `<h1>Hello, ${user.firstName} ${user.lastName}</h1>`;
}

document.addEventListener("DOMContentLoaded", function () {
  addProfileInfo();
});

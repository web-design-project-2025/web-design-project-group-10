// this part of code is inspired through chatgpt and guided, check the link for further information
// https://chatgpt.com/share/68236a3d-74e4-8002-b6c0-1d3d3e135161
document.addEventListener("ratingLoaded", () => {
  const ratingContainer = document.querySelector(".recipe-rating");
  const rating = parseFloat(ratingContainer.getAttribute("data-rating")) || 0;
  console.log(`Parsed rating: ${rating}`);

  ratingContainer.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.classList.add("star");
    star.textContent = "★";

    if (rating >= i) {
      star.classList.add("full");
      console.log(`Star ${i}: full`);
    } else if (rating > i - 1 && rating < i) {
      star.classList.add("partial");
      const fillPercentage = (rating - (i - 1)) * 100;
      star.style.setProperty("--fill-width", `${fillPercentage}%`);
      console.log(`Star ${i}: partial, fill: ${fillPercentage}%`);
    } else {
      console.log(`Star ${i}: empty`);
    }

    ratingContainer.appendChild(star);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("json/recipe-card.json")
    .then((res) => res.json())
    .then((recipes) => {
      console.log("Recipes loaded:", recipes);
      const recent = [...recipes].sort((a, b) => b.id - a.id).slice(0, 9);
      const topRated = [...recipes]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 9);

      createCarousel("recent", recent);
      createCarousel("rated", topRated);
    });

  function createCarousel(type, recipeArray) {
    const track = document.getElementById(`${type}-track`);
    const leftBtn = document.getElementById(`${type}-left`);
    const rightBtn = document.getElementById(`${type}-right`);
    let index = 0;

    recipeArray.forEach((recipe) => {
      const card = createRecipeCard(recipe);
      track.appendChild(card);
    });

    const maxIndex = Math.ceil(recipeArray.length / 3) - 1;

    function updateCarousel() {
      const cardWidth = track.querySelector(".recipe-card").offsetWidth + 20;
      track.style.transform = `translateX(-${index * cardWidth * 3}px)`;
    }

    leftBtn.addEventListener("click", () => {
      index = Math.max(index - 1, 0);
      updateCarousel();
    });

    rightBtn.addEventListener("click", () => {
      index = Math.min(index + 1, maxIndex);
      updateCarousel();
    });

    window.addEventListener("resize", updateCarousel);
  }

  function createRecipeCard(recipe) {
    const card = document.createElement("div");
    card.classList.add("recipe-card");

    card.innerHTML = `
    <div class="recipe-image-wrapper">
      <div class="big-image">
        <img src="${recipe.image}" alt="${recipe.title}">
      </div>
      <div class="icon-star">
        <img src="img/star-full.png" alt="Star">
        <span>${recipe.rating}</span>
      </div>
      <div class="icon-heart">
        <img src="img/heart-icon.png" class="heart-icon" id="${recipe.id}" alt="Heart">
      </div>
    </div>
    <div class="recipe-content">
      <h3 class="recipe-title">${recipe.title}</h3>
      <div class="recipe-details">
        <img src="img/leaf.png" alt="Leaf" class="leaf-icon">
        <div class="recipe-time">
          <svg xmlns="http://www.w3.org/2000/svg" class="clock" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="CurrentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>${recipe.prepTime}</span>
        </div>
      </div>
      <button class="see-more-button" onclick="location.href='recipe-detail.html?id=${recipe.id}'">See more</button>
    </div>
  `;
    const heartIcon = card.querySelector(".heart-icon");
    heartIcon.addEventListener("click", function () {
      handleHeartClick(heartIcon, recipe.id);
    });
    return card;
  }
  function handleHeartClick(heartIcon, recipeId) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.includes(recipeId)) {
      // REMOVE from favorites
      favorites = favorites.filter((id) => id !== recipeId);
      heartIcon.src = "img/heart-icon.png";
    } else {
      // ADD to favorites
      favorites.push(recipeId);
      heartIcon.src = "img/heart-full.png";
    }

    // Save updated favorites to localStorage
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const recipeContainer = document.getElementById("recipes-list");
  const categoryButtons = document.querySelectorAll(".category");
  const loadMoreBtn = document.querySelector(".more-recipes");

  let currentIndex = 0;
  const recipesPerLoad = 8;
  let allRecipes = [];
  let currentRecipes = [];

  fetch("json/recipe-card.json")
    .then((response) => response.json())
    .then((data) => {
      allRecipes = data;
      currentRecipes = [...allRecipes];
      displayRecipes(currentRecipes);
    });

  function displayRecipes(array, reset = false) {
    if (reset) {
      recipeContainer.innerHTML = "";
      currentIndex = 0;
    }

    const nextIndex = currentIndex + recipesPerLoad;
    const slice = array.slice(currentIndex, nextIndex);

    slice.forEach((recipe) => {
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
              <img src="img/heart-outline.png" class="heart-icon" id="${recipe.id}" alt="Heart">
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
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (favorites.includes(recipe.id)) {
        heartIcon.src = "img/heart-full.png";
      }

      heartIcon.addEventListener("click", function () {
        handleHeartClick(heartIcon, recipe.id);
      });

      recipeContainer.appendChild(card);
    });

    currentIndex = nextIndex;
  }

  function handleHeartClick(heartIcon, recipeId) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.includes(recipeId)) {
      favorites = favorites.filter((id) => id !== recipeId);
      heartIcon.src = "img/heart-outline.png";
    } else {
      favorites.push(recipeId);
      heartIcon.src = "img/heart-full.png";
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  displayRecipes(currentRecipes);

  loadMoreBtn.addEventListener("click", () => {
    displayRecipes(currentRecipes);
  });

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.getAttribute("data-category");
      currentRecipes = allRecipes.filter((recipe) => {
        if (Array.isArray(recipe.category)) {
          return recipe.category.includes(selectedCategory);
        }
        return recipe.category === selectedCategory;
      });
      displayRecipes(currentRecipes, true);
    });
  });
});

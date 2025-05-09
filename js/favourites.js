document.addEventListener("DOMContentLoaded", () => {
  const favouriteContainer = document.getElementById("favorite-recipes-list");
  const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favoriteIds.length === 0) {
    favouriteContainer.innerHTML =
      "<p>No recipes have been added to your favorites!</p>";
  }

  fetch("json/recipe-card.json")
    .then((res) => res.json())
    .then((recipes) => {
      const favoriteRecipes = recipes.filter((recipe) =>
        favoriteIds.includes(recipe.id)
      );

      favoriteRecipes.forEach((recipe) => {
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
              <img src="img/heart-full.png" class="heart-icon" id="${recipe.id}" alt="Heart">
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

        favouriteContainer.appendChild(card);
      });
    });
});

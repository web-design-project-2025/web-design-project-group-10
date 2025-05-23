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

        // This code was modified with the help of ChatGPT 4o to fix issues where
        // the screen reloads when removing a favorite recipe
        // https://chatgpt.com/share/6825e60c-7c98-800e-b17a-b42763d6c88e

        card.setAttribute("data-id", recipe.id); // Set data-id for easier removal

        // End of citation

        card.innerHTML = `
          <div class="recipe-image-wrapper">
            <a href="recipe-detail.html?id=${recipe.id}" class="big-image">
             <img src="${recipe.image}" alt="${recipe.title}">
           </a>
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
                <svg xmlns="http://www.w3.org/2000/svg" class="clock" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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

        const heartIcon = card.querySelector(".heart-icon");
        heartIcon.addEventListener("click", function () {
          handleHeartClick(heartIcon, recipe.id);
        });
      });
    });

  function handleHeartClick(heartIcon, recipeId) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.includes(recipeId)) {
      // REMOVE from favorites
      favorites = favorites.filter((id) => id !== recipeId);
      heartIcon.src = "img/heart-icon.png";

      // This code was modified with the help of ChatGPT 4o to fix issues where
      // the screen reloads when removing a favorite recipe
      // https://chatgpt.com/share/6825e60c-7c98-800e-b17a-b42763d6c88e

      // Remove the recipe card from the DOM
      const cardToRemove = document.querySelector(
        `.recipe-card[data-id="${recipeId}"]`
      );
      if (cardToRemove) {
        cardToRemove.remove();
      }

      // If there are no favorites left, display the empty message
      if (favorites.length === 0) {
        favouriteContainer.innerHTML =
          "<p>No recipes have been added to your favorites!</p>";
      }
      // End of citation
    } else {
      // ADD to favorites
      favorites.push(recipeId);
      heartIcon.src = "img/heart-full.png";
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
});

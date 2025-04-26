document.addEventListener("DOMContentLoaded", () => {
  const recipeContainer = document.getElementById("recipes-list");
  const categoryButtons = document.querySelectorAll(".category");

  function displayRecipes(recipeArray) {
    recipeContainer.innerHTML = ""; // delete previous recipes
    recipeArray.forEach((recipe) => {
      const card = document.createElement("div");
      card.classList.add("recipe-card");

      card.innerHTML = `
          <div class="recipe-card">
        <div class="recipe-image-wrapper">
          <img src="${recipe.image}" alt="${recipe.title}">
          <div class="icon-star">
            <img src="images/star-icon.png" alt="Star">
            <span>${recipe.rating}</span>
          </div>
          <div class="icon-heart">
            <img src="images/heart-icon.png" alt="Heart">
          </div>
        </div>
        <div class="recipe-content">
          <h3 class="recipe-title">${recipe.title}</h3>
          <div class="recipe-details">
            <img src="images/leaf-icon.png" alt="Leaf" class="leaf-icon">
            <div class="recipe-time">
              <img src="images/clock-icon.png" alt="Clock" class="clock-icon">
              <span>${recipe.prepTime}</span>
            </div>
          </div>
          <button class="see-more-button">See more</button>
        </div>
      </div>
        `;
      recipeContainer.appendChild(card);
    });
  }

  // makes it show all the recipes from the start
  displayRecipes(recipes);

  // i added an event listener here, to check each category, logic for filtering
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.getAttribute("data-category");
      const filteredRecipes = recipes.filter(
        (recipe) => recipe.category === selectedCategory
      );
      displayRecipes(filteredRecipes);
    });
  });
});

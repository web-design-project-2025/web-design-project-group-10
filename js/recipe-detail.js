document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const recipeId = params.get("id");

  // Fetch the recipes JSON
  fetch("json/recipe-card.json")
    .then((response) => response.json())
    .then((recipes) => {
      const recipe = recipes.find((r) => r.id === recipeId) || recipes[0]; // Fallback to the first recipe if not found

      document.querySelector(".recipe-title").textContent = recipe.title;
      document.querySelector(".recipe-category").textContent = recipe.category;
      document.querySelector(".recipe-time").textContent = recipe.prepTime;
      document.querySelector(".recipe-rating").textContent = recipe.rating;
      document.querySelector(
        ".hero-image"
      ).style.backgroundImage = `url(${recipe["hero-img"]})`;

      // Ingredients
      const ingredientsList = document.querySelector(".ingredients-list");
      ingredientsList.innerHTML = ""; // Clear any previous content
      recipe.ingredients.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `<label><input type="checkbox" /><span></span> ${item}</label>`;
        ingredientsList.appendChild(li);
      });

      // Steps
      const stepsList = document.querySelector(".steps-list");
      stepsList.innerHTML = "";
      recipe.steps.forEach((step) => {
        const li = document.createElement("li");
        li.innerHTML = step;
        stepsList.appendChild(li);
      });

      // Nutrition Info
      const nutritionContent = document.getElementById("nutrition-content");
      recipe.nutrition.forEach((item) => {
        const p = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = `${item.name}: `;
        p.appendChild(strong);
        p.append(item.value);
        nutritionContent.appendChild(p);
      });

      // Toggle Nutrition
      const toggleBtn = document.getElementById("toggle-nutrition");
      toggleBtn.addEventListener("click", () => {
        nutritionContent.classList.toggle("hidden");
        toggleBtn.textContent = nutritionContent.classList.contains("hidden")
          ? "Nutrition Info ▼"
          : "Nutrition Info ▲";
      });
    })
    .catch((error) => {
      console.error("Error loading recipe data:", error);
    });
  const toggleIngredientsBtn = document.getElementById("toggle-ingredients");
  const ingredientsSection = document.querySelector(".ingredients");
  const stepsSection = document.querySelector(".steps");

  function handleToggle() {
    const isIngredientsVisible = ingredientsSection.classList.contains("show");

    if (isIngredientsVisible) {
      ingredientsSection.classList.remove("show");
      stepsSection.classList.remove("hide");
      toggleIngredientsBtn.textContent = "Show Ingredients";
    } else {
      ingredientsSection.classList.add("show");
      stepsSection.classList.add("hide");
      toggleIngredientsBtn.textContent = "Show Steps";
    }
  }

  // Only run toggle logic on small screens
  if (window.innerWidth <= 820 && toggleIngredientsBtn) {
    toggleIngredientsBtn.addEventListener("click", handleToggle);
  }

  function moveIngredientsSection() {
    var ingredients = document.querySelector(".ingredients");
    var leftPanel = document.querySelector(".left-panel");
    var rightPanel = document.querySelector(".right-panel");
    if (window.innerWidth <= 820) {
      if (!rightPanel.contains(ingredients)) {
        // Move it into the right panel
        rightPanel.appendChild(ingredients);
      }
    } else {
      if (!leftPanel.contains(ingredients)) {
        // Move it back into the left panel
        leftPanel.appendChild(ingredients);
      }
    }
  }
  moveIngredientsSection();
  window.addEventListener("resize", moveIngredientsSection);
});

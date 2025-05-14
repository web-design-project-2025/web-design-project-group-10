document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const recipeId = params.get("id");

  // Fetch the recipes JSON
  fetch("json/recipe-card.json")
    .then((response) => response.json())
    .then((recipes) => {
      const recipe = recipes.find((r) => r.id === recipeId); // Fallback to the first recipe if not found

      document.querySelector(".recipe-title").textContent = recipe.title;
      document.querySelector(".recipe-category").textContent = recipe.category;
      document.querySelector(".recipe-time").textContent = recipe.prepTime;
      const rating = recipe.rating || "0";
      document
        .querySelector(".recipe-rating")
        .setAttribute("data-rating", rating);
      console.log(`Setting data-rating: ${rating}`);
      // the next two lines of code are inspired through chatgpt and guided, check the link for further information
      // https://chatgpt.com/share/68236a3d-74e4-8002-b6c0-1d3d3e135161

      const ratingEvent = new Event("ratingLoaded");
      document.dispatchEvent(ratingEvent);

      document.querySelector(
        ".hero-image"
      ).style.backgroundImage = `url(${recipe["hero-img"]})`;

      // Ingredients
      const ingredientsList = document.querySelector(".ingredients-list");
      ingredientsList.innerHTML = "";
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

  if (window.innerWidth <= 820 && toggleIngredientsBtn) {
    toggleIngredientsBtn.addEventListener("click", handleToggle);
  }

  function moveIngredientsSection() {
    const ingredients = document.querySelector(".ingredients");
    const leftPanel = document.querySelector(".left-panel");
    const rightPanel = document.querySelector(".right-panel");
    if (window.innerWidth <= 820) {
      if (!rightPanel.contains(ingredients)) {
        rightPanel.appendChild(ingredients);
      }
    } else {
      if (!leftPanel.contains(ingredients)) {
        leftPanel.appendChild(ingredients);
      }
    }
  }
  moveIngredientsSection();
  window.addEventListener("resize", moveIngredientsSection);
});

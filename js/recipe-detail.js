document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const recipeId = params.get("id");
  const recipe = recipes.find((r) => r.id === recipeId) || recipes[0];

  document.querySelector(".recipe-title").textContent = recipe.title;
  document.querySelector(".recipe-category").textContent = recipe.category;
  document.querySelector(".recipe-time").textContent = recipe.prepTime;
  document.querySelector(".recipe-rating").textContent = recipe.rating;
  document.querySelector(
    ".hero-image"
  ).style.backgroundImage = `url(${recipe.image})`;

  // Ingredients
  const ingredientsList = document.querySelector(".ingredients-list");
  ingredientsList.innerHTML = ""; // Clear any previous content
  recipe.ingredients.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<label><input type="checkbox" /> ${item}</label>`;
    ingredientsList.appendChild(li);
  });

  // Steps
  const stepsList = document.querySelector(".steps-list");
  stepsList.innerHTML = "";
  recipe.steps.forEach((step) => {
    const li = document.createElement("li");
    li.textContent = ` ${step}`;
    stepsList.appendChild(li);
  });

  // Nutrition Info
  const nutritionContent = document.getElementById("nutrition-content");
  recipe.nutrition.forEach((item) => {
    const p = document.createElement("p");
    p.textContent = `${item.name}: ${item.value}`;
    nutritionContent.appendChild(p);
  });

  // Toggle Nutrition
  const toggleBtn = document.getElementById("toggle-nutrition");
  toggleBtn.addEventListener("click", () => {
    nutritionContent.classList.toggle("hidden");
    toggleBtn.textContent = nutritionContent.classList.contains("hidden")
      ? "Show Nutrition Info ▼"
      : "Hide Nutrition Info ▲";
  });
});

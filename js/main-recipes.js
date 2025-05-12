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

    function getCardsPerView() {
      const width = window.innerWidth;
      if (width <= 896) return 1;
      if (width <= 1258) return 2;
      return 3;
    }

    function updateCarousel() {
      const card = track.querySelector(".recipe-card");
      if (!card) return;

      const cardWidth = card.offsetWidth + 20;
      const cardsPerView = getCardsPerView();
      const maxIndex = Math.max(
        0,
        Math.ceil(recipeArray.length / cardsPerView) - 1
      );

      index = Math.min(index, maxIndex);
      track.style.transform = `translateX(-${
        index * cardWidth * cardsPerView
      }px)`;
    }

    leftBtn.addEventListener("click", () => {
      const cardsPerView = getCardsPerView();
      index = Math.max(index - 1, 0);
      updateCarousel();
    });

    rightBtn.addEventListener("click", () => {
      const cardsPerView = getCardsPerView();
      const maxIndex = Math.max(
        0,
        Math.ceil(recipeArray.length / cardsPerView) - 1
      );
      index = Math.min(index + 1, maxIndex);
      updateCarousel();
    });

    window.addEventListener("resize", updateCarousel);
    updateCarousel();
  }

  function createRecipeCard(recipe) {
    const card = document.createElement("div");
    const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];
    const isFavorite = favoriteIds.includes(recipe.id);
    card.classList.add("recipe-card");
    let heartSrc;

    if (isFavorite) {
      heartSrc = "img/heart-full.png";
    } else {
      heartSrc = "img/heart-icon.png";
    }

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
        <img src="${heartSrc}" class="heart-icon" id="${recipe.id}" alt="Heart">
      </div>
    </div>
    <div class="recipe-content">
      <h3 class="recipe-title">${recipe.title}</h3>
      <div class="recipe-details">
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

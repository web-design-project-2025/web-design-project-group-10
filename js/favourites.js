document.addEventListener("DOMContentLoaded", function () {
  const hearts = document.querySelectorAll(".heart-icon");

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  hearts.forEach(function (heart) {
    const recipeId = heart.id;

    if (favorites.includes(recipeId)) {
      heart.src = "img/heart-full.png";
    }

    heart.addEventListener("click", function () {
      if (favorites.includes(recipeId)) {
        //REMOVES
        favorites = favorites.filter((id) => id !== recipeId);
        heart.src = "img/heart-outline.png";
      } else {
        //ADDS
        favorites.push(recipeId);
        heart.src = "img/heart-full.png";
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
    });
  });
});

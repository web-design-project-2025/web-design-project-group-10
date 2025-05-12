// QUICK TIPS

async function loadQuickTips() {
  const response = await fetch("json/quick-tips.json");
  const quickTips = await response.json();

  const shuffled = quickTips.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);

  const leftCard = document.querySelector(".tip-card-left");
  const centerCard = document.querySelector(".tip-card-center");
  const rightCard = document.querySelector(".tip-card-right");

  leftCard.innerHTML = `
  <h1>${selected[0].title}</h1>
  <h3>${selected[0].icon}</h3>
  <p>${selected[0].tip}</h2>
`;

  centerCard.innerHTML = `
  <h1>${selected[1].title}</h1>
  <h3>${selected[1].icon}</h3>
  <p>${selected[1].tip}</h2>
`;

  rightCard.innerHTML = `
  <h1>${selected[2].title}</h1>
  <h3>${selected[2].icon}</h3>
  <p>${selected[2].tip}</h2>
`;
}

loadQuickTips();

// SHUFFLE BUTTON

const shuffleButton = document.querySelector("#shuffle");

shuffleButton?.addEventListener("click", function () {
  console.log("Shuffle clicked!");

  loadQuickTips();
});

// LONG TIPS

let kitchenTips = [];
const kitchenContainer = document.getElementById("kitchen-tips");

async function loadKitchenData() {
  const response = await fetch("json/kitchen-tips.json");
  const data = await response.json();
  kitchenTips = data;

  renderKitchenTips();
}

function createKitchenTipElement(tip) {
  const card = document.createElement("div");
  card.classList.add("kitchen-tip-card");

  card.innerHTML = `
    <img src="${tip.img}" alt="${tip.title}" class="tip-image" />
    <figure>
      <h1>${tip.title}</h1>
      <p>${tip.tip}</p>
      <p class="tip-2" style="display: none;">${tip.tip2}</p>
          <img src="img/icon-arrow-down.svg" alt="arrow down" class="icon-arrow-down" />

    </figure>
  `;

  const arrowDown = card.querySelector(".icon-arrow-down");
  const tip2Element = card.querySelector(".tip-2");

  arrowDown.addEventListener("click", function (event) {
    event.preventDefault();
    const visibleElement = tip2Element.style.display === "block";
    if (visibleElement) {
      tip2Element.style.display = "none";
      arrowDown.style.transform = "rotate(0deg)";
    } else {
      tip2Element.style.display = "block";
      arrowDown.style.transform = "rotate(180deg)";
    }
  });

  return card;
}

function renderKitchenTips() {
  kitchenContainer.innerHTML = "";

  for (let tip of kitchenTips) {
    const card = createKitchenTipElement(tip);
    kitchenContainer.appendChild(card);
  }
}

loadKitchenData();

// async function loadQuickTips() {
//   const response = await fetch("json/quick-tips.json");
//   const quickTips = await response.json();

//   const tipsHeading = quickTips[0].title;
//   const tipsIcon = quickTips[0].icon;
//   const tipsTip = quickTips[0].tip;

//   const headingElement = document.createElement("h1");
//   const iconElement = document.createElement("h1");
//   const tipElement = document.createElement("h2");

//   headingElement.innerText = tipsHeading;
//   iconElement.innerText = tipsIcon;
//   tipElement.innerText = tipsTip;

//   const bodyElement = document.querySelector("#quick-tips-card");
//   bodyElement.appendChild(headingElement);
//   bodyElement.appendChild(iconElement);
//   bodyElement.appendChild
// }

// loadQuickTips();

async function loadQuickTips() {
  const response = await fetch("json/quick-tips.json");
  const quickTips = await response.json();

  const randomTip = quickTips[Math.floor(Math.random() * 9)];

  const card = document.createElement("div");
  card.classList.add("tip-card");

  card.innerHTML = `
  <h1>${randomTip.title}</h1>
  <h3>${randomTip.icon}</h3>
  <h2>${randomTip.tip}</h2>
`;

  const cardContainer = document.querySelector("#quick-tips-card");

  cardContainer.appendChild(card);
}

loadQuickTips();
loadQuickTips();
loadQuickTips();

async function loadKitchenTips() {
  const response = await fetch("json/kitchen-tips.json");
  const kitchenTips = await response.json();

  const tipElement = kitchenTips[0];

  const card = document.createElement("div");
  card.classList.add("kitchen-tip-card");

  card.innerHTML = `
    <img src="${tipElement.img}" alt="${tipElement.title}" class="tip-image" />
      <figure>
        <h1>${tipElement.title}</h1>
        <h2>${tipElement.tip}</h2>
      </figure>
  `;

  const cardContainer = document.querySelector("#kitchen-tips");

  cardContainer.appendChild(card);
}

loadKitchenTips();

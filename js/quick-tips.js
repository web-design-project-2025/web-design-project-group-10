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

  const randomTip = quickTips[Math.floor(Math.random() * 3)];

  const card = document.createElement("div");
  card.classList.add("tip-card");

  card.innerHTML = `
  <h1>${randomTip.title}</h1>
  <h1>${randomTip.icon}</h1>
  <h2>${randomTip.tip}</h2>
`;

  const cardContainer = document.querySelector("#quick-tips-card");

  cardContainer.appendChild(card);
}

loadQuickTips();
loadQuickTips();
loadQuickTips();

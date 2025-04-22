async function loadQuickTips() {
  const response = await fetch("json/quick-tips.json");
  const quickTips = await response.json();

  const tipsHeading = quickTips[0].title;
  const tipsIcon = quickTips[0].icon;
  const tipsTip = quickTips[0].tip;

  const headingElement = document.createElement("h1");
  const iconElement = document.createElement("h1");
  const tipElement = document.createElement("h2");

  headingElement.innerText = tipsHeading;
  iconElement.innerText = tipsIcon;
  tipElement.innerText = tipsTip;

  const bodyElement = document.querySelector("#quick-tips-card");
  bodyElement.appendChild(headingElement);
  bodyElement.appendChild(iconElement);
  bodyElement.appendChild(tipElement);
}

loadQuickTips();

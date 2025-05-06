function createMatchaElement(data) {
  const card = document.createElement("div");
  card.classList.add("matcha-card");

  card.innerHTML = `
    <img src="${data.thumbnail?.source}" alt="${data.title}" class="tip-image" />
    <figure>
      <h1>${data.title}</h1>
      <h2>${data.description}</h2>
      <h2>${data.extract}<a
              href="${data.content_urls?.desktop?.page}"
              target="_blank"
              >here.</a
            ></h2>
    </figure>
  `;
  return card;
}

function renderMatcha() {
  matchaContainer.innerHTML = "";

  const card = createMatchaElement(matchaData);
  matchaContainer.appendChild(card);
}

loadMatcha();

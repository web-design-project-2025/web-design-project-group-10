async function loadData() {
  const response = await fetch(
    "https://en.wikipedia.org/api/rest_v1/page/summary/Matcha"
  );
  const json = await response.json();

  const wikipediaUrl = json.title;

  const headingElement = document.createElement("h1");
  headingElement.innerHTML = wikipediaUrl;

  const bodyElement = document.querySelector("body");
  bodyElement.appendChild(headingElement);
}

loadData().catch((error) => {
  console.log(error);
});

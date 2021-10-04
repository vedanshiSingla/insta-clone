const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const rootImages = document.getElementById("images");
const main = document.querySelector("main");
let observer = new IntersectionObserver(onIntersect);

const API_URL = "https://api.unsplash.com";
const CLIENT_ID = "GGp6q0mzOXt65eseWyhMPjo6oEwKupLCyy66AX0h1TE";

let currentPage = 0;

searchButton.addEventListener("click", addImages);

function onIntersect(entries) {
  if (entries[0].isIntersecting) {
    addImages();
  }
}

async function addImages() {
  if (searchInput.value) {
    const images = await fetchImages(searchInput.value);

    if (document.getElementById("loading")) {
      document.getElementById("loading").remove();
    }

    renderImages(images);

    const loadingElement = document.createElement("div");
    loadingElement.textContent = "loading...";
    loadingElement.setAttribute("id", "loading");
    main.appendChild(loadingElement);
    observer.observe(loadingElement);

    currentPage += 1;
  }
}

async function fetchImages(query) {
  // https://api.unsplash.com/search/photos?query=cat&client_id=GGp6q0mzOXt65eseWyhMPjo6oEwKupLCyy66AX0h1TE
  const SERCH_URL = `${API_URL}/search/photos?query=${query}&client_id=${CLIENT_ID}&page=${currentPage}`;
  try {
    const imageResponse = await fetch(SERCH_URL);
    const images = await imageResponse.json();
    return images.results;
  } catch (e) {
    console.log(e);
  }
}

function renderImages(images) {
  images.forEach((value, index) => {
    const divElement = document.createElement("div");
    divElement.className = "card";

    const imgElement = document.createElement("img");
    imgElement.setAttribute("src", value.urls.small);
    imgElement.setAttribute("alt", value.alt_description);

    divElement.appendChild(imgElement);
    rootImages.appendChild(divElement);
  });
}

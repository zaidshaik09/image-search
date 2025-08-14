const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const formEl = document.getElementById("search-form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = searchInputEl.value.trim();
  if (!inputData) return;

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${encodeURIComponent(inputData)}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (page === 1) {
    searchResultsEl.innerHTML = "";
  }

  const results = data.results;

  results.forEach((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description || "Unsplash Image";

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description || "View Image";

    // Create download button
    const downloadBtn = document.createElement("a");
    downloadBtn.href = result.urls.full; // Highest quality image
    downloadBtn.download = ""; // Suggests download to browser
    downloadBtn.textContent = "Download";
    downloadBtn.classList.add("download-button");
    downloadBtn.setAttribute("rel", "noopener noreferrer");

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    imageWrapper.appendChild(downloadBtn);
    searchResultsEl.appendChild(imageWrapper);
  });

  page++;

  showMoreButtonEl.style.display = page <= data.total_pages ? "block" : "none";
}


formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreButtonEl.addEventListener("click", () => {
  searchImages();
});

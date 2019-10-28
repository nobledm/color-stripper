const colorThief = new ColorThief();
const img = document.querySelector(".linked-img");
const palette = document.querySelector(".palette");

let error = document.querySelector(".error");
let numSwatches = 4;

// watch for form submission and change img src attribute if valid
document.querySelector(".img-submit").addEventListener("submit", e => {
  e.preventDefault();
  error.innerHTML = "";
  numSwatches = Number(e.target.elements.numSwatches.value);

  if (e.target.elements.imgUrl.value == "") {
    error.innerHTML = "Please enter a valid link";
  } else {
    img.src = e.target.elements.imgUrl.value;
  }
});

img.addEventListener("error", () => {
  img.src = "./img/placeholder.jpg";
  error.innerHTML =
    "Could not find image. Check there are no typos. If it still doesn't work the origin site may be blocking access.";
});

img.addEventListener("load", () => {
  const colors = colorThief.getPalette(img, numSwatches);

  // clear out any existing swatches
  while (palette.firstChild) {
    palette.removeChild(palette.firstChild);
  }

  colors.reduce((palette, rgb) => {
    const color = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    const swatch = document.createElement("div");

    swatch.style.setProperty("--color", color);
    palette.appendChild(swatch);
    return palette;
  }, palette);
});

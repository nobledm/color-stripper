const colorThief = new ColorThief();
const img = document.querySelector(".linked-img");
const swatches = document.querySelector(".swatches");

let error = document.querySelector(".error");
let numSwatches = 4;

/**
 * Given an array of rgb values, updates the color variables for the sample box
 * @param {Array} colors 
 */
const colorBox = (colors) => {
  const sampleBox = document.querySelector('.sample-box');

  sampleBox.style.setProperty('--sample-bg', colors[0]);
  sampleBox.style.setProperty('--sample-head-bg', colors[1]);
  sampleBox.style.setProperty('--sample-text', colors[2]);
  sampleBox.style.setProperty('--sample-link', colors[3]);
}

/**
 * Converts an RGB color into HEX
 * @param {Number} r - Red color value from 0-255
 * @param {Number} g - Green color value from 0-255
 * @param {Number} b - Blue color value from 0-255
 */
const rgbToHex = (r, g, b) =>
  "#" +
  [r, g, b]
    .map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("");

// Watches for errors on loading the image
img.addEventListener("error", () => {
  img.src = "./img/placeholder.jpg";
  error.innerHTML =
    "Could not find image. Check there are no typos. If it still doesn't work the origin site may be blocking access.";
});

// Watches for new image loads and generates a swatches
img.addEventListener("load", () => {
  const colors = colorThief.getPalette(img, numSwatches);
  const swatchList = [];

  // clear out any existing swatches
  while (swatches.firstChild) {
    swatches.removeChild(swatches.firstChild);
  }

  colors.reduce((swatches, rgb) => {
    const color = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    const swatch = document.createElement("div");

    swatch.style.setProperty("--color", color);
    swatch.setAttribute("hex", `${rgbToHex(rgb[0], rgb[1], rgb[2])}`);
    swatches.appendChild(swatch);

    swatchList.push(color);
    return swatches;
  }, swatches);

  colorBox(swatchList);
});

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

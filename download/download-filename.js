function downloadFilename() {
  document.querySelectorAll("[display-filename]").forEach((el) => {
    el.textContent = extractFilename(el.getAttribute("href"));
  });
}

function extractFilename(url) {
  const path = new URL(url).pathname;
  const lastUnderscoreIndex = path.lastIndexOf("_");
  const filename = path.slice(lastUnderscoreIndex + 1);
  // Opcional: remover a extensão
  // filename = filename.replace(/\.[^/.]+$/, "");
  return decodeURIComponent(filename);
}

document.addEventListener("DOMContentLoaded", downloadFilename);
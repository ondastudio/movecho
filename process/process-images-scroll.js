function processImagesScroll() {
  const imgs = document.querySelectorAll(".img-anim");
  imgs.forEach((img) => {
    const parent = img.parentElement;
    if (img.complete) imageParallax(parent, img);
    else img.onload = () => imageParallax(parent, img);
  });
}

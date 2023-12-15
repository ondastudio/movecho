function jobsImagesScroll() {
  const imgs = document.querySelectorAll(".img-anim");
  imgs.forEach((img) => {
    const parent = img.parentElement;
    if (img.complete) imageParallax(parent, img);
    else img.onload = () => imageParallax(parent, img);
  });

  const history = document.querySelector(".history-link");
  const historyImg = history.querySelector("img");
  history.addEventListener("mouseenter", () => {
    gsap.to(historyImg, {
      scale: 1.15,
      duration: 1.5,
      ease: "power3.out",
    });
  });
  history.addEventListener("mouseleave", () => {
    gsap.to(historyImg, {
      scale: 1.2,
      duration: 1.5,
      ease: "power3.out",
    });
  });
}

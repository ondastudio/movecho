/*function articleGalleryAnimations() {
  // BOTTOM GALLERY //
  const wrapper = document.querySelector(".swiper-wrapper.is-projects");
  const wrapper2 = document.querySelector(".swiper-wrapper.is-projects-2");
  let wrapperWidth = wrapper.getBoundingClientRect().width;

  let x = 0;
  let speed = 1;

  loop();
  function loop() {
    requestAnimationFrame(loop);
    x -= speed;
    if (x <= -wrapperWidth) {
      x = 0;
    }
    wrapper.style.transform = "translateX(" + x + "px)";
    wrapper2.style.transform = "translateX(" + x + "px)";
  }
} */

function articleGalleryAnimations() {
  // BOTTOM GALLERY //
  const wrapper = document.querySelector(".swiper-wrapper.is-projects");
  const wrapper2 = document.querySelector(".swiper-wrapper.is-projects-2");
  let wrapperWidth = wrapper.getBoundingClientRect().width;

  let x = 0;
  let speed = 1;

  loop();
  function loop() {
    requestAnimationFrame(loop);
    x -= speed;
    x = x % wrapperWidth; // Use modulo operation for continuous looping

    wrapper.style.transform = "translateX(" + x + "px)";
    wrapper2.style.transform = "translateX(" + x + "px)";
  }
}

function articleGalleryHovers() {
  const nextArticles = document.querySelectorAll(".project-image-container");

  nextArticles.forEach((article) => {
    const img = article.querySelector(".image");
    img.onload = () => {
      imageParallax(article, img);
    };

    article.parentElement.addEventListener("mouseenter", () => {
      gsap.to(img, {
        scale: 1.15,
        duration: 1.5,
        ease: "power3.out",
      });
    });
    article.parentElement.addEventListener("mouseleave", () => {
      gsap.to(img, {
        scale: 1.2,
        duration: 1.5,
        ease: "power3.out",
      });
    });
  });
}

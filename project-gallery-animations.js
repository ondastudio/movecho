function projectGalleryAnimations() {
  // TOP GALLERY //
  let gap = 20;
  if (window.innerWidth < 992 && window.innerWidth >= 768) gap = 16;
  if (window.innerWidth < 768) gap = 8;

  const wrapperGallery = document.querySelector(".swiper-wrapper.is-gallery");
  const slidesGallery = wrapperGallery.querySelectorAll(
    ".swiper-slide.is-gallery",
  );
  const btnPrev = document.querySelector(".gallery-button.is-prev");
  const btnNext = document.querySelector(".gallery-button.is-next");

  let count = 0;
  let currX = 0;
  btnPrev.addEventListener("click", () => {
    if (count > 0) count--;
    else {
      count = slidesGallery.length - 1;
      currX = -wrapperGallery.getBoundingClientRect().width - gap;
    }
    const size = slidesGallery[count].getBoundingClientRect().width;
    currX += size + gap;
    gsap.to(".swiper-wrapper.is-gallery", {
      x: currX,
      duration: 2,
      ease: "power3.out",
    });
  });
  btnNext.addEventListener("click", () => {
    const size = slidesGallery[count].getBoundingClientRect().width;
    currX -= size + gap;
    if (count < slidesGallery.length - 1) count++;
    else {
      count = 0;
      currX = 0;
    }
    gsap.to(".swiper-wrapper.is-gallery", {
      x: currX,
      duration: 2,
      ease: "power3.out",
    });
  });

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
}

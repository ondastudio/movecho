window.addEventListener("load", () => {
  const prodLinks = document.querySelectorAll(".processo_list-item_prod");
  const prodCont = document.querySelector(
    ".processo-stick_bottom-wrap.is-production",
  );
  const imgs = prodCont.querySelectorAll(".image.is-production");
  const bullets = prodCont.querySelectorAll(".production-bullet");
  const dur = 1;

  prodLinks.forEach((link, i) => {
    link.addEventListener("mouseenter", () => {
      gsap.to(imgs[i], {
        opacity: 1,
        scale: 1.05,
        duration: dur,
        ease: "power3.out",
        onStart: () =>
          gsap.fromTo(
            bullets[i],
            {
              backgroundColor: "rgba(34, 31, 32, 0)",
            },
            {
              backgroundColor: "rgba(34, 31, 32, 100)",
              duration: 0,
            },
          ),
      });
    });
    link.addEventListener("mouseleave", () => {
      gsap.to(imgs[i], {
        opacity: 0,
        scale: 1,
        duration: dur,
        ease: "power3.out",
        onStart: () =>
          gsap.to(bullets[i], {
            backgroundColor: "rgba(34, 31, 32, 0)",
            duration: 0,
          }),
      });
    });
  });
});

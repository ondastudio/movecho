function historyScrollAnimations() {
  if (window.innerWidth >= 992) {
    const mainParent = document.querySelector(".section.is-sticky");
    const parent = document.querySelector(".history-full-container");
    const height = parent.getBoundingClientRect().width;
    const fSection = document.querySelector(".history-first-section");

    let inside = false;
    gsap.to(parent, {
      xPercent: -100,
      x: () => innerWidth,
      ease: "none",
      scrollTrigger: {
        trigger: mainParent,
        start: "top top",
        end: () => height,
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          progress = self.progress;
          if (progress > 0 && progress < 1 && !inside) {
            gsap.to(".navbar", {
              opacity: 0,
              y: "-100%",
              duration: 1.5,
              ease: "power3.out",
            });
            inside = true;
          } else if ((progress === 0 && inside) || (progress === 1 && inside)) {
            gsap.to(".navbar", {
              opacity: 1,
              y: "0%",
              duration: 1.5,
              ease: "power3.out",
            });
            inside = false;
          }
        },
      },
    });

    gsap.registerPlugin(ScrollToPlugin);
    const slideBtn = document.querySelector(".history-slide-btn");
    const firstSection = document.querySelector(".section.is-sticky");
    const sTop = firstSection.getBoundingClientRect().top;
    const sWidth = fSection.getBoundingClientRect().width;

    slideBtn.addEventListener("click", () => {
      setTimeout(() => {
        gsap.to(window, {
          scrollTo: sTop + sWidth,
          duration: 3,
          ease: "power3.inOut",
        });
      }, 10);
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
}

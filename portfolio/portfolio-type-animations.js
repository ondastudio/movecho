// pageload
let isFirstTime = false;
if (
  !document.referrer.includes("portefolio") ||
  String(window.performance.getEntriesByType("navigation")[0].type) === "reload"
)
  isFirstTime = true;
if (isFirstTime) {
  const nav = document.querySelector(".navbar");
  const heading = document.querySelector(".intro-text");

  nav.style.opacity = 0;
  heading.style.opacity = 0;
}

function portfolioTypeAnimations() {
  window.scrollTo(0, 0);

  const bullet = document.querySelector(".project-bullet");
  const filterLink = document.querySelectorAll(".filter-link");
  filterLink.forEach((link) => {
    if (link.classList.contains("w--current")) {
      const label = link.querySelector(".project-label-wrap");
      link.insertBefore(bullet, link.firstChild);
      gsap.to(bullet, {
        delay: 0.1,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        onStart: () =>
          gsap.to(label, {
            marginLeft: "0.63rem",
            duration: 1,
            ease: "power3.out",
          }),
      });
    }
  });

  gsap.fromTo(
    "sup",
    {
      opacity: 0,
    },
    {
      delay: 0.1,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
    },
  );

  if (isFirstTime) {
    createSplitLoad(".intro-text", " .char", "lines, chars", 0);
    document.querySelector(".intro-text").style.opacity = 1;

    gsap.fromTo(
      ".filter-link",
      {
        y: "100%",
      },
      {
        y: "0%",
        delay: 0.25,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.15,
      },
    );

    filterLink.forEach((link) => {
      if (link.classList.contains("w--current")) {
        gsap.fromTo(
          link,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            delay: 0.25,
            duration: 1.5,
            ease: "power3.out",
          },
        );
      } else {
        gsap.fromTo(
          link,
          {
            opacity: 0,
          },
          {
            opacity: 0.6,
            delay: 0.25,
            duration: 1.5,
            ease: "power3.out",
            onComplete: () => (link.style.opacity = null),
          },
        );
      }
    });

    gsap.fromTo(
      ".navbar",
      {
        opacity: 0,
        y: "-100%",
      },
      {
        opacity: 1,
        y: "0%",
        delay: 0.5,
        duration: 1.5,
        ease: "power3.out",
      },
    );
  }
}

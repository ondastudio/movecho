function portfolioFilterTransitions() {
  // CHANGE PAGE ON SCROLL
  const url = window.location.pathname;
  let init = true;
  let once = true;
  const offset = 50;
  let currIndex = 0;
  let prevIndex = 2;
  let nextIndex = 1;
  const dur = 0.5;

  if (url.includes("projectos")) {
    currIndex = 0;
    prevIndex = 2;
    nextIndex = 1;
  } else if (url.includes("produtos")) {
    currIndex = 1;
    prevIndex = 0;
    nextIndex = 2;
  } else if (url.includes("impressao3d")) {
    currIndex = 2;
    prevIndex = 1;
    nextIndex = 0;
  }
  const pages = ["projectos", "produtos", "impressao3d"];
  const col = ["#D5D1CB", "#B9B4AD", "#F1F0EB"];
  const bullet = document.querySelector(".project-bullet");
  const filterLink = document.querySelectorAll(".filter-link");

  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.scrollY >=
        document.body.offsetHeight - offset &&
      once
    ) {
      changePage(currIndex, nextIndex, col[currIndex], col[nextIndex]);
      once = false;
    }
    if (!init)
      if (window.scrollY <= offset && once) {
        changePage(currIndex, prevIndex, col[currIndex], col[prevIndex]);
        once = false;
      }
    if (window.scrollY > offset) init = false;
  });

  // CHANGE PAGE ON CLICK
  filterLink.forEach((link, i) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const goTo = link.getAttribute("href");
      changePage(currIndex, i, col[currIndex], col[i]);

      setTimeout(() => {
        window.location = goTo;
      }, dur * 1000);
    });
  });

  function changePage(currIndex, newIndex, currCol, newCol) {
    gsap.to(".portfolio-list-wrapper", {
      opacity: 0,
      duration: dur,
      ease: "power3.out",
      onComplete: () => (window.location = pages[newIndex]),
      onStart: () => {
        gsap.fromTo(
          "#main-section",
          {
            backgroundColor: currCol,
          },
          {
            backgroundColor: newCol,
            duration: dur,
            ease: "none",
          },
        );
        gsap.fromTo(
          ".nav-bg",
          {
            backgroundColor: currCol,
          },
          {
            backgroundColor: newCol,
            duration: dur,
            ease: "none",
          },
        );
        gsap.fromTo(
          ".nav-drop-list",
          {
            backgroundColor: currCol,
          },
          {
            backgroundColor: newCol,
            duration: dur,
            ease: "none",
          },
        );
        gsap.to("sup", {
          opacity: 0,
          duration: dur,
          ease: "power3.out",
        });
        const label = filterLink[currIndex].querySelector(
          ".project-label-wrap",
        );
        gsap.to(bullet, {
          opacity: 0,
          duration: dur,
          ease: "power3.out",
          onStart: () =>
            gsap.to(label, {
              delay: 0.1,
              marginLeft: "0rem",
              duration: dur - 0.1,
              ease: "power3.out",
            }),
        });
        gsap.to(filterLink[currIndex], {
          opacity: 0.6,
          duration: dur,
          ease: "power3.out",
          onStart: () =>
            gsap.to(filterLink[newIndex], {
              opacity: 1,
              duration: dur,
              ease: "power3.out",
            }),
        });

        if (window.innerWidth < 768) {
          const currRgb = hexToRgb(currCol);
          const newRgb = hexToRgb(newCol);
          const gradEl = document.querySelector(".portfolio-gradient");
          const wrapper = document.querySelector(".filters-wrapper");
          gsap.to(wrapper, {
            backgroundColor: newCol,
            duration: dur,
            ease: "none",
          });
          gsap.fromTo(
            gradEl,
            {
              backgroundImage:
                "linear-gradient(" +
                currCol +
                ", rgba(" +
                currRgb.r +
                ", " +
                currRgb.g +
                ", " +
                currRgb.b +
                ", 0))",
            },
            {
              backgroundImage:
                "linear-gradient(" +
                newCol +
                ", rgba(" +
                newRgb.r +
                ", " +
                newRgb.g +
                ", " +
                newRgb.b +
                ", 0))",
              duration: dur,
              ease: "none",
            },
          );
        }
      },
    });
  }
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

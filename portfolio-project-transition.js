const tWrapper = document.querySelector(
  ".page-transition-wrapper.is-portfolio",
);
tWrapper.style.display = "none";
tWrapper.style.opacity = 0;

function portfolioProjectTransition() {
  const projectLinks = document.querySelectorAll(".portfolio-proj_wrapper");
  const projectBanners = document.querySelectorAll("[data-project-target]");

  projectLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const goTo = link.getAttribute("href");
      const projectName = link.getAttribute("data-project-trigger");
      let pDate, pInfo, pName;

      projectBanners.forEach((projectBanner) => {
        projectBanner.style.display = "none";
        if (projectBanner.getAttribute("data-project-target") === projectName) {
          projectBanner.style.display = "block";
          pDate = projectBanner.querySelector(".transition-date");
          pInfo = projectBanner.querySelector(".transition-info");
          pName = projectBanner.querySelector(".transition_project-name");
        }
      });
      const dur = 2;
      gsap.to(tWrapper, {
        display: "flex",
        duration: 0,
        onComplete: () => {
          gsap.to(tWrapper, {
            opacity: 1,
            duration: dur,
            ease: "power2.out",
            onStart: () => {
              gsap.to(pDate, {
                delay: dur * 0.5 - 0.2,
                opacity: 1,
                duration: dur,
                ease: "power3.out",
              });
              pDate.querySelectorAll(".text-size-14").forEach((t, i) => {
                gsap.fromTo(
                  t,
                  {
                    y: "100%",
                  },
                  {
                    delay: i * 0.1,
                    y: "0%",
                    duration: dur - i * 0.1,
                    ease: "power3.out",
                  },
                );
              });
              gsap.to(pInfo, {
                delay: dur * 0.5 - 0.1,
                opacity: 1,
                duration: dur,
                ease: "power3.out",
              });
              pInfo.querySelectorAll(".text-size-14").forEach((t, i) => {
                gsap.fromTo(
                  t,
                  {
                    y: "100%",
                  },
                  {
                    delay: i * 0.1 + 0.2,
                    y: "0%",
                    duration: dur - i * 0.2,
                    ease: "power3.out",
                  },
                );
              });
              createSplitTransition(pName.firstChild, dur - 1.5);

              function createSplitTransition(c, d) {
                let typeSplit = new SplitType(c, {
                  types: "lines, words",
                  tagName: "span",
                });
                gsap.from(".transition_project-name .word", {
                  delay: d,
                  y: "100%",
                  opacity: 0,
                  duration: dur - d,
                  ease: "power4.out",
                  stagger: { each: 0.05 },
                  onStart: () => {
                    window.addEventListener("resize", () => {
                      typeSplit.revert();
                    });
                  },
                });
              }
            },
            onComplete: () => (window.location = goTo),
          });
        },
      });
    });
  });
  window.addEventListener("unload", () => {
    setTimeout(() => {
      tWrapper.style.display = "none";
      tWrapper.style.opacity = 0;
    }, 100);
  });
}

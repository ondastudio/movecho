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

  const scrollAnims = document.querySelectorAll(".scroll-anim");
  const inside = [];
  scrollAnims.forEach((el, i) => {
    inside.push(false);
    window.addEventListener("scroll", () => {
      if (ScrollTrigger.isInViewport(el, 0) && !inside[i]) {
        if (el.classList.contains("scroll-anim-footer"))
          createSplitScrollRoman(".scroll-anim-footer", i, el);
        else createSplitScrollRoman(".scroll-anim" + (i + 1), i, el);
        inside[i] = true;
      }
    });
  });

  function createSplitLoadRoman(c, i, el, spanInit, spanEnd) {}

  function createSplitScrollRoman(c, i, el, spanInit, spanEnd) {
    let typeSplit = new SplitType(c, {
      types: "lines, words",
      tagName: "span",
      reduceWhiteSpace: false,
    });
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        end: "top 90%",
      },
    });
    tl.to(c, {
      opacity: 1,
      duration: 0,
    });
    tl.from(c + " .word", {
      y: "100%",
      opacity: 0,
      duration: 1.75,
      ease: "power4.out",
      stagger: { each: 0.05 },
      onStart: () => {
        const words = document.querySelectorAll(".word");
        let roman = false;
        words.forEach((word) => {
          if (word.innerHTML == spanInit) roman = true;
          else if (word.innerHTML == spanEnd) roman = false;

          if (roman) {
            word.classList.add("is-ivy-journal");
            word.classList.add("text-color-dark-3");
          }
        });
        window.addEventListener("resize", () => {
          typeSplit.revert();
          const heading = el;
          const str = heading.innerHTML;
          const i1 = str.indexOf(spanInit);
          const i2 = str.indexOf(spanEnd) - 1;

          function insert(places, str) {
            return places
              .reduce(function (r, a) {
                r[a.start] =
                  "<span class='is-ivy-journal text-color-dark-3'>" +
                  r[a.start];
                r[a.end] += "</span>";
                return r;
              }, str.split(""))
              .join("");
          }
          const places = [{ start: i1, end: i2 }];

          heading.innerHTML = insert(places, str);
        });
      },
    });
  }
}
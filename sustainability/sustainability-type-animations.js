// pageload
function sustainabilityTypeAnimations() {
  const introText = document.querySelector(".intro-text");
  createSplitLoadRoman(".intro-text", " .word", "lines, words", 0);
  introText.style.opacity = 1;

  function createSplitLoadRoman(c, c2, t, d, spanInit, spanEnd) {
    let typeSplit = new SplitType(c, {
      types: t,
      tagName: "span",
    });
    let tl = gsap.timeline();
    tl.from(c + c2, {
      delay: d,
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
          spanEnd = " mas";
          const heading = introText;
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
    }
  );

  const certification = document.querySelector(".scroll-anim-char");
  let cInside = false;
  window.addEventListener("scroll", () => {
    if (ScrollTrigger.isInViewport(certification, 0) && !cInside) {
      createSplitScroll(
        ".scroll-anim-char",
        " .char",
        "lines, chars",
        certification
      );
      cInside = true;
    }
  });

  const scrollAnims = document.querySelectorAll(".scroll-anim");
  const inside = [];
  scrollAnims.forEach((el, i) => {
    inside.push(false);
    let spanInit, spanEnd;
    if (i == 2) {
      spanInit = "proporcionar";
      spanEnd = "fazendo";
    }
    window.addEventListener("scroll", () => {
      if (ScrollTrigger.isInViewport(el, 0) && !inside[i]) {
        if (el.classList.contains("scroll-anim-footer"))
          createSplitScrollRoman(".scroll-anim-footer", i, el);
        else
          createSplitScrollRoman(
            ".scroll-anim" + (i + 1),
            i,
            el,
            spanInit,
            spanEnd
          );
        inside[i] = true;
      }
    });
  });

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

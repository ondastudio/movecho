// pageload
function homeTypeAnimations() {
  createSplitLoad(".intro-text", " .word", "lines, words", 2.75);
  document.querySelector(".intro-text").style.opacity = 1;

  const scrollAnims = document.querySelectorAll(".scroll-anim");
  scrollAnims.forEach((el, i) => {
    let spanInit, spanEnd;
    if (i == 0) {
      spanInit = "paixão";
      spanEnd = "executando";
    } else if (i == 2) {
      spanInit = "técnicas";
      spanEnd = "cada";
    }
    if (el.classList.contains("scroll-anim-footer"))
      createSplitScrollRoman(".scroll-anim-footer", i, el, spanInit, spanEnd);
    else
      createSplitScrollRoman(
        ".scroll-anim" + (i + 1),
        i,
        el,
        spanInit,
        spanEnd,
      );
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

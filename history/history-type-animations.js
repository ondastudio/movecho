function historyTypeAnimations() {
  createSplitLoad(".intro-text", " .word", "lines, words", 0);
  document.querySelector(".intro-text").style.opacity = 1;

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

  function createSplitScrollRoman(c, i, el) {
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
        window.addEventListener("resize", () => {
          typeSplit.revert();
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
}

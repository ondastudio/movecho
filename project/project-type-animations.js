function projectTypeAnimations() {
  const scrollAnims = document.querySelectorAll(".scroll-anim");
  const inside = [];
  scrollAnims.forEach((el, i) => {
    inside.push(false);
    window.addEventListener("scroll", () => {
      if (ScrollTrigger.isInViewport(el, 0) && !inside[i]) {
        if (el.classList.contains("scroll-anim-footer"))
          createSplitScroll(
            ".scroll-anim-footer",
            " .word",
            "lines, words",
            el,
          );
        else
          createSplitScroll(
            ".scroll-anim" + (i + 1),
            " .word",
            "lines, words",
            el,
          );
        inside[i] = true;
      }
    });
  });

  const explore = document.querySelector(".scroll-anim-char");
  let eInside = false;
  window.addEventListener("scroll", () => {
    if (ScrollTrigger.isInViewport(explore, 0) && !eInside) {
      createSplitScroll(".scroll-anim-char", " .char", "lines, chars", explore);
      eInside = true;
    }
  });
}

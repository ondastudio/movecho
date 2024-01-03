function contactTypeAnimations() {
  createSplitLoadContact(".intro-text", " .word", "lines, words", 0);
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

  function createSplitLoadContact(c, c2, t, d) {
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
        window.addEventListener("resize", () => {
          typeSplit.revert();
        });
      },
      onComplete: () => {
        const underlines = document.querySelectorAll(".link-underline");
        let uSize = 1.5;
        if (window.innerWidth <= 991) {
          uSize = 1.25;
        }
        underlines.forEach((u) => {
          u.style.borderBottom = uSize + "px solid var(--black)";
          u.addEventListener("mouseenter", () => {
            u.style.borderBottom = uSize + "px solid transparent";
          });
          u.addEventListener("mouseleave", () => {
            u.style.borderBottom = uSize + "px solid var(--black)";
          });
        });
      },
    });
  }

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
      onComplete: () => {
        if (i === 3) {
          const underline = document.querySelector(".link-underline-2");
          underline.style.borderBottom = "1.25px solid var(--black)";
          underline.addEventListener("mouseenter", () => {
            underline.style.borderBottom = "1.25px solid transparent";
          });
          underline.addEventListener("mouseleave", () => {
            underline.style.borderBottom = "1.25px solid var(--black)";
          });
        }
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

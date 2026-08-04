function homeIntro() {
  const introVisual = document.querySelector(".visual-wrapper");
  const introChildren = [...introVisual.children];
  const logo = introChildren[0]; // MOVECHO logo = first .visual-element
  const slides = introChildren.slice(1); // the photos + hero video
  const introVid = document.querySelector(".intro-video");
  introVid.pause();

  // start state: only the logo is visible
  slides.forEach((el) => (el.style.opacity = 0));

  // 1) Logo appears ONCE, then bows out as the slideshow takes over.
  //    (It is no longer left sitting visible underneath, so it can never
  //     be re-exposed when the loop resets the images.)
  const tl = gsap.timeline({ defaults: { duration: 0.5 } });
  tl.to(logo, {
    opacity: 1,
    y: "0%",
    ease: "power4.inOut",
  });
  gsap.to(logo, { delay: 1.3, opacity: 0, duration: 0.3 }); // hide the logo underlayer

  // 2) Looping image slideshow — logo is NOT part of this set anymore.
  const tl2 = gsap.timeline({ delay: 1.3 });
  tl2.to(slides, {
    opacity: 1,
    duration: 0,
    stagger: { each: 0.3 },
    repeat: -1,
  });

  function flipVideo() {
    const state = Flip.getState(introVisual);
    const newContainer = document.querySelector(".home-hero_video-wrap");
    newContainer.appendChild(introVisual);
    Flip.from(state, {
      duration: 2,
      ease: "power4.inOut",
    });
  }

  const heroIntro = gsap.timeline({});
  heroIntro.paused(true);

  heroIntro.to(
    ".navbar",
    {
      delay: 1.2,
      opacity: 1,
      y: "0%",
      duration: 1.5,
      ease: "power3.out",
    },
    "<"
  );
  heroIntro.to(
    ".cookie_main-banner",
    {
      delay: 1.2,
      opacity: 1,
      y: "0%",
      duration: 1.5,
      ease: "power3.out",
    },
    "<"
  );

  function introAnimation() {
    heroIntro.restart();
  }

  // .homepage-intro is a full-screen overlay that SITS ON TOP of the hero
  // (it's a sibling of the hero <header>, not its parent). If it's left in
  // place it covers the hero TEXT — which is exactly the "text never appears"
  // bug. So: dissolve its background (reveals the text behind it, without
  // dimming the video), then remove it from the page entirely.
  function hideLoader() {
    const loader = document.querySelector(".homepage-intro");
    if (!loader) return;

    // Fade the BACKGROUND to transparent (not opacity) so the video stays crisp.
    const bg = getComputedStyle(loader).backgroundColor; // e.g. "rgb(245, 240, 235)"
    const clear = bg.startsWith("rgb(")
      ? bg.replace("rgb(", "rgba(").replace(")", ", 0)")
      : "rgba(0, 0, 0, 0)";

    gsap.to(loader, {
      delay: 1.2, // let the 2s flip get most of the way there first
      backgroundColor: clear,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        // Safe: .homepage-intro does NOT contain the hero, so removing it
        // can never hide the hero. This guarantees the text is uncovered.
        loader.style.display = "none";
      },
    });
  }

  // --- Finish ONCE: on load, or a safety net if the load stalls ---
  // NOTE: the old `tl2.restart()` on load is intentionally gone — that restart
  // wiped the images back to invisible and re-exposed the logo a second time.
  let finished = false;
  function finishIntro() {
    if (finished) return;
    finished = true;

    tl2.progress(1).kill(); // end the loop with everything shown (video on top)
    logo.style.opacity = 0; // keep the logo hidden
    introVid.play().catch(() => {}); // don't throw if autoplay is blocked
    flipVideo();
    introAnimation(); // reveal navbar + cookie banner
    hideLoader(); // fade out + remove the leftover loader background
  }

  if (document.readyState === "complete") {
    setTimeout(finishIntro, 2450);
  } else {
    window.addEventListener("load", () => setTimeout(finishIntro, 2450));
    setTimeout(finishIntro, 10000); // safety net so the intro can never hang
  }
}
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

  // Fade out ONLY the loader's background colour (not its opacity), so the
  // video handing off from the slideshow stays fully visible the whole time.
  // Fading opacity would dim the video too if the hero sits inside .homepage-intro.
  function hideLoader() {
    const loader = document.querySelector(".homepage-intro");
    if (!loader) return;

    // Build a fully-transparent version of the current background colour,
    // so it fades to clear without tinting toward black on the way.
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
        // leftover is now transparent; make it click-through so it never
        // blocks the page. (No display:none — that could hide the hero if the
        // video container lives inside .homepage-intro.)
        loader.style.pointerEvents = "none";
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
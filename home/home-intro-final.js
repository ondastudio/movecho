function homeIntro() {
  const introVisual = document.querySelector(".visual-wrapper");
  const introChildren = [...introVisual.children];
  const introVid = document.querySelector(".intro-video");
  introVid.pause();

  //set the images to invisible except ithe first one
  for (let i = 1; i < introChildren.length; i++) {
    introChildren[i].style.opacity = 0;
  }

  const tl = new gsap.timeline({
    defaults: {
      duration: 0.5,
    },
  });

  tl.to(introChildren[0], {
    duration: 0.5,
    opacity: 1,
    y: "0%",
    ease: "power4.inOut",
  });

  const tl2 = new gsap.timeline();
  tl2.to(introChildren.slice(1), {
    delay: 1.3,
    opacity: 1,
    duration: 0,
    stagger: { each: 0.3 },
    repeat: -1,
  });

  window.addEventListener("load", () => {
    tl2.delay(0);
    tl2.restart();
    setTimeout(() => {
      tl2.progress(1).kill();
      introVid.play();
      flipVideo();
      introAnimation();
    }, 2450);
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

  const heroIntro = new gsap.timeline({});
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
}

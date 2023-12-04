document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(Flip);

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
      duration: 0.5
    }
  });

  tl.to(introChildren, {
    duration: 2,
    y: "0%",
    ease: "power4.inOut"
  });

  const tl2 = new gsap.timeline();
  tl2.to(
    introChildren,
    {
      delay: 1,
      opacity: 1,
      duration: 0,
      stagger: { each: 0.3 },
      onStart: () => {
        setTimeout(() => {
          introVid.play();
          flipVideo();
          introAnimation();
        }, 1200);
      }
    },
    ">"
  );

  function flipVideo() {
    const state = Flip.getState(introVisual);
    const newContainer = document.querySelector(".home-hero_video-wrap");
    newContainer.appendChild(introVisual);
    Flip.from(state, {
      duration: 2,
      ease: "power4.inOut"
    });
  }

  const heroIntro = new gsap.timeline({});
  heroIntro.paused(true);

  heroIntro.to(
    ".navbar",
    {
      delay: 1.6,
      opacity: 1,
      y: "0%",
      duration: 1.5,
      ease: "power3.out"
    },
    "<"
  );

  function introAnimation() {
    heroIntro.restart();
  }
});

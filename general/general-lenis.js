let lenis;
("use strict"); // fix lenis in safari

if (Webflow.env("editor") === undefined) {
  lenis = new Lenis({
    lerp: 0.05,
    wheelMultiplier: 1.5,
    infinite: false,
    gestureOrientation: "vertical",
    normalizeWheel: false,
    smoothTouch: false
  });

  function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

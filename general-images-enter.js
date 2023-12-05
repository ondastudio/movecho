// pageload
window.addEventListener("load", () => {
  const vids = document.querySelectorAll("video");
  const imgs = document.querySelectorAll(".img-anim");

  vids.forEach((v) => {
    if (!v.classList.contains("intro-video")) createSwipeVid(v);
  });
  imgs.forEach((i) => {
    if (i.complete) createSwipeImg(i);
    else i.onload = () => createSwipeImg(i);
  });

  function createSwipeVid(el) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: el.parentElement,
        start: "top 90%",
        end: "top 90%",
      },
    });
    let tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: el.parentElement,
        start: "top 90%",
        end: "top 90%",
      },
    });
    tl.fromTo(
      el.parentElement,
      {
        clipPath: "polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)",
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 2,
        ease: "power3.out",
      },
    );
    tl2.fromTo(
      el,
      {
        scale: 1.5,
      },
      {
        scale: 1,
        duration: 2,
        ease: "power3.out",
      },
    );
  }

  function createSwipeImg(el) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: el.parentElement,
        start: "top 90%",
        end: "top 90%",
      },
    });
    let tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: el.parentElement,
        start: "top 90%",
        end: "top 90%",
      },
    });
    tl.fromTo(
      el.parentElement,
      {
        clipPath: "polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)",
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 2,
        ease: "power3.out",
      },
    );
    tl2.fromTo(
      el,
      {
        scale: 1.5,
      },
      {
        scale: 1.2,
        duration: 2,
        ease: "power3.out",
      },
    );
  }
});

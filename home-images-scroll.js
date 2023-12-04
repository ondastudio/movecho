function homeImagesScroll() {
  const projects = document.querySelectorAll(".home-proj_item");

  projects.forEach((project, i) => {
    const img = project.querySelector(".image");
    const lab = project.querySelector(".home_proj-sub-c_wrap");
    const arrow = project.querySelector(".home-project_arrow-wrap");
    imageParallax(project, img);

    project.addEventListener("mouseenter", () => {
      gsap.to(img, {
        scale: 1.15,
        duration: 1.5,
        ease: "power3.out",
      });

      gsap.fromTo(
        lab,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        arrow,
        {
          x: "-8%",
          rotation: -45,
          opacity: 0,
        },
        {
          x: "0%",
          rotation: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
        },
      );
    });
    project.addEventListener("mouseleave", () => {
      gsap.to(img, {
        scale: 1.2,
        duration: 1.5,
        ease: "power3.out",
      });
      gsap.to(arrow, {
        x: "-8%",
        rotation: -45,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
      });
      gsap.to(lab, {
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
      });
    });
  });

  const missionVid = document.querySelector(".mission_big-video");
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: missionVid,
      scrub: 1,
    },
  });
  tl.fromTo(
    missionVid,
    {
      y: "-8%",
    },
    {
      y: "8%",
      duration: 1,
      ease: "none",
    },
  );

  const sustImg = document.querySelector(".home-sus_small-img-wrap");
  const img = sustImg.querySelector(".image");
  imageParallax(sustImg, img);
}

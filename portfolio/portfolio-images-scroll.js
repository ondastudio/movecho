function portfolioImagesScroll() {
  const projects = document.querySelectorAll(".portfolio-list_item");

  projects.forEach((project, i) => {
    const img = project.querySelector(".image");
    const lab = project.querySelector(".portfolio_proj-sub-c_wrap");
    const arrow = project.querySelector(".portfolio-project_arrow-wrap");
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
}

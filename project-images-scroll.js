function projectImagesScroll() {
  const gallery = document.querySelectorAll(".gallery-image-container");
  gallery.forEach((pic) => {
    const img = pic.querySelector(".image");
    imageParallax(pic, img);
  });

  const midImgs = document.querySelectorAll(".project-solution-container");

  midImgs.forEach((cont) => {
    const img = cont.querySelector(".image");
    img.onload = () => {
      imageParallax(cont, img);
    };
  });

  const nextProjects = document.querySelectorAll(".project-image-container");

  nextProjects.forEach((project) => {
    const img = project.querySelector(".image");
    img.onload = () => {
      imageParallax(project, img);
    };

    project.parentElement.addEventListener("mouseenter", () => {
      gsap.to(img, {
        scale: 1.15,
        duration: 1.5,
        ease: "power3.out",
      });
    });
    project.parentElement.addEventListener("mouseleave", () => {
      gsap.to(img, {
        scale: 1.2,
        duration: 1.5,
        ease: "power3.out",
      });
    });
  });
}

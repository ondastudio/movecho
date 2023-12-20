function newsImagesScroll() {
  const imgs = document.querySelectorAll(".img-anim");
  let init = true;
  imgs.forEach((img) => {
    const parent = img.parentElement;
    if (img.complete) imageParallax(parent, img);
    else img.onload = () => imageParallax(parent, img);
  });

  newsHover();

  const loadMore = document.querySelector(".load-more-btn");
  loadMore.addEventListener("click", () => {
    newsHover();
  });

  const filters = document.querySelectorAll(".news-filter-link");
  filters.forEach((link) => {
    link.addEventListener("click", () => {
      setTimeout(() => {
        newsHover();
      }, 1000);
      filters.forEach((link2) => {
        link2.classList.remove("is-active");
      });
      link.classList.add("is-active");
    });
  });

  function newsHover() {
    const news = document.querySelectorAll(".news-link");
    const newsParent = document.querySelector(".news-collection-list");
    const newsImgs = newsParent.querySelectorAll(".img-anim-news-parallax");

    newsImgs.forEach((img) => {
      const parent = img.parentElement;
      newsImageParallax(parent, img);
    });
    news.forEach((n, i) => {
      const img = n.querySelector(".img-anim-news-hover");

      n.onmouseenter = () => {
        if (img.complete) mouseEnter();
        else img.onload = () => mouseEnter();
      };
      n.onmouseleave = () => {
        if (img.complete) mouseLeave();
        else img.onload = () => mouseLeave();
      };

      function mouseEnter() {
        gsap.to(img, {
          scale: 1.15,
          duration: 1.5,
          ease: "power3.out",
        });
      }

      function mouseLeave() {
        gsap.to(img, {
          scale: 1.2,
          duration: 1.5,
          ease: "power3.out",
        });
      }
    });
    init = false;
  }

  function newsImageParallax(el, c) {
    gsap.fromTo(
      c,
      {
        y: "-15%",
      },
      {
        y: "15%",
        //duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: c,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        overwrite: true,
      }
    );
  }
}

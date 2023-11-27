window.addEventListener("load", () => {
  const navbar = document.querySelector(".nav_menu-items-wrap");
  const dropdowns = navbar.querySelectorAll(".nav-dropdown");

  const items = document.querySelectorAll(".nav_menu-item");
  const mainCol = items[0].getAttribute("content-color");

  const menuIcon = document
    .querySelector(".mobile-menu-trigger")
    .querySelectorAll(".menu-icon-lottie");
  if (mainCol === "light-1")
    menuIcon.forEach((lottie) => {
      if (lottie.classList.contains("is-hidden"))
        lottie.classList.remove("is-hidden");
      else lottie.classList.add("is-hidden");
    });

  items.forEach((it) => {
    it.addEventListener("mouseenter", () => {
      items.forEach((jt) => {
        if (jt.classList.contains("is-language"))
          jt.style.color = "var(--" + mainCol + ")"; //1
        if (jt !== it) {
          jt.style.color = "#757370"; //0.45
        }
      });
    });
    it.addEventListener("mouseleave", () => {
      items.forEach((jt) => {
        if (jt !== it) jt.style.color = "var(--" + mainCol + ")"; //1;
        if (jt.classList.contains("is-language")) jt.style.color = "#757370"; //0.45;
      });
    });
  });

  const counts = [];

  window.addEventListener("click", () => {
    closeSubMenus(undefined);
  });

  dropdowns.forEach((dd, i) => {
    const dropmenu = dd.querySelector(".nav-drop-list");
    counts.push(0);
    dd.addEventListener("click", (e) => {
      e.stopPropagation();
      const parent = dd.parentElement;
      parent.style.zIndex = 1;
      if (counts[i] % 2 === 0) {
        anim = gsap.to(dropmenu, {
          display: "block",
          height: "0px",
          duration: 0,
        });
        gsap.to(dropmenu, {
          display: "block",
          height: "auto",
          duration: 1,
          ease: "power3.out",
        });
      } else {
        gsap.to(dropmenu, {
          height: "0px",
          duration: 1,
          ease: "power3.out",
          onComplete: () => {
            dropmenu.style.display = "none";
          },
        });
      }
      counts[i]++;

      closeSubMenus(i);
    });
  });

  function closeSubMenus(i) {
    dropdowns.forEach((dd2, j) => {
      if (j !== i) {
        const parent2 = dd2.parentElement;
        parent2.style.zIndex = 0;
        counts[j] = 0;
        const dropmenu2 = dd2.querySelector(".nav-drop-list");
        gsap.to(dropmenu2, {
          height: "0px",
          duration: 1,
          ease: "power3.out",
          onComplete: () => {
            dropmenu2.style.display = "none";
          },
        });
      }
    });
  }
});

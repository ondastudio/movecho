window.addEventListener("load", () => {
  const navbar = document.querySelector(".nav_menu-items-wrap");
  const dropdowns = navbar.querySelectorAll(".nav-dropdown");

  const items = navbar.querySelectorAll(".nav_menu-item");
  const mainCol = items[0].getAttribute("content-color");

  let isHome = true;
  let current;

  items.forEach((item, i) => {
    const links = item.querySelectorAll("a");
    links.forEach((link) => {
      if (link.classList.contains("w--current")) {
        isHome = false;
        current = i;
      }
    });
  });

  if (!isHome) {
    items.forEach((item) => {
      const links = item.querySelectorAll("a");
      let shouldSkip = false;
      links.forEach((link) => {
        if (shouldSkip) return;
        if (link.classList.contains("w--current")) {
          item.style.color = "var(--" + mainCol + ")";
          shouldSkip = true;
          return;
        } else {
          item.style.color = "#757370";
        }
      });
    });
  }

  const menuIcon = document
    .querySelector(".mobile-menu-trigger")
    .querySelectorAll(".menu-icon-lottie");
  if (mainCol === "light-1")
    menuIcon.forEach((lottie) => {
      if (lottie.classList.contains("is-hidden"))
        lottie.classList.remove("is-hidden");
      else lottie.classList.add("is-hidden");
    });

  items.forEach((it, i) => {
    it.addEventListener("mouseenter", () => {
      if (isHome) {
        items.forEach((jt) => {
          if (jt.classList.contains("is-language"))
            jt.style.color = "var(--" + mainCol + ")"; //1
          if (jt !== it) {
            jt.style.color = "#757370"; //0.45
          }
        });
      } else {
        items.forEach((jt, j) => {
          if (jt === it) jt.style.color = "var(--" + mainCol + ")";
          if (jt !== it && j !== current) {
            jt.style.color = "#757370"; //0.45
          }
        });
      }
    });
    it.addEventListener("mouseleave", () => {
      if (isHome) {
        items.forEach((jt) => {
          if (jt !== it) jt.style.color = "var(--" + mainCol + ")"; //1;
          if (jt.classList.contains("is-language")) jt.style.color = "#757370"; //0.45;
        });
      } else {
        items.forEach((jt, j) => {
          if (j !== current) jt.style.color = "#757370"; //0.45;
        });
      }
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

  // NAV COLOR CHANGE
  const navProp =
    document.querySelector(".navbar").getBoundingClientRect().height /
    window.innerHeight;
  const navBG = document.querySelector(".nav-bg");
  const navDrop = document.querySelectorAll(".nav-drop-list");
  const navMobile = document.querySelector(".mobile-menu");

  const light0 = document.querySelectorAll(".background-color-light-0");
  const l0inside = [];
  light0.forEach(() => {
    l0inside.push({ v: false });
  });
  const light1 = document.querySelectorAll(".background-color-light-1");
  const l1inside = [];
  light1.forEach(() => {
    l1inside.push({ v: false });
  });
  const light2 = document.querySelectorAll(".background-color-light-2");
  const l2inside = [];
  light2.forEach(() => {
    l2inside.push({ v: false });
  });
  const light3 = document.querySelectorAll(".background-color-light-3");
  const l3inside = [];
  light3.forEach(() => {
    l3inside.push({ v: false });
  });
  const light4 = document.querySelectorAll(".background-color-light-4");
  const l4inside = [];
  light4.forEach(() => {
    l4inside.push({ v: false });
  });
  const dark1 = document.querySelectorAll(".background-color-dark-1");
  const d1inside = [];
  dark1.forEach(() => {
    d1inside.push({ v: false });
  });

  window.addEventListener("scroll", () => {
    light0.forEach((l0, i) => {
      changeColor(l0, l0inside[i], "light-0");
    });
    light1.forEach((l1, i) => {
      changeColor(l1, l1inside[i], "light-1");
    });
    light2.forEach((l2, i) => {
      changeColor(l2, l2inside[i], "light-2");
    });
    light3.forEach((l3, i) => {
      changeColor(l3, l3inside[i], "light-3");
    });
    light4.forEach((l4, i) => {
      changeColor(l4, l4inside[i], "light-4");
    });
    dark1.forEach((d1, i) => {
      changeColor(d1, d1inside[i], "dark-1");
    });
  });

  function changeColor(section, inside, info) {
    if (
      ScrollTrigger.positionInViewport(section, "top") <= navProp &&
      ScrollTrigger.positionInViewport(section, "bottom") > navProp &&
      !inside.v
    ) {
      navBG.setAttribute("background-color", info);
      navDrop.forEach((drop) => drop.setAttribute("background-color", info));
      navMobile.setAttribute("background-color", info);
      inside.v = true;
    } else if (
      (ScrollTrigger.positionInViewport(section, "bottom") <= navProp &&
        inside.v) ||
      (ScrollTrigger.positionInViewport(section, "top") > navProp && inside.v)
    ) {
      inside.v = false;
    }
  }
});

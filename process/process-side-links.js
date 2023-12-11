function processSideLinks() {
  // DESKTOP
  const sideLinks = document.querySelectorAll(".processo-link");
  const bullet = document.querySelector(".process-bullet");
  const inside = [];
  sideLinks.forEach(() => {
    inside.push(false);
  });

  const dur = 0.25;
  let none = true;
  window.addEventListener("scroll", () => {
    sideLinks.forEach((link, i) => {
      const label = link.parentElement;
      if (link.classList.contains("w--current") && !inside[i]) {
        link.parentElement.parentElement.insertBefore(bullet, label);
        bullet.style.opacity = 1;
        gsap.to(label, {
          marginLeft: "0.875rem",
          duration: dur,
          ease: "power3.out",
        });
        none = false;
        inside[i] = true;
      } else if (!link.classList.contains("w--current") && inside[i]) {
        gsap.to(link.parentElement, {
          marginLeft: "0.5rem",
          duration: dur,
          ease: "power3.out",
        });
        inside[i] = false;
      }
    });
    none = true;
    for (let j = 0; j < inside.length; j++) {
      if (inside[j]) {
        none = false;
      }
    }
    if (none) bullet.style.opacity = 0;
  });

  // MOBILE
  if (window.innerWidth <= 991) {
    const dropdown = document.querySelector(".processo-dropdown");
    const dropLinks = dropdown.querySelectorAll(".dropdown-tab-link");
    const dropBullet = dropdown.querySelector(".process-bullet-mobile");
    const dropArrow = dropdown.querySelector(".dropdown-arrow");
    let dropHeight = dropdown.getBoundingClientRect().height;
    dropdown.style.height = "auto";
    let openDropHeight = dropdown.getBoundingClientRect().height;
    dropdown.style.height = "2rem";
    let open = false;

    dropLinks.forEach((link, i) => {
      link.addEventListener("click", (e) => {
        link.querySelector(".process-dropdown-link").appendChild(dropArrow);
        link.insertBefore(dropBullet, link.firstChild);
        if (open) {
          setTimeout(() => {
            const top = dropdown.getBoundingClientRect().top;
            const bottom = link.getBoundingClientRect().bottom;
            dropHeight = bottom - top;
            gsap.to(dropdown, {
              height: dropHeight,
              duration: 1,
              ease: "power3.out",
            });
            open = false;
          }, 10);
        } else {
          gsap.to(dropdown, {
            height: openDropHeight,
            duration: 1,
            ease: "power3.out",
          });
          open = true;
        }
      });
    });

    function changeSection(i) {}
  }
}

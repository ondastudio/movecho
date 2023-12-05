function processSideLinks() {
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
}

window.addEventListener("load", () => {
  const names = document.querySelectorAll(".home_proj-name_wrap");

  names.forEach((name) => {
    name.style.width = getTextWidth(name.querySelector("p")) + "px";
  });

  function getTextWidth(el) {
    const text = el;
    const width = Math.ceil(text.getBoundingClientRect().width);
    return width;
  }
 
  window.addEventListener("resize", () => {
    names.forEach((name) => {
      name.style.width = null;
      name.style.width = getTextWidth(name.querySelector("p")) + "px";
    });
  });
});

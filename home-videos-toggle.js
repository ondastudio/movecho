function homeVideosToggle() {
  const hero = document.querySelector(".intro-video");
  let hInside = { v: true };
  const vid1 = document.querySelector(".vid1");
  let vInside1 = { v: false };
  const vid2 = document.querySelector(".vid2");
  let vInside2 = { v: false };
  const vid3 = document.querySelector(".vid3");
  let vInside3 = { v: false };
  const vid4 = document.querySelector(".vid4");
  let vInside4 = { v: false };

  window.addEventListener("scroll", () => {
    toggleVideos(hero, hInside);
    toggleVideos(vid1, vInside1);
    toggleVideos(vid2, vInside2);
    toggleVideos(vid3, vInside3);
    toggleVideos(vid4, vInside4);
  });

  function toggleVideos(vid, inside) {
    if (ScrollTrigger.isInViewport(vid, 0) && !inside.v) {
      vid.play();
      inside.v = true;
    } else if (!ScrollTrigger.isInViewport(vid, 0) && inside.v) {
      vid.pause();
      inside.v = false;
    }
  }
}

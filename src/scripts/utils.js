// =========== SCROLL TO ELEMENT =========== //

export const handleScroll = (path) => {
  const scrollPosition = document.getElementById(`${path}`);

  window.scrollTo({
    top: scrollPosition.offsetTop - 20,
    behavior: "smooth",
  });
};

// =========== SCROLL TO ELEMENT USER =========== //

export function scrollByElemHeight() {
  const tiles = document.querySelectorAll(".user__tile");
  if (!tiles.length) return;

  const tileHeight = tiles[0].getBoundingClientRect().height * 2 + 50;

  window.scrollBy({
    top: tileHeight,
    left: 0,
    behavior: "smooth",
  });
}

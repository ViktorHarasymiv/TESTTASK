// SCROLL FUNCTION

export const handleScroll = (path) => {
  const scrollPosition = document.getElementById(`${path}`);
  if (scrollPosition) {
    const position = scrollPosition.getBoundingClientRect().top;

    window.scrollTo({
      top: position - 50,
      behavior: "smooth",
    });
  } else {
    console.log("Елемент не знайдено");
  }
};

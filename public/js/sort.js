const toggleClass = (element, className1, className2, condition) => {
    if (condition) {
      element.classList.remove(className2);
      element.classList.add(className1);
      element
        .querySelector(".arrowDown")
        .classList.toggle("hidden", className1 !== "ascend");
      element
        .querySelector(".arrowUp")
        .classList.toggle("hidden", className1 !== "descend");
    } else {
      element.classList.remove(className1);
      element.classList.add(className2);
      element
        .querySelector(".arrowDown")
        .classList.toggle("hidden", className2 !== "ascend");
      element
        .querySelector(".arrowUp")
        .classList.toggle("hidden", className2 !== "descend");
    }
  };
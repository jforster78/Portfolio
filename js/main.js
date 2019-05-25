"use strict";

//HOW I CAN HELP (ANIMATION)
const animateWhatICanDo = (() => {
  //Fade in how I can help when in viewpoint
  const fadeIn = () => {
    let elems;
    let windowHeight;
    //Get the height of the browser
    const init = () => {
      elems = document.querySelectorAll(".grid__hidden");
      windowHeight = window.innerHeight; //Height (in pixels) of the browser window viewpoint
      addEventHandlers();
      checkPosition();
    };
    //Event handlers
    const addEventHandlers = () => {
      window.addEventListener("scroll", checkPosition);
      window.addEventListener("resize", init);
    };
    //Check the top position of the elements viewpoint and change classname
    const checkPosition = () => {
      for (let i = 0; i < elems.length; i++) {
        const positionFromTop = elems[i].getBoundingClientRect().top;
        if (positionFromTop - windowHeight <= 0) {
          elems[i].className = elems[i].className.replace(
            "grid__hidden",
            "grid__fadeIn"
          );
        }
      }
    };
    return {
      init: init
    };
  };
  fadeIn().init();
})();
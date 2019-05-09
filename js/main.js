"use strict";

//MENU TOGGLE
const menuToggle = (() => {
  //Build the menu toggle
  const buildTheToggle = () => {
    const navs = document.querySelectorAll(".header__navlink");
    navs.forEach(nav => nav.classList.toggle("header__navshow"));
  };
  //Build the menu button animation
  const toggleButton = () => {
    const bars = document.querySelector(".header__navbutton");
    bars.classList.toggle("header__navbutton--change");
  };
  //Toggles menu opened/closed
  const toggleEventListener = document.querySelector(".header__navbutton");
  toggleEventListener.addEventListener("click", () => {
    buildTheToggle();
    toggleButton();
  });
})();

//SLIDESHOW
const slideShow = (() => {
  //Variables
  let curIndex = 0,
    slider = document.querySelector(".grid__slideShow"),
    slides = slider.childNodes,
    imgArray = [
      "img/slideShow/img1.jpg",
      "img/slideShow/img2.jpg",
      "img/slideShow/img3.jpg"
    ];
  //Build the slideshow
  const buildSlideShow = arr => {
    for (let i = 0; i < arr.length; i++) {
      const img = document.createElement("img");
      img.src = arr[i];
      slider.appendChild(img).setAttribute("alt", "Slide " + [i]);
    }
  };
  //Fade in/out each slide
  const fade = () => {
    const fadeIn = ev => {
      ev.className = "fadeIn";
    };
    const fadeOut = ev => {
      ev.className = "";
    };

    fadeOut(slides[curIndex]);
    curIndex++;
    if (curIndex === slides.length) {
      curIndex = 0;
    }

    fadeIn(slides[curIndex]);

    //Fade in/out every 10 seconds
    setTimeout(() => {
      fade();
    }, 10000); //10 seconds
  };
  buildSlideShow(imgArray);
  fade();
})();

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

//SCROLL TO THE TOP
const scrollToTheTop = (() => {
  //On scroll
  window.onscroll = () => {
    //Show button once scrolled down more than 150px
    const scrollDown = () => {
      window.scrollY > 350
        ? (document.querySelector(".backToTheTop").style.display = "block")
        : (document.querySelector(".backToTheTop").style.display = "none");
    };
    scrollDown();
  };
  let intervalId = 0;
  //Scroll step
  const scrollStep = () => {
    window.scrollY === 0
      ? clearInterval(intervalId)
      : window.scroll(0, window.scrollY - 50);
  };
  //Scroll every 16 milliseconds
  const scrollToTop = () => {
    intervalId = setInterval(() => {
      scrollStep();
    }, 16); //16 milliseconds
  };
  //Scroll back to the top
  const scrollButtonEventListener = document.querySelector(".backToTheTop");
  scrollButtonEventListener.addEventListener("click", () => {
    scrollToTop();
  });
})();

//COPYRIGHT YEAR
const date = (() => {
  //Get current date.
  const copyright = new Date();
  //Set current year.
  // @ts-ignore
  document.getElementById("date").innerHTML = copyright.getFullYear();
})();
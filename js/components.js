'use strict';

//Toggle Menu
class toggleMenu extends HTMLElement {
  constructor() {
    //Always call parent constructor first
    super();

    //Attach a Shodow Root to the custom element
    this._root = this.attachShadow({ mode: "open" });
  }

  //Functionality of component
  connectedCallback() {
    this._root.innerHTML = `
      <style>
        @media only screen and (min-width: 1024px) {
          .header__nav {
            width: 960px;
            margin: auto;
          }
        }
        @media only screen and (min-width: 1240px) {
          .header__nav {
            width: 1100px;
            margin: auto;
          }
        }
        @media only screen and (min-width: 1440px) {
          .header__nav {
            width: 1300px;
            margin: auto;
          }
        }
        .header__h1 {
          margin: 0;
        }
        .header__navlist {
          display: flex;
          justify-content: flex-start;
          flex-direction: column;
          list-style-type: none;
          margin: 0;
          padding: 0 1rem;
          background-color: #191919;
        }
        @media only screen and (min-width: 900px) {
          .header__navlist {
            flex-direction: row;
            background-color: #586c8c;
          }
        }
        .header__navitem {
          font-family: "subHeadings", serif;
        }
        .header__navitem--left {
          font-family: "title", cursive;
          color: #fff;
          padding: .75rem 1rem;
        }
        @media only screen and (min-width: 900px) {
          .header__navitem--left {
            padding: 1.5rem 0 1.5rem 1rem;
            flex-grow: 1;
          }
        }
        .header__link {
          text-decoration: none;
          color: #fff;
        }
        .header__navlink {
          text-decoration: none;
          color: #fff;
          border-bottom: 1px solid #fff;
          display: none;
          padding: 1.5rem 0.5rem;
        }
        .header__navlink:hover {
          color: #586c8c;
        }
        @media only screen and (min-width: 900px) {
          .header__navlink {
            display: block;
            border-bottom: none;
            padding: 2rem 1rem;
          }
          .header__navlink:hover {
            color: #191919;
          }
        }
        .header__navlink--noborder {
          border-bottom: none;
        }
        .header__navbutton {
          align-self: flex-end;
          display: initial;
          position: absolute;
          cursor: pointer;
          right: 1rem;
          top: .8rem;
          font-size: 1.5rem;
          display: block;
        }
        @media only screen and (min-width: 900px) {
          .header__navbutton {
            display: none;
          }
        }
        .header__navbar1, .header__navbar2, .header__navbar3 {
          width: 25px;
          padding: 1px 0;
          margin: 7px;
          transition: 0.4s;
          background-color: #fff;
        }
        .header__navbutton--change .header__navbar1 {
          -webkit-transform: rotate(-45deg) translate(-5px, 6px);
          transform: rotate(-45deg) translate(-5px, 6px);
        }
        .header__navbutton--change .header__navbar2 {
          opacity: 0;
        }
        .header__navbutton--change .header__navbar3 {
          -webkit-transform: rotate(45deg) translate(-6.75px, -8px);
          transform: rotate(45deg) translate(-6.75px, -8px);
        }
        .header__navshow {
          display: flex;
        }
      </style>

      <header class="header">
        <nav class="header__nav">
          <div class="header__navbutton">
            <div class="header__navbar1"></div>
            <div class="header__navbar2"></div>
            <div class="header__navbar3"></div>
          </div>
          <ul class="header__navlist">
            <li class="header__navitem header__navitem--left"><a href="index.html" class="header__link"><h1 class="header__h1">JF Web</h1></a></li>
            <li class="header__navitem"><a class="header__navlink" href="index.html#help">Services</a></li>
            <li class="header__navitem"><a class="header__navlink" href="index.html#portfolio">Portfolio</a></li>
            <li class="header__navitem"><a class="header__navlink" href="index.html#process">Process</a></li>
            <li class="header__navitem"><a class="header__navlink header__navlink--noborder" href="index.html#contact">Contact</a></li>
          </ul>
        </nav>
      </header>`;
    
      //Build the menu toggle
      const buildTheToggle = () => {
        const navs = this._root.querySelectorAll(".header__navlink");
        navs.forEach(nav => nav.classList.toggle("header__navshow"));
      };
      //Build the menu button animation
      const toggleButton = () => {
        const bars = this._root.querySelector(".header__navbutton");
        bars.classList.toggle("header__navbutton--change");
      };
      //Toggles menu opened/closed
      const toggleEventListener = this._root.querySelector(".header__navbutton");
      toggleEventListener.addEventListener("click", () => {
        buildTheToggle();
        toggleButton();
      });
  }
}
customElements.define("header-menu", toggleMenu);


//SlideShow
class slideShow extends HTMLElement {
  constructor() {
    //Always call parent constructor first
    super();

    //Attach a Shodow Root to the custom element
    this._root = this.attachShadow({ mode: "open" });

    //Set Class attribute
    let slideShow = document.querySelector('slide-show');
    slideShow.setAttribute('class', 'grid__slideShow');
  }

  //Functionality of component
  connectedCallback() {
    this._root.innerHTML = `
    <style>
      .grid__slides {
        position: relative;
        padding: 0;
        max-width: 100%;
        min-height: 100%;
      }
      .grid__slides img {
        -webkit-transition: opacity 2.5s;
        transition: opacity 2.5s;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        object-fit: cover;
      }
      @media only screen and (min-width: 900px) {
        .grid__slideShow img {
          min-height: 100%;
        }
      }
      .grid__slides img.fadeIn {
        opacity: 1;
      }
    </style>

    <div class="grid__slides"></div>`;

    //Variables
    let curIndex = 0,
    slider = this._root.querySelector(".grid__slides"),
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
  }
}
customElements.define("slide-show", slideShow);


//To The Top Button
class toTop extends HTMLElement {
  constructor() {
    //Always call parent constructor first
    super();

    //Attach a Shodow Root to the custom element
    this._root = this.attachShadow({ mode: "open" });
  }

  //Functionality of component
  connectedCallback() {
    this._root.innerHTML = `
    <style>
      .backToTheTop {
        display: none;
        position: fixed;
        bottom: 90px;
        right: 15px;
        opacity: 0.7;
        cursor: pointer;
        background-color: #586c8c;
        padding: 18px 15px 5px;
        border-radius: 50%;
      }
      @media only screen and (min-width: 900px) {
        .backToTheTop {
          background-color: #191919;
        }
      }
      .backToTheTop__button {
        border: solid #eef0f3;
        border-width: 3px 0 0 3px;
        display: inline-block;
        padding: 7px;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    </style>

    <!-- Back to the top-->
    <div class="backToTheTop">
      <div class="backToTheTop__button"></div>
    </div>`;

    //On scroll
    window.onscroll = () => {
      //Show button once scrolled down more than 350px
      const scrollDown = () => {
        window.scrollY > 350
          ? (this._root.querySelector(".backToTheTop").style.display = "block")
          : (this._root.querySelector(".backToTheTop").style.display = "none");
      };
      scrollDown();
    };
    //Scroll step
    let intervalId = 0;
    const scrollStep = () => {
      window.scrollY === 0
        ? clearInterval(intervalId)
        : window.scroll(0, window.scrollY -250);
    };
    //Scroll every 16 milliseconds
    const scrollToTop = () => {
      intervalId = setInterval(() => {
        scrollStep();
      }, 16); //16 milliseconds
    };
    //Scroll back to the top
    const scrollButtonEventListener = this._root.querySelector(".backToTheTop");
    scrollButtonEventListener.addEventListener("click", () => {
      scrollToTop();
    });
  }
}
customElements.define("to-top", toTop);


//Copyright Date
class copyrightDate extends HTMLElement {
  constructor() {
    //Always call parent constructor first
    super();

    //Attach a Shodow Root to the custom element
    this._root = this.attachShadow({ mode: "open" });
  }

  //Functionality of component
  connectedCallback() {
    this._root.innerHTML = `
    <style>
      .footer__copyright {
        font-size: 90%;
      }
    </style>

    <p class="footer__copyright"><small>Copyright &copy;<span id="date"> 2019 </span> JF Web</small></p>`;

    //Get current date.
    const copyright = new Date();
    //Set current year.
    // @ts-ignore
    this._root.getElementById("date").innerHTML = copyright.getFullYear();
  }
}
customElements.define("copyright-date", copyrightDate);
class ShopCarousel extends HTMLElement {
  #heroCarouslImg = {
    0: "./Images/black_girl_magic-11.jpg",
    1: "./Images/blackswimsuitmodels.jpg",
    2: "./Images/black-model-beige-background.jpg",
  };
  #transitioning = false;
  #heroCarouselDots;
  #currentSlide;
  #nextSlide;
  #lastDotClicked = null;
  #carousel;

  constructor() {
    super();
    this.attachShadow({ mode: `open` });
  }

  #selectDot(dot) {
    dot.classList.add(`active`);
    if (this.#lastDotClicked !== null && this.#lastDotClicked !== dot) {
      this.#lastDotClicked.classList.remove(`active`);
    }
    this.#lastDotClicked = dot;
  }
  #transitionSlide(currentSlide, nextSlide) {
    transitioning = true;
    currentSlide.classList.remove("current");
    nextSlide.classList.add("current");

    return new Promise((resolve) => {
      setTimeout(() => {
        currentSlide.style.transition = "none";
        nextSlide.style.transition = "none";
        currentSlide.style.backgroundImage = nextSlide.style.backgroundImage;
        nextSlide.classList.remove("current");
        currentSlide.classList.add("current");
        this.#forceReflow(currentSlide);
        currentSlide.style.transition = "";
        nextSlide.style.transition = "";

        resolve();
      }, 1000);
    });
  }

  #initializeCarousel() {
    let carouslLength = Object.entries(this.#heroCarouslImg).length;
    let randomNumber = Math.floor(Math.random() * carouslLength);
    this.#selectDot(this.#heroCarouselDots[randomNumber]);
    this.#currentSlide.style.backgroundImage = `url(${
      this.#heroCarouslImg[randomNumber]
    })`;
  }

  #forceReflow(element) {
    void element.offsetHeight;
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
    <style>
      
      .carousel{
        height: 51.5rem;
        width: 100%;
        position: relative;
      }

      .slide {
        height:51.5rem;
        width:100%;
        background-image: url("./Images/black_girl_magic-11.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 10% 20%;
        position: absolute;
        transition: opacity ease-in-out 1s;
        opacity: 0;
      }

      .current {
        opacity: 1;
      }

      .carousel-text {
        color: #f4f0eb;
        font-size: x-large;
        position: absolute;
        left: 33%;
        top: 30%;
        font-size: 100px;
        text-align: center;
        width: 40%;
      }

      .dot {
        height: 0.5rem;
        width: 0.5rem;
        background-color: #797673;
        border-radius: 50%;
        cursor: pointer;
      }

      .dot-container {
        display: inline-flex;
        gap: 0.9rem;
        position: absolute;
        top: 94%;
        left: 90%;
      }

      .active{
        background-color: #ffffff;
      }

    </style>

    <div class="carousel">
      <div class="slide current"></div>
      <div class="slide next"></div>
      <div id="hero-text">
        <div class="carousel-text">NEW ARRIVALS</div>
      </div>

      <div class="carousel-dots">
        <div class="dot-container">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    </div>`;
    this.#heroCarouselDots = this.shadowRoot.querySelectorAll(".dot");
    this.#carousel = this.shadowRoot.querySelector(".carousel");
    this.#currentSlide = this.shadowRoot.querySelector(".current.slide");
    this.#nextSlide = this.shadowRoot.querySelector(".next.slide");
    this.#initializeCarousel();

    this.#heroCarouselDots.forEach((dot, index) => {
      dot.addEventListener(`click`, () => {
        if (this.#transitioning) return;
        if (this.#lastDotClicked === dot) return;
        this.#selectDot(dot);
        this.#nextSlide.style.backgroundImage = `url(${
          this.#heroCarouslImg[index]
        })`;
        this.#transitionSlide(this.#currentSlide, this.#nextSlide).then(() => {
          this.#transitioning = false;
        });
      });
    });
  }
}

customElements.define("shop-carousel", ShopCarousel);

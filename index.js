heroCarouslImg = {
  0: "./Images/black_girl_magic-11.jpg",
  1: "./Images/blackswimsuitmodels.jpg",
  2: "./Images/black-model-beige-background.jpg",
};

transitioning = false;
heroCarouselDots = document.querySelectorAll(".dot"); //array of dots
currentSlide = document.querySelector(".slide.current");
nextSlide = document.querySelector(".slide.next");
lastDotClicked = null;
initializeCarousel();

heroCarouselDots.forEach((dot, index) => {
  dot.addEventListener(`click`, () => {
    if (transitioning) return;
    if (lastDotClicked == dot) return;
    selectDot(dot);
    nextSlide.style.backgroundImage = `url(${heroCarouslImg[index]})`;
    transitionSlide(currentSlide, nextSlide).then(() => {
      transitioning = false;
    });
  });
});

function selectDot(dot) {
  dot.classList.add(`active`);
  if (lastDotClicked !== null && lastDotClicked !== dot) {
    lastDotClicked.classList.remove(`active`);
  }
  lastDotClicked = dot;
}

function updateImage(index) {
  document.querySelector(
    `.current`
  ).style.backgroundImage = `url(${heroCarouslImg[index]})`;
}

function initializeCarousel() {
  randomNumber = (function () {
    carouslLength = Object.keys(heroCarouslImg).length;
    return Math.floor(Math.floor(Math.random() * carouslLength));
  })();
  lastDotClicked;
  selectDot(heroCarouselDots[randomNumber]);
  updateImage(randomNumber);
}

function transitionSlide(currentSlide, nextSlide) {
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
      forceReflow(currentSlide);
      currentSlide.style.transition = "";
      nextSlide.style.transition = "";

      resolve();
    }, 1000);
  });
}

function forceReflow(element) {
  void element.offsetHeight;
}

async function heroCarouselLoop() {
  index++;
  while (true) {
    await timer(5000);
    //increment the index and assign the next slide variable to the next dot
    nextSlide.style.backgroundImage = `url(${heroCarouslImg[index]})`;
    transitionSlide(currentSlide, nextSlide).then(() => {
      transitioning = false;
    });
  }
}

function timer(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}

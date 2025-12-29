class ShopDropDown extends HTMLElement {
  #instantiateDelayModifiers(segments) {
    segments.forEach((segment, index) => {
      segment.style.setProperty(`--delayModifier`, index);
    });
  }

  #instantiateDurationModifiers(segments) {
    segments.forEach((segment, index) => {
      segment.style.setProperty(`--durationModifier`, index + 1);
    });
  }
  constructor() {
    super();
    this.attachShadow({ mode: `open` });
  }
  connectedCallback() {
    const segments = document.querySelectorAll(".segmentedDropDown li");
    this.#instantiateDelayModifiers(segments);
    this.#instantiateDurationModifiers(segments);
  }
}

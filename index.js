// when shop list item is hovered
// append drop down inside list item
// append drop down as a child to the list item
// assign the opaque class to the drop down
// when transitionend event is fired, set pointer-events to none
// and remove the drop down element from the list item

// POTENTIAL CONCERNS
// adding numerous event listeners.
// I want the user to be able to hover on the drop down and keep it
// even when it's fading. So will having the same event fired be an issue?

class ShopDropDownService extends HTMLElement {
  #menuItems;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // Helper: add a class to all direct children of an element
  #addClassToChildren(parent, className) {
    if (!(parent instanceof HTMLElement)) return;
    Array.from(parent.children).forEach((child) =>
      child.classList.add(className)
    );
  }

  // Helper: remove a class from all direct children of an element
  #removeClassFromChildren(parent, className) {
    if (!(parent instanceof HTMLElement)) return;
    Array.from(parent.children).forEach((child) =>
      child.classList.remove(className)
    );
    // safety: also remove from deeper descendants in case it was applied there
    parent
      .querySelectorAll(`.${className}`)
      .forEach((el) => el.classList.remove(className));
  }

  // Initialize transition CSS on segmented dropdown children
  #initializeChildrenCss(children) {
    Array.from(children).forEach((child, index) => {
      child.style.setProperty("--rTiming", `${index + 1}s`);
      child.style.setProperty("--oTiming", `${index + 1}s`);
    });
  }

  // Segment open/close helpers
  #openSegmented(parent) {
    this.#removeClassFromChildren(parent, "fastSegmentedClose");
    this.#addClassToChildren(parent, "flipDown");
  }

  #closeSegmented(parent) {
    this.#addClassToChildren(parent, "fastSegmentedClose");
    this.#removeClassFromChildren(parent, "flipDown");
  }

  connectedCallback() {
    this.#menuItems = document.querySelectorAll(".primary.menu-item");

    this.#menuItems.forEach((menuItem) => {
      const menuDropDown = menuItem.children[1]; // the potential dropdown container
      const hasDropDown = menuDropDown instanceof HTMLElement;
      const isSegmented =
        hasDropDown && menuDropDown.classList.contains("segmented");
      let fastSegmentAdded = false;

      if (hasDropDown) {
        menuDropDown.inert = true;
        // if segmented initialize per-child timing vars
        if (isSegmented) {
          this.#initializeChildrenCss(menuDropDown.children);
          console.log(`${menuDropDown}\n`, menuDropDown.children);
          console.log("WE INITIALIZED THE VARIABLES");
          // start closed with the fast close class so transitions are consistent
          this.#addClassToChildren(menuDropDown, "fastSegmentedClose");
        }
      }

      let transitionDirection = 0;

      menuItem.addEventListener("pointerenter", () => {
        // set direction early so segmented checks don't override it
        transitionDirection = 1;

        if (isSegmented && hasDropDown) {
          // open segmented: remove the fast close and add flipDown
          this.#removeClassFromChildren(menuDropDown, "fastSegmentedClose");
          this.#addClassToChildren(menuDropDown, "flipDown");
          menuItem.classList.add("menuHovered");
          return;
        }

        menuItem.classList.add("menuHovered");
        if (hasDropDown) menuDropDown.classList.add("visible");
      });

      menuItem.addEventListener("pointerleave", () => {
        transitionDirection = -1;

        if (isSegmented && hasDropDown) {
          // close segmented: add fast close and remove flipDown
          this.#addClassToChildren(menuDropDown, "fastSegmentedClose");
          fastSegmentAdded = true;
          this.#removeClassFromChildren(menuDropDown, "flipDown");
          menuItem.classList.remove("menuHovered");
          return;
        }

        menuItem.classList.remove("menuHovered");
        if (hasDropDown) menuDropDown.classList.remove("visible");
      });

      if (hasDropDown) {
        menuDropDown.addEventListener("transitionend", () => {
          if (transitionDirection === 1) {
            menuDropDown.style.pointerEvents = "auto";
            console.log("pointer events on");
            menuDropDown.inert = false;
            return;
          }
          menuDropDown.inert = true;
          menuDropDown.style.pointerEvents = "none";
        });
      }
    });
  }
}

customElements.define("shop-drop-down-service", ShopDropDownService);

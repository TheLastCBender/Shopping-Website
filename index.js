// when shop list item is hovered
// append drop down insisde list item
// append drop down to as a child to the list item
// assign the opaque class to the drop down
// when transitionend even is fired, set pointer-events to none
//and remove the drop down element from the list item

//POTENTIAL CONCERNS
// adding numerous event listeners.
// I want the user to be able to hover on the drop down and keep it
// even when it's fading. So will having the same event fired be an issue?

class ShopDropDownService extends HTMLElement {
  #menuItems; //node list of menu items
  #transitionDirection;
  #menuDropDowns; //their dropdowns
  constructor() {
    super();
    this.attachShadow({ mode: `open` });
  }

  #speedUpTransition(children) {
    Array.from(children).forEach((child) => {
      child.style.setProperty("--rTiming", `${0.1}s`);
      child.style.setProperty("--oTiming", `${0.1}s`);
    });
  }

  #fastSegmentClose(children) {
    Array.from(children).forEach((child, index) => {
      child.style.transition = `transform 0s ease-in-out, opacity 0.5s ease-in-out`;
      child.style.transform = `rotateX(0deg)`;
    });
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
    Array.from(parent.children).forEach((child) =>
      child.classList.remove(className)
    );
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
    this.#menuDropDowns = document.querySelectorAll(".primary.menu-item");
    this.#menuItems.forEach((menuItem, index) => {
      const menuDropDown = menuItem.children[1];
      const hasDropDown = menuDropDown instanceof HTMLElement;
      const isSegmented =
        hasDropDown && menuDropDown.classList.contains("segmented");
      console.log(`isSegmented:${isSegmented}\n hasDropDown:${hasDropDown}`);
      if (hasDropDown) {
        menuDropDown.inert = true;
        if (isSegmented) {
          this.#initializeChildrenCss(menuDropDown.children);
          console.log(`${menuDropDown}/n${menuDropDown.children}`);
          console.log("WE INITIALIZED THE VARIABLES");
        }
      }

      let transitionDirection = 0;

      menuItem.addEventListener("pointerenter", (e) => {
        // set direction early so segmented checks don't override it
        transitionDirection = 1;

        if (isSegmented) {
          this.#addClassToChildren(menuDropDown.children, "flipDown");
          this.#initializeChildrenCss(menuDropDown.children);
          console.log("line 95");

          menuItem.classList.add(`menuHovered`);
          this.#addClassToChildren(menuDropDown, `flipDown`);
          return;
        }

        menuItem.classList.add(`menuHovered`);
        if (hasDropDown) menuDropDown.classList.add(`visible`);
      });

      menuItem.addEventListener("pointerleave", (e) => {
        transitionDirection = -1;

        if (isSegmented) {
          this.#speedUpTransition(menuDropDown.children);
          this.#removeClassFromChildren(menuDropDown, "flipDown");
          menuItem.classList.remove(`menuHovered`);
          return;
        }

        menuItem.classList.remove(`menuHovered`);
        if (hasDropDown) menuDropDown.classList.remove(`visible`);
      });

      if (hasDropDown) {
        menuDropDown.addEventListener("transitionend", (e) => {
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

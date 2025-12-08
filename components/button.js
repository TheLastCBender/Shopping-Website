class shopButton extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: `open` });
  }
  #backgroundColorMap = {
    black: "#333333",
    beige: "#f4f0eb",
  };

  #textColorMap = {
    black: "#f4f0eb",
    beige: "#333333",
  };
  connectedCallback() {
    const colorAttribute = this.getAttribute("color") || "black";

    const black = "#333333";
    const beige = "#f4f0eb";

    const height = this.getAttribute("height") || "3rem";
    const width = this.getAttribute("width") || "15rem";
    const label = this.getAttribute("label") || "Button";
    const letterSpacing = this.getAttribute("letter-spacing") || "0.1rem";
    const padding = this.getAttribute("padding") || "0.5rem 1rem";
    const bgColor =
      this.#backgroundColorMap[colorAttribute] ||
      this.#backgroundColorMap["black"];
    this.shadowRoot.innerHTML = `
    <style>
        button {
          font-size: 0.9rem;
          border: 1px solid ${bgColor};
          background:transparent;
          appearance: none;
          font-family: Arial, Helvetica, sans-serif;
          color: ${
            this.#textColorMap[colorAttribute] || this.#textColorMap["black"]
          };
          letter-spacing: ${letterSpacing};
          cursor: pointer;
          width: ${width};
          height: ${height};
          margin: 0;
          padding: 0;
          transition:color 0.4s cubic-bezier(.785,.135,.15,.86);
          position:relative;
        }

        button::after 
        {
            content: "";
          position: absolute;
          height: 100%;
          width: 100%;
          left: 0;
          top: 0;
          background-color:${bgColor};
          transition: width 0.4s cubic-bezier(.785,.135,.15,.86);
          z-index: -1;
        }

        button:hover::after {
            width: 0;
        }

        button:hover {
            color:${bgColor};
        }
    </style>
      <button color="#333333">${label}</button>
    `;
  }
}

customElements.define(`shop-button`, shopButton);

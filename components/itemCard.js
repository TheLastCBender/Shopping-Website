class shopItemCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: `open` });
  }
  connectedCallback() {
    const itemName = this.getAttribute("name") || "RAYE SUNGLASSES (PRE-ORDER)";
    const itemPrice = this.getAttribute("price") || "From $159.00 USD";
    const itemUrl =
      this.getAttribute("url") || "./Images/black_girl_magic-11.jpg";
    this.shadowRoot.innerHTML = `
        
        <style>

        
           
            
            button{
            appearance: none;
            border: none;
            background: transparent;
            display:inline-flex;
            flex-direction:column;
            gap:10px;
            padding:0;
            cursor: pointer;}
            
            button img {
            height: 37rem;
            width: 24rem;
            object-fit:cover;
            }

            button>div{
            display:flex;
            flex-direction: column;
            gap:0.7rem;
            align-items: flex-start;
            }

            button::after {
                content: "";
                background-color: #333333;
                position: absolute;
                width: 24rem;
                height: 37rem;
                opacity: 0;
                transition: opacity ease-in-out 0.5s;
            }

            button:hover::after {
                opacity: 0.5;
            }
            
            .item-name {
                font-family: "Lato", sans-serif;
                font-weight: 400;
                font-style: normal;
                font-size: 1rem;
                
            }

            .item-price {
                font-family: "Lato", sans-serif;
                font-weight: 300;
                font-size: 0.9rem;
            }

        </style>

        <button>
            <img
                src=${itemUrl}
                alt="black girld in a photo"
            />
            <div>
                <div class="item-name">${itemName}</div>
                <div class="item-price">${itemPrice}</div>
            </div>
        </button>
        `;
  }
}

customElements.define(`shop-item-card`, shopItemCard);

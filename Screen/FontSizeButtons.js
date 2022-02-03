class FontSizeButtons extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = "<button>-</button><input type='text'/><button>+</button>"
    }
}

customElements.define('font-size-buttons', FontSizeButtons);
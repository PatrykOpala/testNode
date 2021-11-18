class Screen{
    #root = null;
    #fragments = [];
    #select_Fragment = 0;
    constructor(rootElement) {
        this.#root = document.querySelector(rootElement);
    }

    buildFragment(selector, id, styles) {
        let frag = document.createElement(selector);
        frag.id = id;
        frag.style.width = styles.width;
        frag.style.minHeight = styles.minHeight;
        frag.style.backgroundColor = styles.bgColor;
        frag.style.border = styles.borderS;
        this.#fragments.push(frag);
        this.#root.appendChild(frag);
    }

    addFragment(selector, id, styles) {
        let frag = document.createElement(selector);
        frag.id = id;
        frag.style.width = styles.width;
        frag.style.minHeight = styles.minHeight;
        frag.style.backgroundColor = styles.bgColor;
        frag.style.border = styles.borderS;
        this.#fragments.push(frag);
    }

    next() {
        
    }

}
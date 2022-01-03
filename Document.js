class Documentt{
    #background = null;
    body = [];

    constructor(documentDOM) {
        this.#background = documentDOM?.querySelector("background")?.getAttribute("w:color");
    }
    
    getElement() {
        return this.body;
    }

    addElement(elem) {
        this.body.push(elem);
    }
}

module.exports = Documentt
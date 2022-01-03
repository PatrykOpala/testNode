class Paragraph{
    #pPr = {
        pStyle: null,
        rPr: {
            sz: null,
            szCs: null
        }
    };
    #runs = [];
    constructor(paragraph) {
        this.#pPr.pStyle = paragraph.querySelector('pPr').querySelector('pStyle')?.getAttribute("w:val")
        this.#pPr.rPr.sz = Number.parseInt(paragraph.querySelector('pPr')?.querySelector('rPr')?.querySelector('sz')?.getAttribute("w:val")) || null
        this.#pPr.rPr.szCs = Number.parseInt(paragraph.querySelector('pPr')?.querySelector('rPr')?.querySelector('szCs')?.getAttribute("w:val")) || null
    }

    getRuns() {
        return this.#runs;
    }

    addRun(r) {this.#runs.push(r);}

    addValue(key, value) {
        let keyy = this.#runs.filter(k => k.getOldValue() === key);
        keyy[0].addValues(value);
        console.log(keyy[0].getNewValues());
    }
}

module.exports = Paragraph
class Run{
    #rPr = {
        fontSize: null,
        bold: null,
        italic: null,
        strike: null,
        underline: null
    };
    #oldValues = null;
    #newValues = [];
    constructor(run) {
        this.#rPr.fontSize = Number.parseInt(run?.querySelector("rPr")?.querySelector("sz")?.getAttribute("w:val")) || Number.parseInt(run?.querySelector("rPr")?.querySelector("szCs")?.getAttribute("w:val"))
        this.#rPr.bold = run?.querySelector("rPr")?.querySelector("b") || run?.querySelector("rPr")?.querySelector("bCs") ? true : false
        this.#rPr.italic = run?.querySelector("rPr")?.querySelector("i") || run?.querySelector("rPr")?.querySelector("iCs") ? true : false
        this.#rPr.strike = run?.querySelector("rPr")?.querySelector("strike") || run?.querySelector("rPr")?.querySelector("dstrike") ? true : false
        this.#rPr.underline = run?.querySelector("rPr")?.querySelector("u") ? true : false
        
        if (run?.querySelectorAll("t").length > 1) {
            let tt = []
            run?.querySelectorAll("t")?.forEach(t => {
            
                tt.push(t.textContent)

            });
            this.#oldValues = tt;
        } else {
            this.#oldValues = run?.querySelector('t')?.textContent;
        }
        
    }

    getNewValues() { return this.#newValues;}

    getOldValue() {return this.#oldValues;}

    addValues(val) {this.#newValues.push(val) }
}

module.exports = Run
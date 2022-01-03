
let PER_PT = 12700, file_system = require('fs');
let pars = new DOMParser();
let body = [];


class Run {
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

    getNewValues() { return this.#newValues; }

    getOldValue() { return this.#oldValues; }

    addValues(val) { this.#newValues.push(val) }
}

class Table {
    #tblPr = {
        tblW: {
            width: null,
            type: null
        },
        jc: null,
        tblInd: {
            width: null,
            type: null
        },
        tblLayout: {
            type: null
        },
        tblCellMar: {
            top: {
                width: null,
                type: null
            },
            left: {
                width: null,
                type: null
            },
            bottom: {
                width: null,
                type: null
            },
            right: {
                width: null,
                type: null
            }
        }
    };
    #tblGrid = {
        gridCols: []
    };
    #tbr = [];

    constructor(table) {

        this.#tblPr.tblW.width = table.querySelector('tblPr').querySelector('tblW').getAttribute('w:w');
        this.#tblPr.tblW.type = table.querySelector('tblPr').querySelector('tblW').getAttribute('w:type') === 'dxa' ? "DXA" : "null";

        this.#tblPr.jc = table.querySelector('tblPr').querySelector('jc').getAttribute('w:val');

        this.#tblPr.tblInd.width = table.querySelector('tblPr').querySelector('tblInd').getAttribute('w:w');
        this.#tblPr.tblInd.type = table.querySelector('tblPr').querySelector('tblInd').getAttribute('w:type') === 'dxa' ? "DXA" : "null";

        this.#tblPr.tblLayout.type = table.querySelector('tblPr').querySelector('tblLayout').getAttribute('w:type') || "null";

        this.#tblPr.tblCellMar.top.width = table?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('top')?.getAttribute('w:w');
        this.#tblPr.tblCellMar.top.type = table?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('top')?.getAttribute('w:type') === 'dxa' ? "DXA" : "null";

        this.#tblPr.tblCellMar.left.width = table?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('left')?.getAttribute('w:w');
        this.#tblPr.tblCellMar.left.type = table?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('left')?.getAttribute('w:type') === 'dxa' ? "DXA" : "null";

        this.#tblPr.tblCellMar.bottom.width = table?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('bottom')?.getAttribute('w:w');
        this.#tblPr.tblCellMar.bottom.type = table?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('bottom')?.getAttribute('w:type') === 'dxa' ? "DXA" : "null";

        this.#tblPr.tblCellMar.right.width = table?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('right')?.getAttribute('w:w');
        this.#tblPr.tblCellMar.right.type = table?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('right')?.getAttribute('w:type') === 'dxa' ? "DXA" : "null";

        this.addGrid(table);
    }

    addGrid(tblInss) {
        tblInss?.querySelector('tblGrid').childNodes.forEach(tblC => {
            let gridCol = {
                width: Number.parseInt(tblC.getAttribute('w:w'))
            };
            this.#tblGrid.gridCols.push(gridCol);
        })
        const tableRowCount = tblInss?.querySelectorAll('tr').length;
        if (tableRowCount > 0) {
            tblInss?.querySelectorAll('tr').forEach(trr => {
                this.addTableRow(trr);
            })
        }
    }

    addTableRow(tr) {
        let tableRow = new TableRow(tr);
        this.#tbr.push(tableRow);
    }
}

class TableRow {
    #trPr = null;
    #tcols = [];

    constructor(tbr) {
        this.#trPr = tbr?.querySelector('trPr') || null;
        this.addTableColumn(tbr?.querySelector('tc'))
    }

    addTableColumn(tblC) {
        if (tblC !== null) {
            let tc = {
                tcPr: {
                    tcW: {
                        width: Number.parseInt(tblC?.querySelector('tcPr')?.querySelector('tcW')?.getAttribute('w:w')),
                        type: tblC?.querySelector('tcPr')?.querySelector('tcW')?.getAttribute('w:type')
                    },
                    tcBorders: {
                        top: {
                            val: tblC?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('top')?.getAttribute('w:val'),
                            sz: Number.parseInt(tblC?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('top')?.getAttribute('w:sz')),
                            space: Number.parseInt(tblC?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('top')?.getAttribute('w:space')),
                            color: tblC?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('top')?.getAttribute('w:color')
                        },
                        left: {
                            val: tblC?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('left')?.getAttribute('w:val'),
                            sz: Number.parseInt(tblC?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('left')?.getAttribute('w:sz')),
                            space: Number.parseInt(tblC?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('left')?.getAttribute('w:space')),
                            color: tblC?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('left')?.getAttribute('w:color')
                        },
                        bottom: {
                            val: tblC?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('bottom')?.getAttribute('w:val'),
                            sz: Number.parseInt(tblC?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('bottom')?.getAttribute('w:sz')),
                            space: Number.parseInt(tblC?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('bottom')?.getAttribute('w:space')),
                            color: tblC?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('bottom')?.getAttribute('w:color')
                        },
                    }
                },
                p: []
            }

            tblC?.querySelectorAll('p').forEach(p => {
                let TableColumnParagraph = new Paragraph(p)
                tc.p.push(TableColumnParagraph);
            });

            this.#tcols.push(tc);
        }

    }
}

class Documentt {
    #background = null;
    constructor(documentDOM) {
        this.#background = documentDOM?.querySelector("background")?.getAttribute("w:color");
    }

    getElement() {
        return body;
    }

    addElement(elem) {
        body.push(elem);
    }
}


function start(fPath, copyCount, fileName) {
    // console.log(copyCount);

    file_system.readFile(`${fileName}/word/document.xml`, paraf);
    // createEditor(copyCount);

    // for (en in body) {
    //     console.log(en);
    // }

    console.log(body);

    function paraf(data) {
        let mlDom = pars.parseFromString(data, 'application/xml');
        mlDom.querySelector("body")?.childNodes.forEach(el => {
            if (el.localName === 'p') {
                const paragraph = document.createElement("div");
                paragraph.style.display = "flex";
                paragraph.style.flexDirection = "row";
                paragraph.style.maxWidth = `${pCC.offsetWidth}px`;
                paragraph.style.alignItems = "center";



                let parag = {
                    pPr: {
                        pStyle: el.querySelector('pPr').querySelector('pStyle')?.getAttribute("w:val"),
                        rPr: {
                            sz: Number.parseInt(el.querySelector('pPr')?.querySelector('rPr')?.querySelector('sz')?.getAttribute("w:val")) || null,
                            szCs: Number.parseInt(el.querySelector('pPr')?.querySelector('rPr')?.querySelector('szCs')?.getAttribute("w:val")) || null
                        }
                    },
                    runs: []
                }
                el.childNodes.forEach(l => {
                    if (l.localName === 'r') {

                        const runn = {
                            rPr: {
                                fontSize: Number.parseInt(l?.querySelector("rPr")?.querySelector("sz")?.getAttribute("w:val")) || Number.parseInt(l?.querySelector("rPr")?.querySelector("szCs")?.getAttribute("w:val")),
                                bold: l?.querySelector("rPr")?.querySelector("b") || l?.querySelector("rPr")?.querySelector("bCs") ? true : false,
                                italic: l?.querySelector("rPr")?.querySelector("i") || l?.querySelector("rPr")?.querySelector("iCs") ? true : false,
                                strike: l?.querySelector("rPr")?.querySelector("strike") || l?.querySelector("rPr")?.querySelector("dstrike") ? true : false,
                                underline: l?.querySelector("rPr")?.querySelector("u") ? true : false
                            },
                            oldValues: [],
                        }

                        let fontSize = Number.parseInt(l?.querySelector("rPr")?.querySelector("sz")?.getAttribute("w:val")) || Number.parseInt(l?.querySelector("rPr")?.querySelector("szCs")?.getAttribute("w:val"));
                        let bold = l?.querySelector("rPr")?.querySelector("b") || l?.querySelector("rPr")?.querySelector("bCs") ? true : false;
                        let italic = l?.querySelector("rPr")?.querySelector("i") || l?.querySelector("rPr")?.querySelector("iCs") ? true : false;
                        let strike = l?.querySelector("rPr")?.querySelector("strike") || l?.querySelector("rPr")?.querySelector("dstrike") ? true : false;
                        let underline = l?.querySelector("rPr")?.querySelector("u") ? true : false;

                        let oldValues = [];
                        if (l?.querySelectorAll("t").length > 1) {
                            l?.querySelectorAll("t")?.forEach(t => {
                                oldValues.push(t.textContent)
                                runn.oldValues.push(t.textContent);
                            });
                        } else {
                            oldValues = l?.querySelector('t')?.textContent;
                            runn.oldValues.push(l?.querySelector('t')?.textContent);
                        }
                        parag.runs.push(runn);

                    }
                });
                cC.append(paragraph);
            } else if (el.localName === 'tbl') {
                // let tablee = new Table(el);

                // body.push(tablee);
            }

        });
    }

    function createRow(l) {
        const run = document.createElement("pre");
        run.contentEditable = true;
        run.style.display = "inline";

        if (l?.querySelector("rPr")?.querySelector("rFonts")) {
            run.style.fontFamily = l?.querySelector("rPr")?.querySelector("rFonts").getAttribute("w:ascii") ||
                l?.querySelector("rPr")?.querySelector("rFonts").getAttribute("w:hAnsi");
        }

        run.style.color = `#${l?.querySelector("rPr")?.querySelector("color")?.getAttribute("w:val")}`;
        if (l?.querySelector("rPr")?.querySelector("b") || l?.querySelector("rPr")?.querySelector("bCs")) {
            run.style.fontWeight = "600";
        }
        if (l?.querySelector("rPr")?.querySelector("i") || l?.querySelector("rPr")?.querySelector("iCs")) {
            run.style.fontStyle = "italic";
        }
        if (l?.querySelector("rPr")?.querySelector("strike") || l?.querySelector("rPr")?.querySelector("dstrike")
            && l?.querySelector("rPr")?.querySelector("u")?.getAttribute("w:val")) {
            run.style.textDecoration = "underline line-through";

        } else if (l?.querySelector("rPr")?.querySelector("u")?.getAttribute("w:val")) {
            run.style.textDecoration = "underline";
        } else if (l?.querySelector("rPr")?.querySelector("strike") || l?.querySelector("rPr")?.querySelector("dstrike")) {
            run.style.textDecoration = "line-through";
        }
        if (l?.querySelector("rPr")?.querySelector("sz")?.getAttribute("w:val") == 22 || l?.querySelector("rPr")?.querySelector("szCs")?.getAttribute("w:val") == 22) {
            run.style.fontSize = "14px";
        } else if (l?.querySelector("rPr")?.querySelector("sz")?.getAttribute("w:val") == 48) {
            run.style.fontSize = "33px";
        }
        run.textContent = l?.querySelector("t")?.textContent;

        if (l?.querySelector("t")?.textContent.endsWith(" ")) {
            run.setAttribute('edit-id', l?.querySelector("t")?.textContent.replace(' ', '%32'));
        }
        run.setAttribute('edit-id', l?.querySelector("t")?.textContent);

        run.addEventListener("click", (e) => {
            e.target.classList.toggle("kpaction");

            // document.querySelector("#ToolBar").querySelector("#sec") = e.target.fontFamily;
        })
        run.addEventListener("focusout", (e) => {
            if (e.target.classList.value == "kpaction") {
                e.target.classList.toggle("kpaction")
            }
        })
        run.addEventListener("input", (e) => {
            e.target.style.border = "1px solid #333333";
            // parag.addValue(e.target.getAttribute("edit-id"), e.target.textContent);
        })

        return run;
    }

    function createEditor(cC) {


        // const table = document.createElement("table");
        // const tableBody = document.createElement("tbody");
        // el?.childNodes.forEach(tr => {
        //     if (tr.localName === 'tr') {
        //         let tableRow = document.createElement("tr");
        //         tr.childNodes.forEach(tc => {
        //             if (tc.localName === 'tc') {
        //                 // console.log(tableRow)
        //                 let tabEdit = document.createElement("td");
        //                 tabEdit.style.border = "1px solid #222222";
        //                 tc.childNodes.forEach(p => {
        //                     if (p.localName === 'p') {
        //                         const paragraph = document.createElement("div");
        //                         paragraph.style.display = "flex";
        //                         paragraph.style.flexDirection = "row";
        //                         p.childNodes.forEach(pr => {
        //                             if (pr.localName === "r") {
        //                                 const run = document.createElement("pre");
        //                                 run.contentEditable = true;
        //                                 run.style.display = "inline";
        //                                 if (pr?.querySelector("rPr")?.querySelector("rFonts")) {
        //                                     run.style.fontFamily = pr?.querySelector("rPr")?.querySelector("rFonts").getAttribute("w:ascii") || 
        //                                     pr?.querySelector("rPr")?.querySelector("rFonts").getAttribute("w:hAnsi");
        //                                 }
        //                                 run.style.color = `#${pr?.querySelector("rPr")?.querySelector("color")?.getAttribute("w:val")}`;
        //                                 if (pr?.querySelector("rPr")?.querySelector("b") || pr?.querySelector("rPr")?.querySelector("bCs") ) {
        //                                     run.style.fontWeight = "600";
        //                                 }
        //                                 if (pr?.querySelector("rPr")?.querySelector("i") || pr?.querySelector("rPr")?.querySelector("iCs")) {
        //                                     run.style.fontStyle = "italic";
        //                                 }
        //                                 if (pr?.querySelector("rPr")?.querySelector("strike") || pr?.querySelector("rPr")?.querySelector("dstrike")
        //                                     && pr?.querySelector("rPr")?.querySelector("u")?.getAttribute("w:val")) {
        //                                     run.style.textDecoration = "underline line-through";

        //                                 }else if (pr?.querySelector("rPr")?.querySelector("u")?.getAttribute("w:val")) {
        //                                     run.style.textDecoration = "underline";
        //                                 } else if (pr?.querySelector("rPr")?.querySelector("strike") || pr?.querySelector("rPr")?.querySelector("dstrike")) {
        //                                     run.style.textDecoration = "line-through";
        //                                 }
        //                                 if (pr?.querySelector("rPr")?.querySelector("sz")?.getAttribute("w:val") == 22 || pr?.querySelector("rPr")?.querySelector("szCs")?.getAttribute("w:val") == 22) {
        //                                     run.style.fontSize = "14px";
        //                                 } else if (pr?.querySelector("rPr")?.querySelector("sz")?.getAttribute("w:val") == 48) {
        //                                     run.style.fontSize = "33px";
        //                                 }
        //                                 run.textContent = pr?.querySelector("t")?.textContent;
        //                                 run.addEventListener("click", (e) => {
        //                                     e.target.classList.toggle("kpaction");
        //                                 })
        //                                 run.addEventListener("focusout", (e) => {
        //                                     if (e.target.classList.value == "kpaction") {
        //                                         e.target.classList.toggle("kpaction")
        //                                     }
        //                                 })
        //                                 run.addEventListener("input", (e) => {
        //                                     e.target.style.border = "1px solid #333333";
        //                                 })
        //                                 paragraph.appendChild(run);
        //                             }
        //                             tabEdit.appendChild(paragraph);
        //                             }
        //                         )
        //                         tableRow.appendChild(tabEdit);
        //                     }
        //                 })

        //             }
        //         })
        //         tableBody.appendChild(tableRow);
        //     }
        // })
        // table.appendChild(tableBody);
        // pCC.appendChild(table);
    }
}


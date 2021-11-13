let decompress = require("decompress"), PER_PT = 12700, file_system = require("fs"), font_list = require("font-list");
function start(fPath, copyCount) {
    let CopyObj = {
        copyCount: copyCount,
        copyItem: []
    };
    const sec = document?.querySelector("#sec"), pCC = document?.querySelector("#pCC");
    const fontCon = document.createElement("div");
    sec?.addEventListener("change", (e) => { console.log(e.target.value); });
    function TableFonts() {
        // const fontsLe = ['Alef', 'Amiri', 'Amiri Quran', 'Arabic Typesetting', 'Arial', 'Arial Black', 'Arial Narrow',
        //     'Arial Unicode MS', 'Batang', 'Book Antiqua', 'Bookman Old Style', 'Bookshelf Symbol 7',
        //     'BOUTON International Symbols', 'Caladea', 'Calibri', 'Calibri Light', 'Californian FB',
        //     'Calisto MT', 'Cambria', 'Cambria Math', 'Candara', 'Carlito', 'Century', 'Century Gothic',
        //     'Century Schoolbook', 'Comic Sans MS', 'Consolas', 'Constantia', 'Corbel', 'Courier New',
        //     'David CLM', 'David Libre', 'DejaVu Math TeX Gyre', 'DejaVu Sans', 'DejaVu Sans Condensed',
        //     'DejaVu Sans Light', 'DejaVu Sans Mono', 'DejaVu Serif', 'DejaVu Serif Condensed', 'DokChampa',
        //     'Dotum', 'Dubai', 'Dubai Light', 'Dubai Medium', 'Ebrima', 'EmojiOne Color', 'Eras Medium ITC',
        //     'Frank Ruehl CLM', 'Frank Ruhl Hofshi', 'Franklin Gothic Book', 'Franklin Gothic Demi',
        //     'Franklin Gothic Demi Cond', 'Franklin Gothic Heavy', 'Franklin Gothic Medium',
        //     'Franklin Gothic Medium Cond', 'Gabriola', 'Gadugi', 'Garamond', 'Gautami', 'Georgia', 'Geotype TT',
        //     'Gill Sans MT', 'Gill Sans MT Condensed', 'Gill Sans MT Ext Condensed Bold', 'Gill Sans Ultra Bold',
        //     'Gill Sans Ultra Bold Condensed', 'Gisha', 'Gulim', 'Gungsuh', 'Haettenschweiler', 'Haxton Logos TT',
        //     'HP Simplified', 'HP Simplified Light', 'Impact', 'Liberation Mono', 'Liberation Serif',
        //     'Linux Biolinum G', 'Linux Libertine Display G', 'Linux Libertine G', 'Lucida Bright', 'Lucida Console',
        //     'Lucida Sans Unicode', 'Rockwell', 'Verdana']
      
        font_list.getFonts({ disableQuoting: true }).then(f => {
            T = f
        });
    }

    document.querySelector("#ToolBar").addEventListener('click', (e) => {
        if (e.target.id === 'bol') {
            pCC?.querySelector(".kpaction")?.classList.toggle("bol")
        } else if (e.target.id === 'k') {
            pCC?.querySelector(".kpaction")?.classList.toggle("k")
        } else if (e.target.id === 'au') {
            pCC?.querySelector(".kpaction")?.classList.toggle("au")
        } else if (e.target.id === 'am') {
            pCC?.querySelector(".kpaction")?.classList.toggle("am")
        } else if (e.target.id === 'amm') {
            pCC?.querySelector(".kpaction")?.classList.toggle("aum")
        } else if (e.target.localName === "div" || e.target.localName === "span") {
            fontCon.style.width = `${e.target.offsetWidth + 56}px`;
            fontCon.style.height = "100px";
            fontCon.style.position = "absolute";
            fontCon.style.left = `${e.target.offsetWidth - 1}px`;
            fontCon.style.marginTop = `${e.target.offsetHeight + 18}px`;
            fontCon.style.backgroundColor = "#961";
            fontCon.style.zIndex = "40";
            fontCon.style.overflowY = "scroll";
            const cnb = document.createElement("span");
            cnb.id = "cnb";
            cnb.textContent = "Ładowanie czcionek";
            cnb.style.padding = "4px";
            cnb.style.marginTop = "3px";
            fontCon.appendChild(cnb);
            if (fontCon.offsetWidth === 0) {
                if (T !== null || T !== undefined) {
                    T.forEach(t => {
                        if (cnb?.localName) {
                            cnb.remove();
                        }
                        let v = document.createElement("div");
                        v.textContent = t;
                        v.style.padding = "4px";
                        v.style.marginTop = "3px";
                        v.style.cursor = "default";
                        v.addEventListener("mouseover", (e) => {
                            e.target.style.background = "#2aacb1";
                        });
                        v.addEventListener("mouseleave", (e) => {
                            e.target.style.background = "transparent";
                        });
                        fontCon.appendChild(v);
                    })
                }
                document.querySelector("#ToolBar").appendChild(fontCon);
            } else {
                fontCon.querySelectorAll("#cnb").forEach(c => {
                    c.remove();
                });
                fontCon.remove();
                
            }
        }
    });

    document.querySelector("#ToolBar").addEventListener('mouseover', (e) => {
        if (e.target.localName === "div" || e.target.localName === "span") {
            e.target.style.cursor = "pointer";
        }
    });

    class Document{
        #background = null;
        body = [];

        constructor(documentDOM) {
            this.#background = documentDOM?.querySelector("background").getAttribute("w:color");
        }

        addElement(elem) {
            this.body.push(elem);
        }
    }

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
            this.#pPr.pStyle = paragraph.querySelector('pPr').querySelector('pStyle').getAttribute("w:val")
            this.#pPr.rPr.sz = Number.parseInt(paragraph.querySelector('pPr')?.querySelector('rPr')?.querySelector('sz')?.getAttribute("w:val")) || null
            this.#pPr.rPr.szCs = Number.parseInt(paragraph.querySelector('pPr')?.querySelector('rPr')?.querySelector('szCs')?.getAttribute("w:val")) || null
        }

        addRun(r) {this.#runs.push(r);}

        addValue(key, value) {
            let keyy = this.#runs.filter(k => k.getOldValue() === key);
            keyy[0].addValues(value);
            console.log(keyy[0].getNewValues());
        }
    }

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

    class Table{
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

    class TableRow{
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

    function createRow(l) {
        const run = document.createElement("pre");
        run.contentEditable = true;
        run.style.display = "inline";

        if (l?.querySelector("rPr")?.querySelector("rFonts")) {
            run.style.fontFamily = l?.querySelector("rPr")?.querySelector("rFonts").getAttribute("w:ascii") || 
            l?.querySelector("rPr")?.querySelector("rFonts").getAttribute("w:hAnsi");
        }
        
        run.style.color = `#${l?.querySelector("rPr")?.querySelector("color")?.getAttribute("w:val")}`;
        if (l?.querySelector("rPr")?.querySelector("b") || l?.querySelector("rPr")?.querySelector("bCs") ) {
            run.style.fontWeight = "600";
        }
        if (l?.querySelector("rPr")?.querySelector("i") || l?.querySelector("rPr")?.querySelector("iCs")) {
            run.style.fontStyle = "italic";
        }
        if (l?.querySelector("rPr")?.querySelector("strike") || l?.querySelector("rPr")?.querySelector("dstrike")
            && l?.querySelector("rPr")?.querySelector("u")?.getAttribute("w:val")) {
            run.style.textDecoration = "underline line-through";
            
        }else if (l?.querySelector("rPr")?.querySelector("u")?.getAttribute("w:val")) {
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
            parag.addValue(e.target.getAttribute("edit-id"), e.target.textContent);
        })

        return run;
    }

    function paraf(err, data) {
        let pars = new DOMParser(),
        mlDom = pars.parseFromString(data, 'application/xml');
        de = mlDom.querySelector("body");
        let documentt = new Document(mlDom);
        de?.childNodes.forEach(el => {
            if (el.localName === 'p') {
                let parag = new Paragraph(el)
                const paragraph = document.createElement("div");
                paragraph.style.display = "flex";
                paragraph.style.flexDirection = "row";
                paragraph.style.maxWidth = `${pCC.offsetWidth}px`;
                paragraph.style.alignItems = "center";

                el.childNodes.forEach(l => {
                    if (l.localName === 'r') {
                        let runn = new Run(l);
                        parag.addRun(runn);
                        paragraph.appendChild(createRow(l));
                    }
                })
                documentt.addElement(parag);
                pCC.appendChild(paragraph);
            } else if (el.localName === 'tbl') {
                let tablee = new Table(el);
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
                documentt.addElement(tablee);
            }
        })
        if (err) console.log(err);
    }
    TableFonts()
    decompress(`${fPath.path}`, `docxs/${fPath.name}`).then(fl => {
        fl.forEach(l => {
            if (l.path == "word/document.xml") {
                file_system.readFile(`docxs/${fPath.name}/${l.path}`, paraf);
            }
        })
    })
}


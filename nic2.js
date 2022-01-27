let pars = new DOMParser();
// let body = [];
/*
const paragraph = document.createElement("div");
paragraph.style.display = "flex";
paragraph.style.flexDirection = "row";
paragraph.style.maxWidth = `${pCC.offsetWidth}px`;
paragraph.style.alignItems = "center";
*/

function start(path, data) {
    let Documentt = {
        fileName: path.name,
        body: []
    }
    let mlDom = pars.parseFromString(data, 'application/xml');
    mlDom.querySelector("body")?.childNodes.forEach(el => {
        if (el.localName === 'p') {
            let parag = {
                type: "Paragraph",
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
                    // console.log(l?.querySelector("rPr"));
                    const runn = {
                        type: "Run",
                        rPr: {
                            fontSize: Number.parseInt(l?.querySelector("rPr")?.querySelector("sz")?.getAttribute("w:val")) || Number.parseInt(l?.querySelector("rPr")?.querySelector("szCs")?.getAttribute("w:val")),
                            bold: l?.querySelector("rPr")?.querySelector("b") || l?.querySelector("rPr")?.querySelector("bCs") ? true : false,
                            italic: l?.querySelector("rPr")?.querySelector("i") || l?.querySelector("rPr")?.querySelector("iCs") ? true : false,
                            strike: l?.querySelector("rPr")?.querySelector("strike") || l?.querySelector("rPr")?.querySelector("dstrike") ? true : false,
                            underline: l?.querySelector("rPr")?.querySelector("u") ? true : false,
                            color: ""
                        },
                        oldValues: [] | ''
                    }
                    if (l?.querySelector("rPr")?.querySelector("color")?.getAttribute("w:val").startsWith("#")) {
                        runn.color = l?.querySelector("rPr")?.querySelector("color")?.getAttribute("w:val");
                    } else if (l?.querySelector("rPr")?.querySelector("color")?.getAttribute("w:val") === undefined || l?.querySelector("rPr")?.querySelector("color")?.getAttribute("w:val") === null) {
                        runn.color = "null";
                    } else {
                        runn.color = `#${l?.querySelector("rPr")?.querySelector("color")?.getAttribute("w:val")}`;
                    }
                    if (l?.querySelectorAll("t").length > 1) {
                        l?.querySelectorAll("t")?.forEach(t => {
                            runn.oldValues.push(t.textContent);
                        });
                    } else {
                        runn.oldValues = l?.querySelector('t')?.textContent;
                    }
                    parag.runs.push(runn);
                }
            });
            Documentt.body.push(parag);
        } else if (el.localName === 'tbl') {
            let tablee = {
                tblPr: {
                    tblW: {
                        width: el?.querySelector('tblPr').querySelector('tblW').getAttribute('w:w'),
                        type: el?.querySelector('tblPr').querySelector('tblW').getAttribute('w:type') === 'dxa' ? "DXA" : "null"
                    },
                    jc: el?.querySelector('tblPr').querySelector('jc').getAttribute('w:val'),
                    tblInd: {
                        width: el?.querySelector('tblPr').querySelector('tblInd').getAttribute('w:w'),
                        type: el?.querySelector('tblPr').querySelector('tblInd').getAttribute('w:type') === 'dxa' ? "DXA" : "null"
                    },
                    tblLayout: {
                        type: el?.querySelector('tblPr').querySelector('tblLayout').getAttribute('w:type') || "null"
                    },
                    tblCellMar: {
                        top: {
                            width: el?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('top')?.getAttribute('w:w'),
                            type: el?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('top')?.getAttribute('w:type') === 'dxa' ? "DXA" : "null"
                        },
                        left: {
                            width: el?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('left')?.getAttribute('w:w'),
                            type: el?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('left')?.getAttribute('w:type') === 'dxa' ? "DXA" : "null"
                        },
                        bottom: {
                            width: el?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('bottom')?.getAttribute('w:w'),
                            type: el?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('bottom')?.getAttribute('w:type') === 'dxa' ? "DXA" : "null"
                        },
                        right: {
                            width: el?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('right')?.getAttribute('w:w'),
                            type: el?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('right')?.getAttribute('w:type') === 'dxa' ? "DXA" : "null"
                        }
                    }
                },
                tblGrid: {
                    gridCols: []
                },
                tbr: [],
            }
            el?.querySelector('tblGrid').childNodes.forEach(tblC => {
                let gridCol = {
                    width: Number.parseInt(tblC.getAttribute('w:w'))
                };
                tablee.tblGrid.gridCols.push(gridCol);
            })

            if (el?.querySelectorAll('tr').length > 0) {
                el?.querySelectorAll('tr').forEach(trr => {
                    let tableRow = {
                        trPr: trr?.querySelector('trPr') || null,
                        tcols: [],
                    }
                    if (trr.querySelector('tc') !== null) {
                        let tc = {
                            tcPr: {
                                tcW: {
                                    width: Number.parseInt(trr?.querySelector('tcPr')?.querySelector('tcW')?.getAttribute('w:w')),
                                    type: trr?.querySelector('tcPr')?.querySelector('tcW')?.getAttribute('w:type')
                                },
                                tcBorders: {
                                    top: {
                                        val: trr?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('top')?.getAttribute('w:val'),
                                        sz: Number.parseInt(trr?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('top')?.getAttribute('w:sz')),
                                        space: Number.parseInt(trr?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('top')?.getAttribute('w:space')),
                                        color: trr?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('top')?.getAttribute('w:color')
                                    },
                                    left: {
                                        val: trr?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('left')?.getAttribute('w:val'),
                                        sz: Number.parseInt(trr?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('left')?.getAttribute('w:sz')),
                                        space: Number.parseInt(trr?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('left')?.getAttribute('w:space')),
                                        color: trr?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('left')?.getAttribute('w:color')
                                    },
                                    bottom: {
                                        val: trr?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('bottom')?.getAttribute('w:val'),
                                        sz: Number.parseInt(trr?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('bottom')?.getAttribute('w:sz')),
                                        space: Number.parseInt(trr?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('bottom')?.getAttribute('w:space')),
                                        color: trr?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('bottom')?.getAttribute('w:color')
                                    },
                                }
                            },
                            p: []
                        }
                        trr?.querySelectorAll('p').forEach(p => {
                            let TableColumnParagraph = {
                                type: "Paragraph",
                                pPr: {
                                    pStyle: p.querySelector('pPr').querySelector('pStyle')?.getAttribute("w:val"),
                                    rPr: {
                                        sz: Number.parseInt(p.querySelector('pPr')?.querySelector('rPr')?.querySelector('sz')?.getAttribute("w:val")) || null,
                                        szCs: Number.parseInt(p.querySelector('pPr')?.querySelector('rPr')?.querySelector('szCs')?.getAttribute("w:val")) || null
                                    }
                                },
                                runs: []
                            }
                            p.childNodes.forEach(r => {
                                if (r.localName === 'r') {
                                    const runn = {
                                        type: "Run",
                                        rPr: {
                                            fontSize: Number.parseInt(r?.querySelector("rPr")?.querySelector("sz")?.getAttribute("w:val")) || Number.parseInt(r?.querySelector("rPr")?.querySelector("szCs")?.getAttribute("w:val")),
                                            bold: r?.querySelector("rPr")?.querySelector("b") || r?.querySelector("rPr")?.querySelector("bCs") ? true : false,
                                            italic: r?.querySelector("rPr")?.querySelector("i") || r?.querySelector("rPr")?.querySelector("iCs") ? true : false,
                                            strike: r?.querySelector("rPr")?.querySelector("strike") || r?.querySelector("rPr")?.querySelector("dstrike") ? true : false,
                                            underline: r?.querySelector("rPr")?.querySelector("u") ? true : false,
                                            color: ""
                                        },
                                        oldValues: [] | ''
                                    }
                                    if (r?.querySelector("rPr")?.querySelector("color")?.getAttribute("w:val").startsWith("#")) {
                                        runn.color = r?.querySelector("rPr")?.querySelector("color")?.getAttribute("w:val");
                                    } else if (r?.querySelector("rPr")?.querySelector("color")?.getAttribute("w:val") === undefined || r?.querySelector("rPr")?.querySelector("color")?.getAttribute("w:val") === null) {
                                        runn.color = "null";
                                    } else {
                                        runn.color = `#${r?.querySelector("rPr")?.querySelector("color")?.getAttribute("w:val")}`;
                                    }
                                    if (r?.querySelectorAll("t").length > 1) {
                                        r?.querySelectorAll("t")?.forEach(t => {
                                            runn.oldValues.push(t.textContent);
                                        });
                                    } else {
                                        runn.oldValues = r?.querySelector('t')?.textContent;
                                    }
                                    TableColumnParagraph.runs.push(runn);
                                }
                            });
                            tc.p.push(TableColumnParagraph);
                        });
                        tableRow.tcols.push(tc);
                    }
                    tablee.tbr.push(tableRow);
                })
            }
            Documentt.body.push(tablee);
        }

    });
    // console.log(body);

    let documenttJSON = JSON.stringify(Documentt);

    mFile.fileSystem.writeFile(`${path.name}.json`, documenttJSON, (err) => {
        if (err) console.error(err);

    });

    return Documentt;

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


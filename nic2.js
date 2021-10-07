let decompress = require("decompress"), PER_PT = 12700, file_system = require("fs"), font_list = require("font-list");
function start(fPath, copyCount) {
    let CopyObj = {
        copyCount: copyCount,
        copyItem: []
    };
    const sec = document?.querySelector("#sec"), pCC = document?.querySelector("#pCC");
    const fontCon = document.createElement("div");
    let T = [];
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

    function paraf(err, data) {
        let pars = new DOMParser(),
        mlDom = pars.parseFromString(data, 'application/xml');
        console.log(mlDom)
        de = mlDom.querySelector("body");
        console.log(de)
        let documentt = {
            background: mlDom?.querySelector("background").getAttribute("w:color"),
            body: []
        };
        de?.childNodes.forEach(el => {
            if (el.localName === 'p') {
                // console.log(el);
                let parag = {
                    runs: []
                };
                const paragraph = document.createElement("div");
                paragraph.style.display = "flex";
                paragraph.style.flexDirection = "row";
                paragraph.style.maxWidth = `${pCC.offsetWidth}px`;
                paragraph.style.alignItems = "center";

                el.childNodes.forEach(l => {
                    if (l.localName === 'r') {
                        let runn = {
                            fontSize: l?.querySelector("rPr")?.querySelector("sz")?.getAttribute("w:val") || l?.querySelector("rPr")?.querySelector("szCs")?.getAttribute("w:val") || 0,
                            bold: l?.querySelector("rPr")?.querySelector("b") || l?.querySelector("rPr")?.querySelector("bCs") ? true : false,
                            italic: l?.querySelector("rPr")?.querySelector("i") || l?.querySelector("rPr")?.querySelector("iCs") ? true : false,
                            strike: l?.querySelector("rPr")?.querySelector("strike") || l?.querySelector("rPr")?.querySelector("dstrike") ? true : false,
                            underline: l?.querySelector("rPr")?.querySelector("u") ? true : false,
                            text: l?.querySelector("t")?.textContent
                        };
                        parag.runs.push(runn);
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
                        run.addEventListener("click", (e) => {
                            e.target.classList.toggle("kpaction");
                            // document.querySelector("#ToolBar").querySelector("#sec") = e.target.fontFamily;s
                        })
                        run.addEventListener("focusout", (e) => {
                            if (e.target.classList.value == "kpaction") {
                                e.target.classList.toggle("kpaction")
                            }
                        })
                        run.addEventListener("input", (e) => {
                            e.target.style.border = "1px solid #333333";
                        })
                        paragraph.appendChild(run);
                    }
                })
                documentt.body.push(parag);
                pCC.appendChild(paragraph);
            } else if (el.localName === 'tbl') {
                console.log(el);
                let tablee = {
                    tblPr: {

                    },
                    tbr: []
                };
                const table = document.createElement("table");
                const tableBody = document.createElement("tbody");
                el?.childNodes.forEach(tr => {
                    if (tr.localName === 'tr') {
                        let tableRow = document.createElement("tr");
                        tr.childNodes.forEach(tc => {
                            if (tc.localName === 'tc') {
                                // console.log(tableRow)
                                let tabEdit = document.createElement("td");
                                tabEdit.style.border = "1px solid #222222";
                                tc.childNodes.forEach(p => {
                                    if (p.localName === 'p') {
                                        const paragraph = document.createElement("div");
                                        paragraph.style.display = "flex";
                                        paragraph.style.flexDirection = "row";
                                        p.childNodes.forEach(pr => {
                                            if (pr.localName === "r") {
                                                const run = document.createElement("pre");
                                                run.contentEditable = true;
                                                run.style.display = "inline";
                                                if (pr?.querySelector("rPr")?.querySelector("rFonts")) {
                                                    run.style.fontFamily = pr?.querySelector("rPr")?.querySelector("rFonts").getAttribute("w:ascii") || 
                                                    pr?.querySelector("rPr")?.querySelector("rFonts").getAttribute("w:hAnsi");
                                                }
                                                run.style.color = `#${pr?.querySelector("rPr")?.querySelector("color")?.getAttribute("w:val")}`;
                                                if (pr?.querySelector("rPr")?.querySelector("b") || pr?.querySelector("rPr")?.querySelector("bCs") ) {
                                                    run.style.fontWeight = "600";
                                                }
                                                if (pr?.querySelector("rPr")?.querySelector("i") || pr?.querySelector("rPr")?.querySelector("iCs")) {
                                                    run.style.fontStyle = "italic";
                                                }
                                                if (pr?.querySelector("rPr")?.querySelector("strike") || pr?.querySelector("rPr")?.querySelector("dstrike")
                                                    && pr?.querySelector("rPr")?.querySelector("u")?.getAttribute("w:val")) {
                                                    run.style.textDecoration = "underline line-through";
                                                    
                                                }else if (pr?.querySelector("rPr")?.querySelector("u")?.getAttribute("w:val")) {
                                                    run.style.textDecoration = "underline";
                                                } else if (pr?.querySelector("rPr")?.querySelector("strike") || pr?.querySelector("rPr")?.querySelector("dstrike")) {
                                                    run.style.textDecoration = "line-through";
                                                }
                                                if (pr?.querySelector("rPr")?.querySelector("sz")?.getAttribute("w:val") == 22 || pr?.querySelector("rPr")?.querySelector("szCs")?.getAttribute("w:val") == 22) {
                                                    run.style.fontSize = "14px";
                                                } else if (pr?.querySelector("rPr")?.querySelector("sz")?.getAttribute("w:val") == 48) {
                                                    run.style.fontSize = "33px";
                                                }
                                                run.textContent = pr?.querySelector("t")?.textContent;
                                                run.addEventListener("click", (e) => {
                                                    e.target.classList.toggle("kpaction");
                                                })
                                                run.addEventListener("focusout", (e) => {
                                                    if (e.target.classList.value == "kpaction") {
                                                        e.target.classList.toggle("kpaction")
                                                    }
                                                })
                                                run.addEventListener("input", (e) => {
                                                    e.target.style.border = "1px solid #333333";
                                                })
                                                paragraph.appendChild(run);
                                            }
                                            tabEdit.appendChild(paragraph);
                                            }
                                        )
                                        tableRow.appendChild(tabEdit);
                                    }
                                })
                                
                            }
                        })
                        tableBody.appendChild(tableRow);
                    }
                })
                table.appendChild(tableBody);
                pCC.appendChild(table);
            }
        })
        console.log(documentt);
        if (err) console.log(err)
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


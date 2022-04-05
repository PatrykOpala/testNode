
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

class InstanceMain{
    constructor(){
       this.instanceTable = [];
    }

    addInstance(idInstance){
        this.instanceTable.push(idInstance);
    }
    getAllInstance(){
        return this.instanceTable;
    }
    getCurrentInstance(idd){
        return this.instanceTable[idd]
    }
}

class Instance{
    constructor(instt, id){
        this.idds = id;
        this.df = instt;
    }
}


class BaseDialog{
    constructor(root){
        this.rootElement = root;

        this.RootBox = document.createElement("div");
        this.RootBox.setAttribute("id", "dialogStart");
        this.RootBox.classList.add("dialogStart");

        const dialogHeader = document.createElement("div");
        dialogHeader.classList.add("dialogHeader");
        
        const close = document.createElement("div");
        close.classList.add("closeDlg");
        const closeImg = document.createElement("img");
        closeImg.src = "./img/close.svg";
        closeImg.alt = "close";

        close.addEventListener("click", ()=>{
            this.RootBox.remove();
        })

        close.append(closeImg);
        dialogHeader.append(close);
        this.addElementToRoot(dialogHeader);

        this.rootElement.append(this.RootBox);
    }
    
    addElementToRoot(element){
        this.RootBox.append(element);
    }
}

// class EdytorDialog extends BaseDialog{
//     constructor(m, preElem, fN){
//         super(m);

//         const dialogBodyEdytor = document.createElement("div");
//         dialogBodyEdytor.classList.add("dialogBody");
//         dialogBodyEdytor.classList.add("dialogEdytorBody");
//         dialogBodyEdytor.setAttribute("id", "dBody");

//         this.PreviewTextFromRun(dialogBodyEdytor, preElem, fN);

//         this.addElementToRoot(dialogBodyEdytor);

//         this.newStrings = [];
        
//     }

//     PreviewTextFromRun(bodyEdytor, p, f){

//         const dBodyLeft = document.createElement("div");
//         dBodyLeft.classList.add("dBodyLeft");
//         const PreviewTextContainer = document.createElement("div");
//         PreviewTextContainer.classList.add("PreviewTextContainer");
//         const PreviewText = document.createElement("p");
//         PreviewText.id = "PreviewText";
//         PreviewText.classList.add("PreviewText");
//         PreviewText.style.color = p.getAttribute("do-color");
//         PreviewText.style.textDecoration = p.getAttribute("do-text-decoration");
//         PreviewText.style.fontStyle = p.getAttribute("do-font-style");
//         PreviewText.style.fontWeight = p.getAttribute("do-font-weight");
//         PreviewText.style.fontSize = `${p.getAttribute("do-font-size")}pt`;
//         PreviewTextContainer.append(PreviewText);
//         const ApplyChangeText = document.createElement("input");
//         ApplyChangeText.placeholder = "Wprowadź nowe wartości";
//         ApplyChangeText.classList.add("ApplyChangeText");
//         ApplyChangeText.addEventListener("keydown", (e)=>{
//             if(e.key === "Enter"){
//                 this.addString(ApplyChangeText.value);
//                 ApplyChangeText.value = "";
//             }
//         })

//         dBodyLeft.append(PreviewTextContainer, ApplyChangeText);

//         const dBodyRight = document.createElement("div");
//         dBodyRight.classList.add("dBodyRight");
//         const OtherFilesContainer = document.createElement("div");
//         OtherFilesContainer.classList.add("OtherFilesContainer");
//         for(let hd = 0; hd < Number(inst.instanceTable[0].df); hd++){
//             let OtherFilesItem = document.createElement("div");
//             OtherFilesItem.classList.add("OtherFilesItem");
//             let ffmnmn = f.split(".") ;
//             ffmnmn[0] += hd;
//             OtherFilesItem.textContent = `${ffmnmn[0].concat(".", ffmnmn[1])}`;
//             OtherFilesItem.addEventListener("click", (e)=>{
//                 if(e.target.hasAttribute("do-select")){
//                     e.target.removeAttribute("do-select");
//                 }  
//                 else{
//                     e.target.setAttribute("do-select", "");
//                 } 
//             });
//             OtherFilesContainer.append(OtherFilesItem);
//         }
//         dBodyRight.append(OtherFilesContainer);
//         bodyEdytor.append(dBodyLeft, dBodyRight);
//     }

//     addString(value){
//         this.newStrings.push(value);
//         this.render();
//     }

//     render(){
//         const rPreviewText = document.querySelector("#PreviewText");
//         const rPreviewParagraph = rPreviewText.querySelectorAll("p");
//         if(rPreviewParagraph.length > 0){
//             for(const paraf of rPreviewParagraph){
//                 paraf.remove();
//             }
//         }
//         for(const indexx in this.newStrings){
//             let p = document.createElement("p");
//             p.style.marginLeft = "4px";
//             p.textContent = this.newStrings[indexx];
//             rPreviewText.append(p);
//         }
//     }

// }

function AsyncTableTemplate(tElement){
    return new Promise((resolve, reject)=>{
        // 6,944444444444444e-4
        let tablee = {
            type: 'Table',
            tblPr: {
                tblW: {
                    width: tElement?.querySelector('tblPr').querySelector('tblW').getAttribute('w:w'),
                    type: ""
                },
                jc: tElement?.querySelector('tblPr').querySelector('jc').getAttribute('w:val'),
                tblInd: {
                    width: tElement?.querySelector('tblPr').querySelector('tblInd').getAttribute('w:w'),
                    type: tElement?.querySelector('tblPr').querySelector('tblInd').getAttribute('w:type') === 'dxa' ? "DXA" : "null"
                },
                tblLayout: {
                    type: tElement?.querySelector('tblPr').querySelector('tblLayout').getAttribute('w:type') || "null"
                },
                tblCellMar: {
                    top: {
                        width: tElement?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('top')?.getAttribute('w:w'),
                        type: tElement?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('top')?.getAttribute('w:type') === 'dxa' ? "DXA" : "null"
                    },
                    left: {
                        width: tElement?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('left')?.getAttribute('w:w'),
                        type: tElement?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('left')?.getAttribute('w:type') === 'dxa' ? "DXA" : "null"
                    },
                    bottom: {
                        width: tElement?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('bottom')?.getAttribute('w:w'),
                        type: tElement?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('bottom')?.getAttribute('w:type') === 'dxa' ? "DXA" : "null"
                    },
                    right: {
                        width: tElement?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('right')?.getAttribute('w:w'),
                        type: tElement?.querySelector('tblPr')?.querySelector('tbCellMar')?.querySelector('right')?.getAttribute('w:type') === 'dxa' ? "DXA" : "null"
                    }
                }
            },
            tblGrid: {
                gridCols: []
            },
            tbr: [],
        }

        if(tElement?.querySelector('tblPr').querySelector('tblW').getAttribute('w:type') === 'dxa'){
            tablee.tblPr.tblW.type = tElement?.querySelector('tblPr').querySelector('tblW').getAttribute('w:type')
        }else if(tElement?.querySelector('tblPr').querySelector('tblW').getAttribute('w:type') === 'pct'){
            tablee.tblPr.tblW.type = tElement?.querySelector('tblPr').querySelector('tblW').getAttribute('w:type')
        }else{
            tablee.tblPr.tblW.type = ""
        }
        
        for(const tblGC of tElement?.querySelector('tblGrid').childNodes){
            let gridCol = {width: Number.parseInt(tblGC.getAttribute('w:w'))};
            tablee.tblGrid.gridCols.push(gridCol);
        }
        for(const tRows of tElement?.querySelectorAll('tr')){
            let tableRow = {
                trPr: tRows?.querySelector('trPr') || null,
                tcols: [],
            }

            if(tRows.querySelectorAll('tc')){
                for(const tcc of tRows.querySelectorAll('tc')){
                    let tc = {
                        tcPr: {
                            tcW: {
                                width: Number.parseInt(tRows?.querySelector('tcPr')?.querySelector('tcW')?.getAttribute('w:w')),
                                type: tRows?.querySelector('tcPr')?.querySelector('tcW')?.getAttribute('w:type')
                            },
                            tcBorders: {
                                top: {
                                    val: tRows?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('top')?.getAttribute('w:val'),
                                    sz: Number.parseInt(tRows?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('top')?.getAttribute('w:sz')),
                                    space: Number.parseInt(tRows?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('top')?.getAttribute('w:space')),
                                    color: tRows?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('top')?.getAttribute('w:color')
                                },
                                left: {
                                    val: tRows?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('left')?.getAttribute('w:val'),
                                    sz: Number.parseInt(tRows?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('left')?.getAttribute('w:sz')),
                                    space: Number.parseInt(tRows?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('left')?.getAttribute('w:space')),
                                    color: tRows?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('left')?.getAttribute('w:color')
                                },
                                bottom: {
                                    val: tRows?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('bottom')?.getAttribute('w:val'),
                                    sz: Number.parseInt(tRows?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('bottom')?.getAttribute('w:sz')),
                                    space: Number.parseInt(tRows?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('bottom')?.getAttribute('w:space')),
                                    color: tRows?.querySelector('tcPr')?.querySelector('tcBorders')?.querySelector('bottom')?.getAttribute('w:color')
                                },
                            }
                        },
                        p: []
                    }
                    for(const tccp of tcc.querySelectorAll('p')){
                        let TableColumnParagraph = {
                            type: "Paragraph",
                            pPr: {
                                pStyle: tccp.querySelector('pPr').querySelector('pStyle')?.getAttribute("w:val"),
                                rPr: {
                                    sz: Number.parseInt(tccp.querySelector('pPr')?.querySelector('rPr')?.querySelector('sz')?.getAttribute("w:val")) || null,
                                    szCs: Number.parseInt(tccp.querySelector('pPr')?.querySelector('rPr')?.querySelector('szCs')?.getAttribute("w:val")) || null
                                }
                            },
                            runs: []
                        }
                        for(let tcprr of tccp.querySelectorAll('r')){
                            const runn = {
                                type: "Run",
                                rPr: {
                                    fontSize: Number.parseInt(tcprr?.querySelector("rPr")?.querySelector("sz")?.getAttribute("w:val")) || Number.parseInt(tcprr?.querySelector("rPr")?.querySelector("szCs")?.getAttribute("w:val")),
                                    fontFamily: tcprr?.querySelector("rPr")?.querySelector("rFonts")?.getAttribute("w:ascii") || tcprr?.querySelector("rPr")?.querySelector("rFonts")?.getAttribute("w:hAnsi") || null,
                                    bold: tcprr?.querySelector("rPr")?.querySelector("b") || tcprr?.querySelector("rPr")?.querySelector("bCs") ? true : false,
                                    italic: tcprr?.querySelector("rPr")?.querySelector("i") || tcprr?.querySelector("rPr")?.querySelector("iCs") ? true : false,
                                    strike: tcprr?.querySelector("rPr")?.querySelector("strike") || tcprr?.querySelector("rPr")?.querySelector("dstrike") ? true : false,
                                    underline: tcprr?.querySelector("rPr")?.querySelector("u") ? true : false,
                                    color: ""
                                },
                                oldValues: [] | ''
                            }
                            if (tcprr?.querySelector("rPr")?.querySelector("color")?.getAttribute("w:val").startsWith("#")) {
                                runn.rPr.color = tcprr?.querySelector("rPr")?.querySelector("color")?.getAttribute("w:val");
                            } else if (tcprr?.querySelector("rPr")?.querySelector("color")?.getAttribute("w:val") === undefined || tcprr?.querySelector("rPr")?.querySelector("color")?.getAttribute("w:val") === null) {
                                runn.rPr.color = "null";
                            } else {
                                runn.rPr.color = `#${tcprr?.querySelector("rPr")?.querySelector("color")?.getAttribute("w:val")}`;
                            }
                            if (tcprr?.querySelectorAll("t").length > 1) {
                                for(const tp of tcprr?.querySelectorAll("t")){
                                    runn.oldValues.push(tp.textContent);
                                }
                            } else {
                                runn.oldValues = tcprr?.querySelector("t").textContent;
                            }
                            TableColumnParagraph.runs.push(runn);
                        }
                        tc.p.push(TableColumnParagraph);
                    }
                    tableRow.tcols.push(tc);
                }
                
            }
            tablee.tbr.push(tableRow);
        }        
        resolve(tablee);
    })
}



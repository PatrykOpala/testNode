
// let body = [];
/*
const paragraph = document.createElement("div");
paragraph.style.display = "flex";
paragraph.style.flexDirection = "row";
paragraph.style.maxWidth = `${pCC.offsetWidth}px`;
paragraph.style.alignItems = "center";
*/

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


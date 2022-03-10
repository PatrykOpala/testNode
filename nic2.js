
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

class DialogStart{
    constructor(main, file){
        let dialogStart = document.createElement("div");
        dialogStart.id = "dialogStart";
        dialogStart.classList.add("dialogStart");

        dialogStart.append(this.#createDialogHeader(), this.#createDialogSelectHeader(), 
            this.#createDialogBody(file));

        main.append(dialogStart);

    }

    #createDialogHeader(){
        const dialogHeader = document.createElement("div");
        dialogHeader.classList.add("dialogHeader");
        
        const close = document.createElement("div");
        close.classList.add("closeDlg");
        const closeImg = document.createElement("img");
        closeImg.src = "./img/close.svg";
        closeImg.alt = "close";

        close.addEventListener("click", ()=>{
            dialogStart.remove();
        })

        close.append(closeImg);
        dialogHeader.append(close);
        return dialogHeader;
    }

    #createDialogSelectHeader(){
        const dialogSelectHeader = document.createElement("div");
        dialogSelectHeader.classList.add("dialogSelectHeader");
        const dialogSelectHeaderItemSettings = document.createElement("div");
        dialogSelectHeaderItemSettings.classList.add("dialogSelectHeaderItem");
        dialogSelectHeaderItemSettings.id = "settings";
        dialogSelectHeaderItemSettings.textContent = "Ustawienia";

        const dialogSelectHeaderItemCountFile = document.createElement("div");
        dialogSelectHeaderItemCountFile.classList.add("dialogSelectHeaderItem");
        dialogSelectHeaderItemCountFile.id = "countFile";
        dialogSelectHeaderItemCountFile.textContent = "Ile plików";
        dialogSelectHeader.append(dialogSelectHeaderItemSettings, 
            dialogSelectHeaderItemCountFile);

        return dialogSelectHeader;
    }

    #createDialogBody(fileName){
        const dialogBody = document.createElement("div");
        dialogBody.classList.add("dialogBody");
        dialogBody.setAttribute("id", "dBody");

        const bv = document.createElement("div");
        bv.classList.add("bv");
        const span = document.createElement("span");
        span.textContent = "Nazwa Pliku";
        const nameFile = document.createElement("input");
        nameFile.setAttribute("type", "text");
        nameFile.setAttribute("id", "nameFile");
        nameFile.classList.add("filePath");
        nameFile.value = fileName;
        bv.append(span, nameFile);

        const bc = document.createElement("div");
        bc.classList.add("bv");
        const spann = document.createElement("span");
        spann.textContent = "Ilość Pliku";
        const countC = document.createElement("div");
        countC.classList.add("countC");
        const countCPre = document.createElement("pre");
        countCPre.setAttribute("contenteditable", "true");
        countCPre.textContent = "0";
        const p = document.createElement("p");
        p.textContent = "/500";
        countC.append(countCPre, p);
        bc.append(spann, countC);
        
        const nextButton = document.createElement("button");
        nextButton.setAttribute("id", "nextButton");
        nextButton.classList.add("nextButton");
        nextButton.textContent = "Dalej";

        dialogBody.append(bv, bc, nextButton);

        return dialogBody;
    }
}




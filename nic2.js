
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

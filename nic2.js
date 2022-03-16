
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
        console.log(this.instanceTable[0].df);
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

class DialogStart extends BaseDialog{
    constructor(main, file, fileObject){
        super(main);
        this.mainn = main;

        this.addElementToRoot(this.#createDialogSelectHeader());
        this.addElementToRoot(this.#createDialogBody(file, fileObject));

        this.PointerDialogStart = this.RootBox;
    }

    #createDialogSelectHeader(){
        const dialogSelectHeader = document.createElement("div");
        dialogSelectHeader.classList.add("dialogSelectHeader");
        const dialogSelectHeaderItemSettings = document.createElement("button");
        dialogSelectHeaderItemSettings.classList.add("dialogSelectHeaderItem");
        dialogSelectHeaderItemSettings.id = "settings";
        dialogSelectHeaderItemSettings.textContent = "Ustawienia";

        const dialogSelectHeaderItemCountFile = document.createElement("button");
        dialogSelectHeaderItemCountFile.classList.add("dialogSelectHeaderItem");
        dialogSelectHeaderItemCountFile.id = "countFile";
        dialogSelectHeaderItemCountFile.textContent = "Ile plików";
        dialogSelectHeader.append(dialogSelectHeaderItemSettings, 
            dialogSelectHeaderItemCountFile);

        return dialogSelectHeader;
    }

    #createDialogBody(fileName, fc){
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

        nextButton.addEventListener("click", ()=>{
            mFile.fileSystem.readFile(`docxs/${fileName}/word/document.xml`, 'utf8', (err, buff) => {
                if (err) { console.log(err)}

                inst.addInstance(new Instance(countCPre.textContent, "CountC"));
                this.PointerDialogStart.remove();
                dragg.remove();
                createWorkNavBar(this.mainn);
                start(fc[0], buff);
            });
        });

        dialogBody.append(bv, bc, nextButton);

        return dialogBody;
    }
}


class EdytorDialog extends BaseDialog{
    constructor(m, preElem){
        super(m);

        const dialogBodyEdytor = document.createElement("div");
        dialogBodyEdytor.classList.add("dialogBody");
        dialogBodyEdytor.classList.add("dialogEdytorBody");
        dialogBodyEdytor.setAttribute("id", "dBody");

        this.PreviewTextFromRun(dialogBodyEdytor, preElem);

        this.addElementToRoot(dialogBodyEdytor);
    }

    PreviewTextFromRun(bodyEdytor, p){
        const PreviewTextContainer = document.createElement("div");
        PreviewTextContainer.style.width = "50%";
        PreviewTextContainer.style.padding = "10px";
        
        const PreviewText = document.createElement("p");
        PreviewText.style.minWidth = "6%";
        PreviewText.style.height = "8vh";
        PreviewText.style.border = "1px solid rgb(72, 89, 21)";
        PreviewText.style.textAlign = "center";
        PreviewText.style.padding = "6px";
        PreviewText.textContent = p.getAttribute("oldvalue");
        PreviewText.style.color = p.getAttribute("do-color");
        PreviewText.style.textDecoration = p.getAttribute("do-text-decoration");
        PreviewText.style.fontStyle = p.getAttribute("do-font-style");
        PreviewText.style.fontWeight = p.getAttribute("do-font-weight");
        PreviewText.style.lineHeight = "50px";
        PreviewTextContainer.append(PreviewText);

        const OtherFilesContainer = document.createElement("div");
        OtherFilesContainer.style.border = "1px solid red";
        OtherFilesContainer.style.width = "290px";
        OtherFilesContainer.style.height = "70%";
        OtherFilesContainer.style.marginLeft = "54%";
        OtherFilesContainer.style.marginTop = "-97px";


        bodyEdytor.append(PreviewTextContainer, OtherFilesContainer);
    }
}



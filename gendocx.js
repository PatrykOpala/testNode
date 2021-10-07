const fs = require("fs")
const { Paragraph, TextRun, Document, Packer } = require("docx");

let doc = new Document({
    sections:[
        {
            children:[
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Coś tam",
                            color: "#871273"
                        }),
                        new TextRun({
                            text: " Coś tam",
                            color: "#871273"
                        })
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Node fajnie to tworzy",
                            color: "#871273",
                            size: 70
                        })
                    ]
                }),
            ]
        }
    ]
});

Packer.toBuffer(doc).then(buffer =>{
    fs.writeFileSync("test.docx", buffer);
});
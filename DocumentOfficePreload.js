const { contextBridge } = require('electron');
const decompress = require('decompress');
const fs = require('fs');

class mFile{
    constructor(decomprr, filessss){
        this.de = decomprr;
        this.fileSystem = filessss;
    }
}

contextBridge.exposeInMainWorld('mFile', new mFile(decompress, fs));


/*{
    de: decompress,
    fileSystem: fs,
    paragraph: Paragraph,
    textRun: TextRun,
    document: Document,
    packer: Packer,
    table: Table
}*/
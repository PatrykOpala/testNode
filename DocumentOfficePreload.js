const { contextBridge } = require('electron');
const decompress = require('decompress');
const fs = require('fs');
const { Paragraph, TextRun, Document, Packer, Table } = require("docx");

contextBridge.exposeInMainWorld('mFile', {
    de: decompress,
    fileSystem: fs,
    paragraph: Paragraph,
    textRun: TextRun,
    document: Document,
    packer: Packer,
    table: Table
})
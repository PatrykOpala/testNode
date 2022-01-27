const { contextBridge } = require('electron');
const decompress = require('decompress');
const fs = require('fs');

contextBridge.exposeInMainWorld('mFile', {
    de: decompress,
    fileSystem: fs
})
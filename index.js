const { app, BrowserWindow } = require('electron')
const path = require('path')
// import {app, BrowserWindow} from 'electron'

function createWindow() {
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    title: "Document Office",
    width: 850,
    height: 630,
    webPreferences: {
      // nodeIntegration: true,
      // contextIsolation: false,
      // enableRemoteModule: true,
      preload: path.join(__dirname, 'DocumentOfficePreload.js')
    }
  })
  win.loadFile('index.html')
  // win.maximize()
  // win.webContents.openDevTools()
  // win.webContents.clearHistory()
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

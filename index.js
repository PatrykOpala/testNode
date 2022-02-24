const { app, BrowserWindow } = require('electron')
const path = require('path')
// import {app, BrowserWindow} from 'electron'

function createWindow() {
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    title: "Document Office",
    width: 1440,
    height: 755,
    icon: './img/logo.ico',
    backgroundColor: '#ffffff',
    webPreferences: {
      preload: path.join(__dirname, 'DocumentOfficePreload.js'),
      imageAnimationPolicy: 'noAnimation',
      v8CacheOptions: 'none'
    },
    show: false
    // frame: false
  })
  win.loadFile('index.html')
  win.once('ready-to-show', () => { win.show() })
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

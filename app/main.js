const { app, BrowserWindow,Tray} = require('electron');
const path = require('path');
const IconPath = path.join(__dirname, 'img', 'logo.png');
function createWindow () {

    // appIcon  = new Tray(IconPath);
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: IconPath,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
    console.log(IconPath)
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

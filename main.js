const electron = require("electron");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const dialog = electron.dialog;


function createWindow(){
    let window = new BrowserWindow({
        width:800,
        height:665,
        minWidth: 800,
        minHeight:665,
        autoHideMenuBar:true,
    });

    window.loadFile('index.html');
    window.webContents.openDevTools();
}

app.on('ready', createWindow);

app.on('window-all-closed',()=>{
    app.quit();
})


// electron-main.js
import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
    let mainWindow = new BrowserWindow({
        fullscreen: true,
        frame: false,
        titleBarStyle: 'hidden',
        width: '100%',
        height: '100%',
        webPreferences: {
            devTools: false,
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.cjs')
        },
    });

    mainWindow.menuBarVisible = false;
    mainWindow.loadFile('dist/index.html'); // Load your Vue app URL here
    // mainWindow.webContents.openDevTools() // Automatically open the console

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
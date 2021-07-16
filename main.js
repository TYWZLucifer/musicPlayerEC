const { app, BrowserWindow, ipcMain } = require('electron');
app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  mainWindow.loadFile('index.html');
  ipcMain.on('rendermessage', (e, arg) => {
    console.log(arg);
    e.reply('mainreply', 'hello from main');
  })
});
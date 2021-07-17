const { app, ipcMain, dialog } = require('electron');
const AppWindow = require('./utils/AppWindow');
const MusicData = require('./utils/MusicData');

const musicStore = new MusicData({'name': 'musicListData'});
console.log(app.getPath('userData'));
console.log(musicStore.getTracks());

app.on('ready', () => {
  const mainWindow = new AppWindow({}, './renderer/index.html');
  ipcMain.on("add_music", () => {
    const addMusicWindow = new AppWindow({
        width: 500,
        height: 300,
        parent: mainWindow
    }, './renderer/add.html');
  });
  ipcMain.on("select_music", (e, args) => {
    dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections'],
        filters: [{ name: 'Musics', extensions: ['mp3'] }]      
    }).then((res) => {
        e.reply('music_list', res.filePaths);
    })
  });
  ipcMain.on("import_music", (e, paths) => {
    musicStore.addTracks(paths);
    console.log(musicStore.getTracks());
  })
});
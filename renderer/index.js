const { ipcRenderer } = require('electron');
const { $ } = require('./getEle');

$("add_music").addEventListener("click", () => {
    ipcRenderer.send("add_music");
});
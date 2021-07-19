const { ipcRenderer } = require('electron');
const { $ } = require('../utils/helper');
const path = require('path');
let music_paths = [];

$("select_music").addEventListener('click', () => {
    ipcRenderer.send("select_music");
});

$("import_music").addEventListener('click', () => {
    ipcRenderer.send("import_music", music_paths);
})

const renderMusicList = (paths) => {
    const music_list_innerHTML = paths.reduce((html, music) => {
        html += `<li class="list-group-item">${path.basename(music)}</li>`;
        return html;
    }, '');
    $("music_list").innerHTML = music_list_innerHTML;
}

ipcRenderer.on('music_list', (e, paths) => {
    renderMusicList(paths);
    music_paths = paths;
});
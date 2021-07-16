const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.send('rendermessage', 'hello from renderer');
    ipcRenderer.on('mainreply', (e, arg) => {
        document.getElementById("ipcmessage").innerHTML = arg;
    })
});

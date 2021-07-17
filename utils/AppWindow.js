const { BrowserWindow } = require('electron');

class AppWindow extends BrowserWindow {
    constructor(config, file) {
        const basicCfg = {
            width: 800,
            height: 600,
            webPreferences: {
              nodeIntegration: true,
              contextIsolation: false
            }
        };
        const finalCfg = Object.assign(basicCfg, config);
        super(finalCfg);
        this.loadFile(file);
        this.once('ready-to-show', () => {
            this.show();
        });
    }
}

module.exports = AppWindow;
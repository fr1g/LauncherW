const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    MIPC: (cmd) => {ipcRenderer.send('MIPC', cmd)},
    RIPC: (cmd) => {ipcRenderer.on('RIPC', cmd)}
})
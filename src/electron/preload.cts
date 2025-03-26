//@ts-nocheck

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  onNavigate: (callback) => {
    ipcRenderer.on("navigate", (_event, path) => callback(path));
  },
});

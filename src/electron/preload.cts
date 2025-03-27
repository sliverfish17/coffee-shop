const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  onNavigate: (callback: (path: string) => void) => {
    ipcRenderer.on("navigate", (_event: string, path: string) =>
      callback(path)
    );
  },
});

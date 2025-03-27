import { app, BrowserWindow, Menu } from "electron";
import path from "path";
import { isDev } from "./util.js";
import { getPreloadPath } from "./pathResolver.js";
import { menuTemplate } from "./menu.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: getPreloadPath(),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5000");
  } else {
    const indexPath = path.join(app.getAppPath(), "dist-react", "index.html");
    mainWindow.loadFile(indexPath);
  }
});

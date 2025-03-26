import path from "path";
import { app } from "electron";
import { isDev } from "./util.js";

export const getPreloadPath = () => {
  return path.join(
    app.getAppPath(),
    isDev() ? "." : "..",
    "/dist-electron/preload.cjs"
  );
};

export const getUIPath = () => {
  return path.join(app.getAppPath(), "/dist-react/index.html");
};

export const getAssetPath = () => {
  return path.join(app.getAppPath(), isDev() ? "." : "..", "/src/assets");
};

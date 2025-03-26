import { BrowserWindow } from "electron";

function sendToRenderer(channel: string, data: unknown): void {
  const win = BrowserWindow.getAllWindows()[0];
  if (win) {
    win.webContents.send(channel, data);
  }
}

export const menuTemplate = [
  {
    label: "Касир",
    submenu: [
      {
        label: "Додати касира",
        click: () => {
          sendToRenderer("navigate", "/add-cashier");
        },
      },
      {
        label: "Редагувати інформацію",
        click: () => {
          sendToRenderer("navigate", "/edit-cashier");
        },
      },
      {
        label: "Переглянути інформацію",
        click: () => {
          sendToRenderer("navigate", "/view-cashier");
        },
      },
    ],
  },
  {
    label: "Товар",
    submenu: [
      {
        label: "Додати товар",
        click: () => {
          sendToRenderer("navigate", "/add-product");
        },
      },
      {
        label: "Оновити товар",
        click: () => {
          sendToRenderer("navigate", "/update-product");
        },
      },
      {
        label: "Переглянути товар",
        click: () => {
          sendToRenderer("navigate", "/view-product");
        },
      },
    ],
  },
];

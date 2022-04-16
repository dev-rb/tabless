import { BrowserWindow, ipcRenderer } from "electron";
import { exposeInMainWorld } from "./exposeInMainWorld";

function openExternalWindow(urlToOpen: string) {
    console.log("I can call open window: ", urlToOpen)

    ipcRenderer.send('open-window', urlToOpen);
}

export const openWindow = { openExternalWindow } as const;

exposeInMainWorld('openWindow', openWindow)


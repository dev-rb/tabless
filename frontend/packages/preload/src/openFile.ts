import { ipcRenderer } from "electron";
import { exposeInMainWorld } from "./exposeInMainWorld";

function getFileOnSystem() {
    // console.log("I can call open file function!")
    ipcRenderer.send('open-file-dialog');
}

export const openFile = { getFileOnSystem } as const;

exposeInMainWorld('openFile', openFile)


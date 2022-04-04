import { ipcRenderer } from "electron";
import { exposeInMainWorld } from "./exposeInMainWorld";

async function getFileOnSystem() {
    // console.log("I can call open file function!")
    return await ipcRenderer.invoke('open-file-dialog');
}

export const openFile = { getFileOnSystem } as const;

exposeInMainWorld('openFile', openFile)


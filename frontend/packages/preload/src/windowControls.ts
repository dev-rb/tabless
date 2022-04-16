import { ipcRenderer } from 'electron';
import { exposeInMainWorld } from './exposeInMainWorld';

function closeWindow() {
    ipcRenderer.invoke('close-window');
}

function minimizeWindow() {
    ipcRenderer.invoke('minimize-window');
}

function restoreWindow() {
    ipcRenderer.invoke('restore-window');
}

// Export for types in contracts.d.ts
export const windowControls = { closeWindow, minimizeWindow, restoreWindow } as const;

exposeInMainWorld('windowControls', windowControls);

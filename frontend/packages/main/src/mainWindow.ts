import { app, BrowserWindow, dialog, ipcMain, protocol } from 'electron';
import { join, basename } from 'path';
import { URL } from 'url';

async function createWindow() {
  const browserWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#1D1D20',
    frame: false,
    autoHideMenuBar: true,
    trafficLightPosition: {
      x: 20,
      y: 32
    },
    show: false, // Use 'ready-to-show' event to show window
    webPreferences: {
      nativeWindowOpen: true,
      webviewTag: false, // The webview tag is not recommended. Consider alternatives like iframe or Electron's BrowserView. https://www.electronjs.org/docs/latest/api/webview-tag#warning
      preload: join(__dirname, '../../preload/dist/index.cjs'),
    },
  });

  /**
   * If you install `show: true` then it can cause issues when trying to close the window.
   * Use `show: false` and listener events `ready-to-show` to fix these issues.
   *
   * @see https://github.com/electron/electron/issues/25012
   */
  browserWindow.on('ready-to-show', () => {
    browserWindow?.show();

    if (import.meta.env.DEV) {
      browserWindow?.webContents.openDevTools();
    }
  });

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */
  const pageUrl = import.meta.env.DEV && import.meta.env.VITE_DEV_SERVER_URL !== undefined
    ? import.meta.env.VITE_DEV_SERVER_URL
    : new URL('../renderer/dist/index.html', 'file://' + __dirname).toString();


  await browserWindow.loadURL(pageUrl);

  return browserWindow;
}

/**
 * Restore existing BrowserWindow or Create new BrowserWindow
 */
export async function restoreOrCreateWindow() {
  let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed());

  if (window === undefined) {
    window = await createWindow();
  }

  if (window.isMinimized()) {
    window.restore();
  }

  window.focus();
}


app.on('ready', async () => {
  protocol.registerFileProtocol('app', (request, callback) => {
    const url = request.url.replace('app://getMediaFile/', '')
    try {
      return callback(url)
    }
    catch (error) {
      console.error(error)
      return callback(`Error: ${error}`,)
    }
  });

  ipcMain.handle('open-file-dialog', async (e, cb) => {
    const results = await dialog.showOpenDialog({ properties: ['openFile'], filters: [{ name: 'PDFs', extensions: ['pdf'] }] });
    let filePaths: { path: string; name: string; }[] = [];
    if (!results.canceled) {
      filePaths = results.filePaths.map((val) => ({ path: val, name: basename(val) }));
    }
    return filePaths;
  });

  ipcMain.on('open-window', (e, url) => {
    console.log("Main open called: ", url)
    const win = new BrowserWindow({ width: 600, height: 400, frame: false, titleBarStyle: 'hidden' });
    win.loadURL(url);
  })

  ipcMain.handle('close-window', () => {
    let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed());
    if (window) {
      window.close();
      app.quit();
    }
  });

  ipcMain.handle('minimize-window', () => {
    let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed());
    if (window) {
      window.minimize();
    }
  });

  ipcMain.handle('restore-window', () => {
    let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed());
    if (window) {
      if (window.isMinimized() || window.isMaximized()) {
        window.restore();
      } else {
        window.maximize();
      }
    }
  });
});
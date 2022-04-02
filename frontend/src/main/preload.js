import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    output: {
      outTest() {
        console.log("This works!")
      }
    }


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // on(channel, func: ) {
    //   const validChannels = ['ipc-example'];
    //   if (validChannels.includes(channel)) {
    //     // Deliberately strip event as it includes `sender`
    //     ipcRenderer.on(channel, (_event, ...args) => func(...args));
    //   }
    // },
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // once(channel, func: ) {
    //   const validChannels = ['ipc-example'];
    //   if (validChannels.includes(channel)) {
    //     // Deliberately strip event as it includes `sender`
    //     ipcRenderer.once(channel, (_event, ...args) => func(...args));
    //   }
    // },
  },
});

export { };
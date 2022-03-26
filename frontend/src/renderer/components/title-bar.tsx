// import { ipcRenderer, remote } from 'electron';
import * as React from 'react';
// const {remote} = window.require('electron');

// const currWindow = remote.getCurrentWindow();

const TitleBar = () => {

  const handleCloseWindow = () => {
    // console.log(remote.app.getAppPath())
    // currWindow.close();
    // ipcRenderer.send('ipc-example');
  }

  const handleMinimizeWindow = () => {

  }

  const handleMaximizeWindow = () => {

  }

  return (
    <nav className="title-bar-drag w-screen h-8 border-white border-b items-center flex z-0 fixed top-0">

      <button className="w-8 h-8 flex items-center justify-center bg-red-500" onClick={handleCloseWindow}>X</button>

    </nav>
  );
}
  
export default TitleBar;

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
    <nav className="title-bar-drag w-screen h-8 items-center flex z-0 fixed top-0 border-b-2 border-b-white">

    </nav>
  );
}

export default TitleBar;

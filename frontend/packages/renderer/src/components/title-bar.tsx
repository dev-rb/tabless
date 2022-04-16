// import { ipcRenderer, remote } from 'electron';
import * as React from 'react';
import { MdClose, MdMinimize } from 'react-icons/md';
import { BiWindows } from 'react-icons/bi';
// const {remote} = window.require('electron');

// const currWindow = remote.getCurrentWindow();

const TitleBar = () => {

  const handleCloseWindow = () => {
    window.windowControls.closeWindow();
  }

  const handleMinimizeWindow = () => {
    window.windowControls.minimizeWindow();
  }

  const handleMaximizeWindow = () => {
    window.windowControls.restoreWindow();
  }

  return (
    <header className="title-bar-drag w-screen h-8 items-center flex z-50 border-b-2 border-b-white">
      <div className="flex">
        {/* Logo */}
      </div>

      <div className="flex h-full ml-auto title-bar-no-drag">
        <button type='button' className="w-12 h-full flex items-center justify-center cursor-pointer text-lg text-[#79797c] hover:bg-[#74747c4d]" onClick={handleMinimizeWindow}> <MdMinimize /> </button>
        <button type='button' className="w-12 h-full flex items-center justify-center cursor-pointer text-[#79797c] hover:bg-[#74747c4d]" onClick={handleMaximizeWindow}> <BiWindows /> </button>
        <button type='button' className="w-12 h-full flex items-center justify-center cursor-pointer text-[#79797c] hover:bg-red-700 hover:text-white" onClick={handleCloseWindow}> <MdClose /> </button>
      </div>
    </header>
  );
}

export default TitleBar;

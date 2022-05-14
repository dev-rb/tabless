import * as React from 'react';
import { MdClose, MdMinimize } from 'react-icons/md';
import { BiWindows } from 'react-icons/bi';
import { Group, Header, UnstyledButton } from '@mantine/core';


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
    <Header height={'2rem'} sx={{ width: '100vw', display: 'flex', alignItems: 'center', zIndex: 50, backgroundColor: '#1D1D20' }} className="title-bar-drag">
      <div className="flex">
        {/* Logo */}
      </div>

      <Group noWrap className="title-bar-no-drag" sx={{ height: '100%', marginLeft: 'auto' }} grow>
        <UnstyledButton type='button' sx={{ width: '3rem', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', fontSize: '1.125rem', lineHeight: '1.75rem', color: '#79797c', ':hover': { backgroundColor: '#74747c4d' } }}
          onClick={handleMinimizeWindow}> <MdMinimize /> </UnstyledButton>
        <UnstyledButton type='button'
          sx={{ width: '3rem', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', fontSize: '1.125rem', lineHeight: '1.75rem', color: '#79797c', ':hover': { backgroundColor: '#74747c4d' } }}
          onClick={handleMaximizeWindow}> <BiWindows /> </UnstyledButton>
        <UnstyledButton type='button'
          sx={{ width: '3rem', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', fontSize: '1.125rem', lineHeight: '1.75rem', color: '#79797c', ':hover': { backgroundColor: 'red', color: 'white' } }}
          onClick={handleCloseWindow}> <MdClose /> </UnstyledButton>
      </Group>
    </Header>
  );
}

export default TitleBar;

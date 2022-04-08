import * as React from 'react';
import { nanoid } from 'nanoid';
import PdfViewer from './components/PdfViewer';
import TextDocument from './components/TextDocument';
import TitleBar from './components/title-bar'
import TopBar from './components/Topbar'
import SearchResults from './components/SearchResults';

function App() {
  return (
    <div className="h-screen w-screen flex flex-col pt-14">
      <TitleBar />
      <div className="h-full w-full flex px-6 overflow-hidden">
        <div className="flex flex-col w-full">
          <TopBar />
          <div className="flex flex-row justify-between h-full w-full pl-20">
            <TextDocument title={'Class Project 499 Capstone'} author={'Rahul Batra'} tags={[{ id: nanoid(), tagName: 'Research' }]} text={''} />
            {/* <div className="w-full h-full">
            <img src={'./logo.png'} />
          </div> */}
            {/* <PdfViewer />  */}
          </div>
        </div>
        <SearchResults />
      </div>
    </div>
  )
}

export default App;

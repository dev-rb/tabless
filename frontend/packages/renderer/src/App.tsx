import * as React from 'react';
import PdfViewer from './components/PdfViewer';
import TextDocument from './components/TextDocument';
import TextEditor from './components/TextEditor';
import TitleBar from './components/title-bar'
import TopBar from './components/Topbar'

function App() {
  return (
    <div className="h-screen w-screen flex flex-col pt-12">
      <TitleBar />
      <div className="h-full px-6 overflow-hidden">
        <TopBar />
        <div className="flex flex-row justify-between h-full">
          <TextDocument title={'Class Project 499 Capstone'} author={'Rahul Batra'} tags={['Research']} text={''} />
          {/* <div className="w-full h-full">
            <img src={'./logo.png'} />
          </div> */}
          <PdfViewer />
        </div>
      </div>
    </div>
  )
}

export default App;

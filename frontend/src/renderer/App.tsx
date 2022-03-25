import * as React from 'react';
import TextEditor from './components/TextEditor';
import TitleBar from './components/title-bar'
import TopBar from './components/Topbar'

function App() {
  return (
    <div className="h-screen w-screen flex flex-col pt-12">
      <TitleBar />
      <div className="h-full px-6">
        <TopBar/>
        <div className="flex flex-row justify-between">
        <TextEditor/>
        </div>
      </div>
    </div>
  )
}

export default App;

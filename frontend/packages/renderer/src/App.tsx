import * as React from 'react';
import { nanoid } from 'nanoid';
import PdfViewer from './components/PdfViewer';
import TextDocument from './components/TextDocument';
import TitleBar from './components/title-bar'
import TopBar from './components/Topbar'
import SearchResults from './components/SearchResults';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/Auth';

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen w-screen flex flex-col pt-12">
        <TitleBar />
        <div className="h-full px-6 overflow-hidden">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<AuthPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

function HomePage() {
  return (
    <>
      <TopBar />
      <Link to={'/login'} > Go To Login Page </Link>
      <div className="flex flex-row justify-between h-full pl-20">
        <TextDocument title={'Class Project 499 Capstone'} author={'Rahul Batra'} tags={[{ id: nanoid(), tagName: 'Research' }]} text={''} />
        {/* <div className="w-full h-full">
      <img src={'./logo.png'} />
    </div> */}
        <SearchResults />
        <PdfViewer />
      </div>
    </>
  );
}

export default App;

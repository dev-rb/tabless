import * as React from 'react';
import { nanoid } from 'nanoid';
import PdfViewer from './components/PdfViewer';
import TextDocument from './components/TextDocument';
import TitleBar from './components/title-bar'
import TopBar from './components/Topbar'
import SearchResults from './components/SearchResults';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { AuthState, signOutLocal } from './redux/slices/authSlice';
import { IRootState } from './redux/store';
import SignupPage from './pages/Auth/Signup';
import HomePage from './pages/Home';

function App() {
  const currUser = useSelector((state: IRootState) => state.authReducer.user);


  React.useEffect(() => {
    if (currUser) {
      console.log("Current User: ", currUser)
    }
  }, [currUser])
  return (
    <BrowserRouter>
      <div className="h-screen w-screen flex flex-col pt-12">
        <TitleBar />
        <div className="h-full px-6 overflow-hidden">
          <Routes>
            <Route path='/' element={currUser !== null ? <HomePage /> : <Navigate to='/login' />} />
            <Route path='/login' element={<AuthPage />} />
            <Route path='/signup' element={<SignupPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}


export default App;

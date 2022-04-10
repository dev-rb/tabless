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
            <Route path='/login' element={<AuthPage />} >

            </Route>
            <Route path='/signup' element={<SignupPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
const auth = getAuth();

function HomePage() {

  const dispatch = useDispatch();

  return (
    <>
      <TopBar />
      <Link to={'/login'} > Go To Login Page </Link>
      <button onClick={() => { dispatch(signOutLocal()); signOut(auth); }} > Signout </button>
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

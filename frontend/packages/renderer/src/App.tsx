import * as React from 'react';
import TitleBar from './components/title-bar'
import TopBar from './components/Topbar'
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import AuthPage from './pages/Auth';
import { useSelector } from 'react-redux';
import { IRootState } from './redux/store';
import SignupPage from './pages/Auth/Signup';
import HomePage from './pages/Home';
import DocumentPage from './pages/DocumentPage';
import FoldersPage from './pages/FoldersPage';
import HistoryRouter from './components/HistoryRouter';
import { history } from './components/HistoryRouter/history';
import { ModalsProvider } from '@mantine/modals';

function App() {
  return (
    <HistoryRouter history={history}>
      <div className="h-screen w-screen flex flex-col">
        <TitleBar />
        <div className="h-full overflow-hidden">
          <Routes>
            <Route path='/' element={<RequireAuth />} >
              <Route index element={<HomePage />} />
              <Route path='/document/:documentId' element={<DocumentPage />} />
              <Route path='/folders' element={<FoldersPage />} >
                <Route index element={<FoldersPage.Home />} />
                <Route path=':folderId' element={<FoldersPage.Content />} />
              </Route>
            </Route>
            <Route path='/login' element={<AuthPage />} />
            <Route path='/signup' element={<SignupPage />} />
          </Routes>
        </div>
      </div>
    </HistoryRouter>
  )
}

const Layout = () => {
  return (
    <ModalsProvider>
      <div className="flex flex-col w-full h-full overflow-hidden">
        <TopBar />
        <div className="px-6 w-full h-full">
          <Outlet />
        </div>
      </div>
    </ModalsProvider>
  );
}

const RequireAuth = () => {
  const currUser = useSelector((state: IRootState) => state.auth.user);
  const location = useLocation();
  if (!currUser) {
    return <Navigate to='/login' replace state={{ from: location.pathname, to: '/login' }} />;
  }
  return <Layout />;
}


export default App;

import * as React from 'react';
import TitleBar from './components/title-bar'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from './redux/store';
import HomePage from './pages/Home';
import DocumentPage from './pages/DocumentPage';
import FoldersPage from './pages/FoldersPage';
import HistoryRouter from './components/HistoryRouter';
import { history } from './components/HistoryRouter/history';
import { ModalsProvider } from '@mantine/modals';
import TopBar from './components/Topbar/Topbar';
import { SignInPage, SignupPage } from './pages/Auth';
import { Box, MantineProvider } from '@mantine/core';
import { theme } from './utils/theme';

function App() {
  return (
    <MantineProvider theme={theme}>
      <HistoryRouter history={history}>
        <Box sx={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
          <TitleBar />
          <Box sx={{ height: '100%', overflow: 'hidden' }}>
            <Routes>
              <Route path='/' element={<RequireAuth />} >
                <Route index element={<HomePage />} />
                <Route path='/document/:documentId' element={<DocumentPage />} />
                <Route path='/folders' element={<FoldersPage />} >
                  <Route index element={<FoldersPage.Home />} />
                  <Route path=':folderId' element={<FoldersPage.Content />} />
                </Route>
              </Route>
              <Route path='/login' element={<SignInPage />} />
              <Route path='/signup' element={<SignupPage />} />
            </Routes>
          </Box>
        </Box>
      </HistoryRouter>
    </MantineProvider>
  )
}

const Layout = () => {
  return (
    <ModalsProvider>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', overflow: 'hidden' }}>
        <TopBar />
        <Box sx={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', width: '100%', height: '100%' }}>
          <Outlet />
        </Box>
      </Box>
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

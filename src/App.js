import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './styles/colors.css';
import './styles/constants.css';
import './index.css';
import NotAuthProvider from './providers/NotAuthProvider';
import { useTheme } from '@mui/material/styles';
import AuthProvider from './providers/AuthProvider';
import Translation from './translation/Translation';
import { IntlProvider } from 'react-intl';
import { useConstants } from './hooks/UseConstants';
import AuthRoutes from './routes/AuthRoutes';
import CategoryRoutes from './routes/CategoryRoutes';
import Sidebar from './components/Sidebar';
import UserRoutes from './routes/UserRoutes';
import 'react-phone-input-2/lib/style.css';
import { useEffect } from 'react';
import DashboardRoutes from './routes/DashboardRoutes';

function App() {
  const { language } = useConstants();
  const theme = useTheme();
  const messages = Translation();

  return (
    <main>
      <div className="App" style={{ backgroundColor: theme.palette.background.default }}>
        <BrowserRouter basename="/">
          <IntlProvider locale={language} messages={messages[language]}>
            <Routes>
              {
                AuthRoutes().map((route, index) =>
                  <Route key={index} path={route.path} element={route.element} />
                )
              }
              {
                CategoryRoutes().map((route, index) =>
                  <Route key={index} path={route.path} element={<AuthProvider><Sidebar />{route.element}</AuthProvider>} />
                )
              }
              {
                UserRoutes().map((route, index) =>
                  <Route key={index} path={route.path} element={<AuthProvider><Sidebar />{route.element}</AuthProvider>} />
                )
              }
              {
                DashboardRoutes().map((route, index) =>
                  <Route key={index} path={route.path} element={<AuthProvider><Sidebar />{route.element}</AuthProvider>} />
                )
              }
            </Routes>
          </IntlProvider>
        </BrowserRouter>
      </div>
    </main>
  );
}

export default App;

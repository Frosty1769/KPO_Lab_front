import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router';
import { AuthProvider, useAuth } from './hooks/AuthContext';
import type { AuthOut } from './interfaces/Auth';
import { Path } from './enums/Path';
import { Check } from './api/functions';
import { useEffect } from 'react';
import type { ResponseContainer } from './api/base';
import AuthPage from './pages/AuthPage';
import AdminPage from './pages/AdminPage';
import CashierPage from './pages/CashierPage';
import { ToastContainer } from 'react-toastify';
import CheckIcon from './icons/CheckIcon';
import InfoIcon from './icons/InfoIcon';
import clsx from 'clsx';

function InnerApp() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const onAuth = (data: AuthOut) => {
    setAuth({
      id: data.id,
      role: data.role,
      name: data.username,
      isAdmin: data.isAdmin,
    });
    
    // Перенаправляем в зависимости от роли
    if (data.isAdmin) {
      navigate(Path.Admin, { replace: true });
    } else {
      navigate(Path.Cashier, { replace: true });
    }
  };

  useEffect(() => {
    Check((resp: ResponseContainer<AuthOut>) => {
      if (resp.status === 'ok' && resp.data) {
        onAuth(resp.data);
      }
    });
  }, []);

  const onLogout = () => {
    setAuth({
      id: null,
      name: null,
      role: null,
      isAdmin: false,
    });
    navigate(Path.Auth, { replace: true });
  };

  const getRoutes = () => {
    if (!auth.role) {
      // Не авторизован
      return (
        <>
          <Route path={Path.Auth} element={<AuthPage onAuth={onAuth} />} />
          <Route path='*' element={<Navigate to={Path.Auth} replace />} />
        </>
      );
    }

    if (auth.isAdmin) {
      // Админ
      return (
        <>
          <Route path={Path.Admin} element={<AdminPage onLogout={onLogout} username={auth.name || ''} />} />
          <Route path='*' element={<Navigate to={Path.Admin} replace />} />
        </>
      );
    }

    // Кассир
    return (
      <>
        <Route path={Path.Cashier} element={<CashierPage onLogout={onLogout} username={auth.name || ''} />} />
        <Route path='*' element={<Navigate to={Path.Cashier} replace />} />
      </>
    );
  };

  return (
    <Routes>
      {getRoutes()}
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <InnerApp />
        <ToastContainer
          icon={({ type }) => {
            switch (type) {
              case 'success':
                return <CheckIcon className='text-green-600' size={24} />;
              case 'error':
                return <InfoIcon className='text-red-600' size={24} />;
              default:
                return null;
            }
          }}
          className='w-64'
          toastClassName='min-h-15 min-h-0 rounded-xl bg-white p-4 shadow-lg'
          bodyClassName='flex items-center gap-3 text-black'
          progressClassName='h-0'
          hideProgressBar={true}
          closeButton={false}
          draggable={false}
          position='top-right'
          autoClose={3000}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

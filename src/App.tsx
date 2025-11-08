import './App.css'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router'
import { AuthProvider, useAuth } from './hooks/AuthContext'
import type { AuthOut } from './interfaces/Auth';
import { Path } from './enums/Path';
import { Check, Logout } from './api/functions';
import { useEffect } from 'react';
import type { ResponseContainer } from './api/base';
import AuthPage from './pages/AuthPage';
import { ToastContainer } from 'react-toastify';
import CheckIcon from './icons/CheckIcon';
import InfoIcon from './icons/InfoIcon';
import clsx from 'clsx';
import Button from './inputs/Button';

function InnerApp() {
	const [auth, setAuth] = useAuth();
	const navigate = useNavigate();
	const path = useLocation().pathname;

	// const [isChecked, setIsChecked] = useState<boolean>(false);

	const onAuth = (data: AuthOut) => {
		setAuth({
      id: data.id,
      role: data.role,
      name: data.name,
      isAdmin: false,
		});
		if (path === Path.Auth) {
			navigate('/', { replace: true });
		}
	};

  const onLogout = () => {
		Logout(() => {
			setAuth({
				id: null,
				name: null,
				role: null,
				isAdmin: false,
			});
			navigate('/', { replace: true });
		});
	};

	useEffect(() => {
		Check((resp: ResponseContainer<AuthOut>) => {
			// setIsChecked(true);
			if (resp.status === 'ok') if (resp.data) onAuth(resp.data);
		});
	}, []);

	// const Layout = () => {
	// 	return (
	// 		<>
	// 			<Header onLogout={onLogout} />
	// 			<div className='flex w-full min-w-[1280px] flex-1 flex-col overflow-hidden bg-white'>
	// 				<Outlet />
	// 			</div>
	// 		</>
	// 	);
	// };

	return (
  <>
    {auth.role !== null && <Button className='absolute !w-5 !h-8 rounded-full right-4 top-4' onClick={()=>onLogout()}>Выйти</Button>}
    <Routes>
      {auth.role === null ? (
				<>
          <Route path={Path.Auth} element={<AuthPage onAuth={onAuth} />} />
          <Route
            path='*'
            element={<Navigate to={Path.Auth} replace={true} />}
          />
        </>) : (
          <>          
            {/* <Route path={Path.Home} element={<HomePage/>}/>
            <Route path={Path.Master} element={<MasterPage/>}/>
            <Route path={Path.Player} element={<PlayerPage userName={auth.name || ''} userId={auth.id || ''}/>}/>
            <Route path={Path.Character} element={<CharacterPage/>}/> */}
            <Route
              path='*'
              element={<Navigate to={Path.Home} replace></Navigate>}
            />
          </>)}
    </Routes>
  </>)
}

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          {/* <TooltipProvider> */}
              <InnerApp/>
          {/* </TooltipProvider> */}
          <ToastContainer
            icon={({ type }) => {
                  switch (type) {
                    case 'success':
                      return <CheckIcon className='text-accent' size={24} />;
                    case 'error':
                      return <InfoIcon className='text-system-red' size={24} />;
                    default:
                      return null;
                  }
                }}
                //@ts-ignore
                className={({ defaultClassName }) => clsx(defaultClassName, 'w-64')}
                //@ts-ignore
                toastClassName={({ defaultClassName }) =>
                  clsx(
                    defaultClassName,
                    'min-h-15 min-h-0 rounded-xl bg-white p-4 shadow-1'
                  )
                }
                //@ts-ignore
                bodyClassName={({ defaultClassName }) =>
                  clsx(
                    defaultClassName,
                    'flex items-center gap-3 text-black [&>div]:first:me-0 [&>div]:first:w-auto'
                  )
                }
                //@ts-ignore
                progressClassName={({ defaultClassName }) =>
                  clsx(defaultClassName, 'h-0')
                }
                hideProgressBar={true}
                closeButton={false}
                draggable={false}
                pauseOnHover
                position='bottom-left'
            autoClose={2000}
          />
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App

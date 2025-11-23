import React, { createContext, useContext, useMemo, useState } from 'react';

interface IAuth {
	id: number | null;
	name: string | null;
	role: 'admin' | 'cashier' | null;
	isAdmin: boolean;
}

type IAuthContext = [IAuth, React.Dispatch<React.SetStateAction<IAuth>>];

const AuthContext = createContext<IAuthContext>([
	{
        id: null,
        name: null,
        role: null,
        isAdmin: false,
	},
	() => null,
]);

function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within a AuthProvider');
	}
	return context;
}

function AuthProvider(props: any) {
	const [auth, setAuth] = useState<IAuth>({
        id: null,
        name: null,
        role: null,
        isAdmin: false,
	});

	const value = useMemo(() => [auth, setAuth], [auth]);

	return <AuthContext.Provider value={value} {...props} />;
}

export { AuthProvider, useAuth };

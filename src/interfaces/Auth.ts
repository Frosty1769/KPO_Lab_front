export interface AuthOut {
    id: number;
    username: string;
    role: 'admin' | 'cashier';
    isAdmin: boolean;
}

export interface AuthIn {
    username: string;
    password: string;
}

export interface UserRegister {
    username: string;
    password: string;
    role?: 'admin' | 'cashier';
}
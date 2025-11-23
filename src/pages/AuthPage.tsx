import { useState } from "react";
import type { AuthIn, AuthOut } from "../interfaces/Auth";
import { Login } from "../api/functions";
import { toast } from "react-toastify";
import Typography from "../Typography";
import TextBox from "../inputs/TextBox";
import Button from "../inputs/Button";

interface Props {
    onAuth(data: AuthOut): void;
}

const AuthPage = (props: Props) => {
    const [userInfo, setUserInfo] = useState<AuthIn>({username: '', password: ''});
    const [error, setError] = useState<string>();

    const onLogin = () => {
        if (!userInfo.username || !userInfo.password) {
            setError("Заполните все поля");
            return;
        }

        Login(userInfo, (res) => {
            if (res.status === 'ok' && res.data) {
                toast.success(`Добро пожаловать, ${res.data.username}`);
                props.onAuth(res.data);
            } else {
                toast.error(res.message || "Ошибка входа");
                setError(res.message);
            }
        });
    }

    return (
        <div className='w-full h-full flex items-center justify-center bg-gray-100'>
            <div className='w-[400px] flex flex-col p-8 rounded-lg bg-white shadow-lg gap-6'>
                <Typography size='h2'>Вход в систему</Typography>
                <div className='flex flex-col gap-4 w-full'>
                    <TextBox 
                        error={error !== undefined}
                        description={error}
                        placeholder='Логин'
                        value={userInfo.username}
                        onChange={(e) => {
                            setUserInfo({...userInfo, username: e.target.value});
                            if (error) setError(undefined);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') onLogin();
                        }}
                    />
                    <TextBox
                        type='password'
                        placeholder='Пароль'
                        value={userInfo.password}
                        onChange={(e) => {
                            setUserInfo({...userInfo, password: e.target.value});
                            if (error) setError(undefined);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') onLogin();
                        }}
                    />
                </div>
                <Button className='mt-2' onClick={onLogin}>
                    <Typography size='h4'>Войти</Typography>
                </Button>
            </div>
        </div>
    );
}

export default AuthPage;
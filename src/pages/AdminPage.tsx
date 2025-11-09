import { useState } from "react";
import type { AuthIn, AuthOut } from "../interfaces/Auth";
import { useNavigate } from "react-router";
import { Login, Logout, Register } from "../api/functions";
import { toast } from "react-toastify";
import Typography from "../Typography";
import TextBox from "../inputs/TextBox";
import Button from "../inputs/Button";
import { Path } from "../enums/Path";
import { useAuth } from "../hooks/AuthContext";

interface Props {
    onLogout: () => void
}

const AdminPage = ({
    onLogout,
    ...props
}: Props) => {
    const navigate = useNavigate()
    const [auth, setAuth] = useAuth()



    return (
        <div className='w-full h-full flex items-center justify-center'>
            {auth.role !== null && <Button className='absolute w-5! h-8! rounded-full right-4 top-4' onClick={onLogout}>Выйти</Button>}

            <div className="flex flex-col gap-4 py-4">
                <Button onClick={() => navigate(Path.Checkout)} variant="primary">Касса</Button>
                <Button onClick={() => navigate(Path.Stash)} variant="primary">Склад</Button>
            </div>
        </div>
    )
}

export default AdminPage;
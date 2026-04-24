import { useState, type JSX } from "react";
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import AuthRequests from "../../fetch/AuthRequests";

interface CustomMenuItem extends MenuItem {
    badge?: number;
    shortcut?: string;
    items?: CustomMenuItem[];
}

function Navegacao(): JSX.Element {
    const [isAuthenticated] = useState(() => {
        const isAuth = localStorage.getItem('isAuth');
        const token = localStorage.getItem('token');
        return !!(isAuth && token && AuthRequests.checkTokenExpiry());
    });
    const navigate = useNavigate();

    const nome = localStorage.getItem('nome') || 'Usuário';
    const email = localStorage.getItem('email') || '';
   
    const items: CustomMenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            className: 'm-5 text-white text-lg',
            url: "/"
        },
        ...(isAuthenticated ? [
            {
                label: 'Alunos',
                icon: 'pi pi-users',
                className: 'm-5 text-white text-lg',
                url: "/lista/alunos"
            },
            {
                label: 'Planos',
                icon: 'pi pi-id-card',
                className: 'm-5 text-white text-lg',
                url: "/lista/planos"
            },
            {
                label: 'Matrículas',
                icon: 'pi pi-file-edit',
                className: 'm-5 text-white text-lg',
                url: "/lista/matriculas"
            }
        ] : [])
    ];

    const start = (
        <img
            alt="logo"
            src='./src/assets/app-icon.png'
            height="100"
            className="w-[40%] max-w-[40%] ml-10"
        />
    );

    const userActions = isAuthenticated ? (
        <div className="flex items-center justify-end gap-6 mr-6">
            <div className="flex flex-col pr-3 border-r border-orange-500 pr-6">
                <p className="text-white font-semibold m-0 text-sm">{nome}</p>
                <p className="text-gray-400 text-xs m-0">{email}</p>
            </div>
            <Avatar
                
                shape="circle"
                className="!w-10 !h-10 !bg-orange-500"
            />
            <button
                className="bg-orange-500 hover:bg-orange-600 transition-all text-white px-6 py-2 rounded-lg border-none cursor-pointer flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-orange-500/50"
                onClick={AuthRequests.removeToken}
                style={{ height: '40px', fontSize: '14px' }}
            >
                <i className="pi pi-sign-out"></i>
                <span>Sair</span>
            </button>
        </div>
    ) : (
        <button
            className="bg-orange-500 hover:bg-orange-600 transition-all font-bold text-white px-8 py-2 mr-6 rounded-lg border-none cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/50"
            onClick={() => navigate('/login')}
            style={{ height: '40px', fontSize: '14px' }}
        >
            <i className="pi pi-sign-in"></i>
            <span>Login</span>
        </button>
    );

    return (
        <header className="card h-[12vh] bg-black shadow-2xl flex items-center px-6 border-b-4 border-orange-500">
            <div className="flex-1">
                <Menubar
                    model={items}
                    start={start}
                    className="!bg-black !border-0 !p-0"
                    style={{
                        backgroundColor: 'black',
                        border: 'none',
                        boxShadow: 'none'
                    }}
                />
            </div>
            {userActions}
        </header>
    );
}

export default Navegacao;
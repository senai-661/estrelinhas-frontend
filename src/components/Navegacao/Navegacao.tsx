import { useState, type JSX } from "react";
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import AuthRequests from "../fetch/AuthRequest";
import appIcon from "../../assets/vite.svg";

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
    const avatarImage = "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png";

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
                icon: 'pi pi-star',
                className: 'm-5 text-white text-lg',
                url: "/lista/alunos"
            },
            {
                label: 'Livros',
                icon: 'pi pi-star',
                className: 'm-5 text-white text-lg',
                url: "/lista/livros"
            },
            {
                label: 'Empréstimos',
                icon: 'pi pi-star',
                className: 'm-5 text-white text-lg',
                url: "/lista/emprestimos"
            }
        ] : [])
    ];

    const start = (
        <img
            alt="logo"
            src={appIcon}
            height="100"
            className="h-20 p-3 ml-10 mr-5 h-[7rem]"
        />
    );

    const end = isAuthenticated ? (
        <div className="flex align-items-center gap-3 mr-10">
            <div className="flex flex-col text-right">
                <p className="text-white font-semibold m-0">{nome}</p>
                <p className="text-white text-sm m-0">{email}</p>
            </div>

            <Avatar
                image={avatarImage}
                shape="circle"
                className="!w-[40px] !h-[40px]"
            />

            <button
                className="bg-white text-slate-700 px-4 py-2 rounded border-none cursor-pointer flex items-center gap-2 hover:bg-gray-100 transition-colors"
                onClick={AuthRequests.removeToken}
            >
                <i className="pi pi-sign-out"></i>
                <span>Sair</span>
            </button>
        </div>
    ) : (
        <button
            className="bg-white text-slate-700 px-4 py-2 mr-10 rounded border-none cursor-pointer flex items-center gap-2 hover:bg-gray-100 transition-colors"
            onClick={() => navigate('/login')}
        >
            <i className="pi pi-sign-in"></i>
            <span>Login</span>
        </button>
    );

    return (
        <header className="card h-[12vh] bg-slate-700 content-center">
            <Menubar
                model={items}
                start={start}
                end={end}
            />
        </header>
    );
}

export default Navegacao;
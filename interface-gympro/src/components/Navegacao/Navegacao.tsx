import { useEffect, useState, type JSX } from "react";
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import { Avatar } from 'primereact/avatar';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthRequests from "../fetch/AuthRequests";

import professorFoto from "../../assets/personal.webp";

interface CustomMenuItem extends MenuItem {
    badge?: number;
    shortcut?: string;
    items?: CustomMenuItem[];
}

function Navegacao(): JSX.Element {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const isAuth = localStorage.getItem('isAuth');
        const token = localStorage.getItem('token');
        return !!(isAuth && token && AuthRequests.checkTokenExpiry());
    });
    const [role, setRole] = useState(() => localStorage.getItem('role') || 'normal');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAuth = () => {
            const isAuth = localStorage.getItem('isAuth');
            const token = localStorage.getItem('token');
            const authenticated = !!(isAuth && token && AuthRequests.checkTokenExpiry());
            setIsAuthenticated(authenticated);
            setRole(localStorage.getItem('role') || 'normal');
        };
        checkAuth();
        const interval = setInterval(checkAuth, 1000);
        return () => clearInterval(interval);
    }, []);

    const nome = localStorage.getItem('nome') || 'Usuário';
    const email = localStorage.getItem('email') || '';
    const fotoPerfil = role === 'admin' ? professorFoto : null;

    const menuProfessor: CustomMenuItem[] = [
        { label: 'Home', icon: 'pi pi-home', command: () => navigate("/"), data: { path: '/' } },
        { label: 'Alunos', icon: 'pi pi-users', command: () => navigate("/lista/alunos"), data: { path: '/lista/alunos' } },
        { label: 'Matrículas', icon: 'pi pi-file', command: () => navigate("/lista/matriculas"), data: { path: '/lista/matriculas' } },
        { label: 'Planos', icon: 'pi pi-id-card', command: () => navigate("/lista/planos"), data: { path: '/lista/planos' } }
    ];

    const menuAluno: CustomMenuItem[] = [
        { label: 'Home', icon: 'pi pi-home', command: () => navigate("/"), data: { path: '/' } },
        { label: 'Meu Treino', icon: 'pi pi-bolt', command: () => navigate("/aluno/treino"), data: { path: '/aluno/treino' } },
        { label: 'Pagamentos', icon: 'pi pi-wallet', command: () => navigate("/aluno/pagamentos"), data: { path: '/aluno/pagamentos' } },
        { label: 'Unidades', icon: 'pi pi-map-marker', command: () => navigate("/aluno/unidades"), data: { path: '/aluno/unidades' } }
    ];

    const baseItems: CustomMenuItem[] = isAuthenticated
        ? (role === 'admin' ? menuProfessor : menuAluno)
        : [{ label: 'Home', icon: 'pi pi-home', command: () => navigate("/"), data: { path: '/' } }];

    const items: CustomMenuItem[] = baseItems.map((item) => {
        const isActive = item.data?.path && (
            item.data.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.data.path)
        );
        return {
            ...item,
            className: isActive ? 'nav-item-active' : 'nav-item'
        };
    });

    const start = (
        <img
            src="/favicon.svg"
            alt="GymPro logo"
            className="app-logo"
            onClick={() => navigate("/")}
        />
    );

    const userActions = isAuthenticated ? (
        <div className="nav-actions">
            <div className="nav-user-info">
                <strong>{nome}</strong>
                <small>{email}</small>
            </div>

            {fotoPerfil ? (
                <Avatar
                    image={fotoPerfil}
                    shape="circle"
                    className="nav-avatar"
                />
            ) : (
                <div className="nav-avatar-fallback">
                    {nome.charAt(0).toUpperCase()}
                </div>
            )}

            <button
                type="button"
                className="nav-ghost-btn"
                onClick={AuthRequests.removeToken}
            >
                <i className="pi pi-sign-out" />
                Sair
            </button>
        </div>
    ) : (
        <button
            type="button"
            className="nav-ghost-btn"
            onClick={() => navigate('/login')}
        >
            <i className="pi pi-sign-in" />
            Login
        </button>
    );

    return (
        <header className="app-header">
            <div className="app-header-inner">
                <Menubar model={items} start={start} />
                {userActions}
            </div>
        </header>
    );
}

export default Navegacao;
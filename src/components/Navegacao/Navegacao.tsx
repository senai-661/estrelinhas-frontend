import { useState, type JSX } from "react";
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import AuthRequests from "../../fetch/AuthRequests";
import logo from "../../assets/ChatGPT_Image_24_de_abr._de_2026__14_18_05-removebg-preview.png";
import professorFoto from "../../assets/4364004.webp";
import { useEffect } from 'react'

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
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const isAuth = localStorage.getItem('isAuth');
            const token = localStorage.getItem('token');
            const authenticated = !!(isAuth && token && AuthRequests.checkTokenExpiry());
            setIsAuthenticated(authenticated);
        };

        checkAuth();

        const interval = setInterval(checkAuth, 1000);

        return () => clearInterval(interval);
    }, []);

    const nome = localStorage.getItem('nome') || 'Usuário';
    const email = localStorage.getItem('email') || '';
   
    const items: CustomMenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            className: 'm-5 text-lg',
            command: () => navigate("/")
        },
        ...(isAuthenticated ? [
            {
                label: 'Alunos',
                icon: 'pi pi-users',
                className: 'm-5 text-lg',
                command: () => navigate("/lista/alunos")
            },
            {
                label: 'Matrículas',
                icon: 'pi pi-file',
                className: 'm-5 text-lg',
                command: () => navigate("/lista/matriculas")
            },
            {
                label: 'Planos',
                icon: 'pi pi-id-card',
                className: 'm-5 text-lg',
                command: () => navigate("/lista/planos")
            }
        ] : [])
    ];

    const start = (
        <img
            alt="logo"
            src={logo}
            style={{ width: '140px', maxWidth: '140px', marginLeft: '10px' }}
        />
    );

    const userActions = isAuthenticated ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '24px', marginRight: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '24px', borderRight: '1px solid rgba(255, 115, 0, 0.35)' }}>
                <p style={{ color: '#111111', fontWeight: 600, margin: 0, fontSize: '0.9rem' }}>{nome}</p>
                <p style={{ color: '#8a8a8a', fontSize: '0.75rem', margin: 0 }}>{email}</p>
            </div>
            <Avatar
                image={professorFoto}
                shape="circle"
                style={{ width: '50px', height: '50px', border: '3px solid rgba(255, 255, 255, 0.8)' }}
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
        <>
            <style>
                {`
                    .p-menubar .p-menuitem-link {
                        color: #000000 !important;
                        font-weight: 600 !important;
                        padding: 12px 16px !important;
                        border-radius: 8px !important;
                        margin: 0 4px !important;
                        transition: all 0.3s ease !important;
                        font-size: 1rem !important;
                        text-decoration: none !important;
                    }
                    .p-menubar .p-menuitem-link:hover {
                        color: #000000 !important;
                        background-color: rgba(255, 255, 255, 0.15) !important;
                        transform: translateY(-2px) !important;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
                    }
                    .p-menubar .p-menuitem-icon {
                        color: #000000 !important;
                        margin-right: 8px !important;
                        font-size: 1.1rem !important;
                    }
                    .p-menubar .p-menuitem-link:not(.router-link-active):hover .p-menuitem-icon {
                        color: #000000 !important;
                    }
                    .p-menubar {
                        padding: 8px 0 !important;
                    }
                `}
            </style>
            <header style={{
                height: '12vh',
                backgroundColor: '#ff7300',
                backgroundImage: 'linear-gradient(90deg, #ff7300 0%, #ff8c00 100%)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 24px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.15)'
            }}>
                <div style={{ flex: 1 }}>
                    <Menubar
                        model={items}
                        start={start}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            boxShadow: 'none'
                        }}
                    />
                </div>
                {userActions}
            </header>
        </>
    );
}

export default Navegacao;
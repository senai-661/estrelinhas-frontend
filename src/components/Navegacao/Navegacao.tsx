import { useEffect, useState, type JSX } from "react";
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import { Avatar } from 'primereact/avatar';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthRequests from "../../fetch/AuthRequests";
import logo from "../../assets/gympro.png";
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

    // Injeta className de ativo com base na rota atual
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
            alt="GymPro logo"
            src={logo}
            style={{ width: '120px', marginLeft: '4px', cursor: 'pointer' }}
            onClick={() => navigate("/")}
        />
    );

    const userActions = isAuthenticated ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginRight: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <p style={{ color: '#ffffff', fontWeight: 700, margin: 0, fontSize: '0.85rem', lineHeight: 1.2 }}>{nome}</p>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.72rem', margin: 0 }}>{email}</p>
            </div>

            {fotoPerfil ? (
                <Avatar
                    image={fotoPerfil}
                    shape="circle"
                    style={{ width: '42px', height: '42px', border: '2px solid rgba(255,255,255,0.5)', cursor: 'pointer' }}
                />
            ) : (
                <div style={{
                    width: '42px', height: '42px', borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    border: '2px solid rgba(255,255,255,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#ffffff', fontWeight: 800, fontSize: '1rem', cursor: 'pointer'
                }}>
                    {nome.charAt(0).toUpperCase()}
                </div>
            )}

            <button
                onClick={AuthRequests.removeToken}
                style={{
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    border: '1.5px solid rgba(255,255,255,0.35)',
                    color: '#ffffff',
                    padding: '7px 18px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '6px',
                    fontWeight: 700, fontSize: '13px',
                    transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)')}
            >
                <i className="pi pi-sign-out" style={{ fontSize: '13px' }}></i>
                Sair
            </button>
        </div>
    ) : (
        <button
            onClick={() => navigate('/login')}
            style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                border: '1.5px solid rgba(255,255,255,0.35)',
                color: '#ffffff',
                padding: '7px 20px',
                borderRadius: '8px',
                marginRight: '16px',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
                fontWeight: 700, fontSize: '13px'
            }}
        >
            <i className="pi pi-sign-in" style={{ fontSize: '13px' }}></i>
            Login
        </button>
    );

    return (
        <>
            <style>{`
                .p-menubar {
                    background: transparent !important;
                    border: none !important;
                    box-shadow: none !important;
                    padding: 0 !important;
                }
                .p-menubar .p-menuitem-link {
                    color: rgba(255,255,255,0.85) !important;
                    font-weight: 700 !important;
                    font-size: 0.9rem !important;
                    padding: 8px 14px !important;
                    border-radius: 8px !important;
                    margin: 0 2px !important;
                    transition: all 0.2s ease !important;
                    text-decoration: none !important;
                    display: flex !important;
                    align-items: center !important;
                    gap: 6px !important;
                }
                .p-menubar .p-menuitem-link:hover {
                    background-color: rgba(255,255,255,0.15) !important;
                    color: #ffffff !important;
                }
                .p-menubar .p-menuitem-icon {
                    color: rgba(255,255,255,0.75) !important;
                    font-size: 0.85rem !important;
                    margin-right: 0 !important;
                }
                .nav-item-active .p-menuitem-link {
                    background-color: rgba(255,255,255,0.2) !important;
                    color: #ffffff !important;
                }
                .nav-item-active .p-menuitem-link .p-menuitem-icon {
                    color: #ffffff !important;
                }
                .p-menubar .p-menubar-root-list {
                    gap: 2px !important;
                }
            `}</style>

            <header style={{
                height: '72px',
                backgroundColor: '#ff7a2b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                position: 'sticky',
                top: 0,
                zIndex: 50,
                width: '100%'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingLeft: '28px', paddingRight: '28px' }}>
                    <Menubar model={items} start={start} />
                    {userActions}
                </div>
            </header>
        </>
    );
}

export default Navegacao;
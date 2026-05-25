import { useState, type JSX } from "react";
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import AuthRequests from "../../fetch/AuthRequests";

function Navegacao(): JSX.Element {
    const [isAuthenticated] = useState(() => {
        const isAuth = localStorage.getItem('isAuth');
        const token = localStorage.getItem('token');
        return !!(isAuth && token && AuthRequests.checkTokenExpiry());
    });

    const navigate = useNavigate();
    const nome = localStorage.getItem('nome') || 'Usuário';
    const email = localStorage.getItem('email') || '';
    const isAdmin = localStorage.getItem('role') === 'admin';

    const items: MenuItem[] = [
        {
            label: 'Início',
            url: "/"
        },
        ...(isAuthenticated && isAdmin ? [
            {
                label: 'Alunos',
                url: "/lista/alunos"
            },
            {
                label: 'Matrículas',
                url: "/lista/matriculas"
            },
            {
                label: 'Planos',
                url: "/lista/planos"
            }
        ] : [])
    ];

    const start = (
        <span style={{ color: '#ffffff', fontWeight: '700', fontSize: '1.4rem', marginRight: '1rem' }}>
            Gym Pro
        </span>
    );

    const end = isAuthenticated ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginRight: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#ffffff', fontWeight: '600', fontSize: '0.9rem' }}>{nome}</span>
                <span style={{ color: '#ffffff', fontSize: '0.8rem' }}>{email}</span>
            </div>
            <Avatar
                label={nome.charAt(0).toUpperCase()}
                shape="circle"
                style={{ backgroundColor: '#ffffff', color: '#ff7300', fontWeight: '700' }}
            />
            <button
                onClick={AuthRequests.removeToken}
                style={{ backgroundColor: '#ffffff', color: '#ff7300', border: 'none', borderRadius: '6px', padding: '8px 20px', fontWeight: '600', cursor: 'pointer' }}
            >
                Sair
            </button>
        </div>
    ) : (
        <button
            onClick={() => navigate('/login')}
            style={{ backgroundColor: '#ffffff', color: '#ff7300', border: 'none', borderRadius: '6px', padding: '8px 20px', fontWeight: '600', cursor: 'pointer', marginRight: '16px' }}
        >
            Login
        </button>
    );

    return (
        <header style={{ backgroundColor: '#ff7300' }}>
            <Menubar
                model={items}
                start={start}
                end={end}
                style={{ backgroundColor: '#ff7300', border: 'none', borderRadius: '0' }}
            />
        </header>
    );
}

export default Navegacao;
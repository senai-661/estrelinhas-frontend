import { useState, type JSX } from "react";
import { useNavigate } from 'react-router-dom';
import AuthRequests from "../../fetch/AuthRequests";

function Navegacao(): JSX.Element {
    const [isAuthenticated] = useState(() => {
        const isAuth = localStorage.getItem('isAuth');
        const token = localStorage.getItem('token');
        return !!(isAuth && token && AuthRequests.checkTokenExpiry());
    });

 
    const isProfessor = localStorage.getItem('role') === 'professor';

    const navigate = useNavigate();
    const nome = localStorage.getItem('nome') || 'Usuário';

    return (
        <header style={{ backgroundColor: '#F97316', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem' }}>
            <span style={{ color: 'white', fontWeight: '700', fontSize: '1.4rem' }}>Gym Pro</span>

            <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <a href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Início</a>
                {isAuthenticated && isProfessor && ( // ✅ só mostra se for professor
                    <>
                        <a href="/lista/alunos" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Alunos</a>
                        <a href="/lista/matriculas" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Matrículas</a>
                        <a href="/lista/planos" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>Planos</a>
                    </>
                )}
            </nav>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {isAuthenticated ? (
                    <>
                        <span style={{ color: 'white', fontWeight: '500' }}>{nome}</span>
                        <button
                            onClick={AuthRequests.removeToken}
                            style={{ backgroundColor: 'white', color: '#F97316', border: 'none', borderRadius: '6px', padding: '8px 20px', fontWeight: '600', cursor: 'pointer' }}
                        >
                            Sair
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => navigate('/login')}
                            style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid white', borderRadius: '6px', padding: '8px 20px', fontWeight: '600', cursor: 'pointer' }}
                        >
                            Entrar
                        </button>
                        <button
                            style={{ backgroundColor: 'white', color: '#F97316', border: 'none', borderRadius: '6px', padding: '8px 20px', fontWeight: '600', cursor: 'pointer' }}
                        >
                            Cadastre-se
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}

export default Navegacao;
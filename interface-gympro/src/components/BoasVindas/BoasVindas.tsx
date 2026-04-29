import { type JSX } from "react";

function BoasVindas(): JSX.Element {
    return (
        <main style={{ backgroundColor: '#F0F2F5', minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '4rem 2rem', textAlign: 'center' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: '1.1', color: '#111', margin: '0 0 1.5rem' }}>
                TRANSFORME SEU{' '}
                <span style={{ color: '#F97316' }}>CORPO</span>
                {' '}E{' '}
                <span style={{ color: '#F97316' }}>MENTE</span>
            </h1>

            <p style={{ fontSize: '1.1rem', color: '#444', maxWidth: '600px', lineHeight: '1.7', margin: '0 0 2.5rem' }}>
                A melhor academia da cidade está esperando por você. Equipamentos de última geração,
                professores qualificados e um ambiente motivador.
            </p>

            <button style={{ backgroundColor: '#F97316', color: 'white', border: 'none', borderRadius: '8px', padding: '14px 36px', fontSize: '1rem', fontWeight: '700', cursor: 'pointer' }}>
                Comece agora
            </button>
        </main>
    );
}

export default BoasVindas;
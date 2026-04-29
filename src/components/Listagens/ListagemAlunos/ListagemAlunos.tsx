import { type JSX } from "react";
import { useState, useEffect } from "react";
import AlunoRequests from "../../../fetch/AlunoRequests";
import type AlunoDTO from "../../../dto/AlunoDTO";

function ListagemAlunos(): JSX.Element {
    const [alunos, setAlunos] = useState<AlunoDTO[]>([]);
    const [busca, setBusca] = useState('');
    const [pagina, setPagina] = useState(1);
    const itensPorPagina = 6;

    useEffect(() => {
        const buscarAlunos = async () => {
            try {
                const listaDeAlunos = await AlunoRequests.obterListaDeAlunos();
                setAlunos(listaDeAlunos);
            } catch (error) {
                console.error(`Erro ao buscar alunos. ${error}`);
                alert("Erro ao criar a listagem de alunos.");
            }
        }
        buscarAlunos();
    }, []);

    const alunosFiltrados = alunos.filter(a =>
        `${a.nome} ${a.sobrenome}`.toLowerCase().includes(busca.toLowerCase())
    );

    const totalPaginas = Math.ceil(alunosFiltrados.length / itensPorPagina);
    const alunosPagina = alunosFiltrados.slice((pagina - 1) * itensPorPagina, pagina * itensPorPagina);

    const tdStyle = { padding: '14px 16px', borderBottom: '1px solid #f0f0f0', fontSize: '0.9rem', color: '#333' };
    const thStyle = { padding: '12px 16px', textAlign: 'left' as const, fontSize: '0.78rem', color: '#888', fontWeight: 600, textTransform: 'uppercase' as const, backgroundColor: '#fafafa' };

    return (
        <main style={{ minHeight: '88vh', backgroundColor: '#fff', padding: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 700, margin: 0 }}>Lista de Alunos</h1>
                <button style={{
                    backgroundColor: '#f97316', color: 'white', border: 'none',
                    borderRadius: '8px', padding: '10px 20px', fontWeight: 600, cursor: 'pointer'
                }}>
                    + Novo Aluno
                </button>
            </div>

            <input
                type="text"
                placeholder="Buscar aluno..."
                value={busca}
                onChange={e => { setBusca(e.target.value); setPagina(1); }}
                style={{
                    width: '100%', padding: '10px 14px', borderRadius: '8px',
                    border: '1px solid #e0e0e0', marginBottom: '20px',
                    fontSize: '0.9rem', boxSizing: 'border-box'
                }}
            />

            <div style={{ border: '1px solid #f0f0f0', borderRadius: '12px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Nome</th>
                            <th style={thStyle}>CPF</th>
                            <th style={thStyle}>Telefone</th>
                            <th style={thStyle}>Status</th>
                            <th style={{ ...thStyle, textAlign: 'center' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alunosPagina.map(aluno => (
                            <tr key={aluno.id_aluno} style={{ transition: 'background 0.2s' }}
                                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fff8f5')}
                                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#fff')}>
                                <td style={{ ...tdStyle, fontWeight: 600 }}>{aluno.nome} {aluno.sobrenome}</td>
                                <td style={tdStyle}>{aluno.cpf}</td>
                                <td style={tdStyle}>{aluno.celular}</td>
                                <td style={tdStyle}>
                                    <span style={{
                                        backgroundColor: aluno.status_aluno === 'Ativo' ? '#dcfce7' : '#fef9c3',
                                        color: aluno.status_aluno === 'Ativo' ? '#16a34a' : '#a16207',
                                        padding: '3px 12px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 600
                                    }}>
                                        {aluno.status_aluno ?? 'Ativo'}
                                    </span>
                                </td>
                                <td style={{ ...tdStyle, textAlign: 'center' }}>
                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                        <button style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid #bfdbfe', backgroundColor: '#eff6ff', color: '#3b82f6', fontSize: '0.8rem', cursor: 'pointer' }}>Detalhes</button>
                                        <button style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid #bbf7d0', backgroundColor: '#f0fdf4', color: '#16a34a', fontSize: '0.8rem', cursor: 'pointer' }}>Editar</button>
                                        <button style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid #fecaca', backgroundColor: '#fff1f2', color: '#ef4444', fontSize: '0.8rem', cursor: 'pointer' }}>Deletar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Paginação */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '6px', marginTop: '20px' }}>
                <button onClick={() => setPagina(p => Math.max(1, p - 1))} disabled={pagina === 1}
                    style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #e0e0e0', background: '#fff', cursor: 'pointer' }}>{'<'}</button>
                {Array.from({ length: totalPaginas }, (_, i) => (
                    <button key={i + 1} onClick={() => setPagina(i + 1)}
                        style={{
                            padding: '6px 12px', borderRadius: '6px', border: '1px solid #e0e0e0',
                            background: pagina === i + 1 ? '#f97316' : '#fff',
                            color: pagina === i + 1 ? '#fff' : '#333',
                            cursor: 'pointer', fontWeight: pagina === i + 1 ? 700 : 400
                        }}>{i + 1}</button>
                ))}
                <button onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))} disabled={pagina === totalPaginas}
                    style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #e0e0e0', background: '#fff', cursor: 'pointer' }}>{'>'}</button>
            </div>
        </main>
    );
}

export default ListagemAlunos;
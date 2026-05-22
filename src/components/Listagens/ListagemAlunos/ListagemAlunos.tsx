import { type JSX } from "react";
import { useState, useEffect } from "react";
import AlunoRequests from "../../../fetch/AlunoRequest";
import type AlunoDTO from "../../../dto/AlunoDTO";
import { useNavigate } from "react-router-dom";

function ListagemAlunos(): JSX.Element {
    const [alunos, setAlunos] = useState<AlunoDTO[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const navigate = useNavigate();

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

    // Lógica de Paginação
    const totalPages = Math.ceil(alunos.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentAlunos = alunos.slice(indexOfFirstRow, indexOfLastRow);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const tdStyle = { padding: '14px 16px', borderBottom: '1px solid #f0f0f0', fontSize: '0.9rem', color: '#333' };
    const thStyle = {
        padding: '12px 16px',
        textAlign: 'left' as const,
        fontSize: '0.78rem',
        color: '#888',
        fontWeight: 600,
        textTransform: 'uppercase' as const,
        backgroundColor: '#fafafa'
    };

    return (
        <main style={{ minHeight: '88vh', backgroundColor: '#fff', padding: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 700, margin: 0 }}>Lista de Alunos</h1>
                <a href="#">
                    <button style={{
                        backgroundColor: '#f97316', color: 'white', border: 'none',
                        borderRadius: '8px', padding: '10px 20px', fontWeight: 600, cursor: 'pointer'
                    }}>
                        + Novo Aluno
                    </button>
                </a>
            </div>

            <input
                type="text"
                name="busca-aluno"
                id="busca-aluno"
                placeholder="Buscar aluno..."
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
                            <th style={thStyle}>ID</th>
                            <th style={thStyle}>RA</th>
                            <th style={thStyle}>Nome</th>
                            <th style={thStyle}>E-mail</th>
                            <th style={thStyle}>Telefone</th>
                            <th style={thStyle}>Status</th>
                            <th style={{ ...thStyle, textAlign: 'center' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAlunos && currentAlunos.length > 0 ? (
                            currentAlunos.map((aluno) => (
                                <tr
                                    key={aluno.idAluno}
                                    style={{ transition: 'background 0.2s' }}
                                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fff8f5')}
                                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#fff')}
                                >
                                    <td style={{ ...tdStyle, color: '#888' }}>{aluno.idAluno}</td>
                                    <td style={{ ...tdStyle, fontWeight: 600, color: '#555' }}>{aluno.cod_aluno}</td>
                                    <td style={{ ...tdStyle, fontWeight: 600 }}>{aluno.nome} {aluno.sobrenome}</td>
                                    <td style={tdStyle}>{aluno.email}</td>
                                    <td style={tdStyle}>{aluno.celular}</td>
                                    <td style={tdStyle}>
                                        <span style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '5px',
                                            padding: '3px 10px',
                                            borderRadius: '999px',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            backgroundColor: aluno.status_aluno ? '#dcfce7' : '#fee2e2',
                                            color: aluno.status_aluno ? '#16a34a' : '#dc2626'
                                        }}>
                                            <span style={{
                                                width: '6px', height: '6px', borderRadius: '50%',
                                                backgroundColor: aluno.status_aluno ? '#16a34a' : '#dc2626'
                                            }} />
                                            {aluno.status_aluno ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </td>
                                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                            <button
                                                onClick={() => navigate(`/detalhes/aluno/${aluno.idAluno}`)}
                                                style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid #bfdbfe', backgroundColor: '#eff6ff', color: '#3b82f6', fontSize: '0.8rem', cursor: 'pointer' }}
                                            >
                                                Detalhes
                                            </button>
                                            <button style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid #bbf7d0', backgroundColor: '#f0fdf4', color: '#16a34a', fontSize: '0.8rem', cursor: 'pointer' }}>
                                                Atualizar
                                            </button>
                                            <button style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid #fecaca', backgroundColor: '#fff1f2', color: '#ef4444', fontSize: '0.8rem', cursor: 'pointer' }}>
                                                Deletar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} style={{ ...tdStyle, textAlign: 'center', padding: '40px', color: '#aaa', fontStyle: 'italic' }}>
                                    Nenhum aluno encontrado
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginação */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>
                    Mostrando <strong>{indexOfFirstRow + 1}</strong> até <strong>{Math.min(indexOfLastRow, alunos.length)}</strong> de <strong>{alunos.length}</strong> resultados
                </p>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <button
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        style={{
                            padding: '6px 12px', borderRadius: '6px', border: '1px solid #e0e0e0',
                            background: '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                            opacity: currentPage === 1 ? 0.5 : 1
                        }}
                    >{'<'}</button>

                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => paginate(i + 1)}
                            style={{
                                padding: '6px 12px', borderRadius: '6px', border: '1px solid #e0e0e0',
                                background: currentPage === i + 1 ? '#f97316' : '#fff',
                                color: currentPage === i + 1 ? '#fff' : '#333',
                                cursor: 'pointer',
                                fontWeight: currentPage === i + 1 ? 700 : 400
                            }}
                        >{i + 1}</button>
                    ))}

                    <button
                        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        style={{
                            padding: '6px 12px', borderRadius: '6px', border: '1px solid #e0e0e0',
                            background: '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                            opacity: currentPage === totalPages ? 0.5 : 1
                        }}
                    >{'>'}</button>
                </div>
            </div>
        </main>
    );
}

export default ListagemAlunos;


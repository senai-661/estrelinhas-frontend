import { type JSX } from "react";
import { useState, useEffect } from "react";
import AlunoRequest from '../../../fetch/AlunoRequests'
import type { AlunoDTO } from '../../../dto/AlunoDTO'
import { useNavigate } from "react-router-dom";

function ListagemAlunos(): JSX.Element {
    const [alunos, setAlunos] = useState<AlunoDTO[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const buscarAlunos = async () => {
            try {
                const listaDeAlunos = await AlunoRequest.obterListaDeAlunos();
                setAlunos(listaDeAlunos);
            } catch (error) {
                console.error(`Erro ao buscar alunos. ${error}`);
                alert("Erro ao criar a listagem de alunos.");
            }
        }
        buscarAlunos();
    }, []);

    const totalPages = Math.ceil(alunos.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentAlunos = alunos.slice(indexOfFirstRow, indexOfLastRow);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <main style={{ backgroundColor: "#f0f2f5", flex: 1, display: "flex", flexDirection: "column", padding: "24px 40px", overflow: "hidden" }}>
            <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
                <h1 style={{ flex: 1, fontSize: "1.8rem", fontWeight: "bold", color: "#000000" }}>Alunos</h1>
                <a href="/cadastro/aluno" style={{ padding: "10px 24px", backgroundColor: "#ff7300", borderRadius: "6px", color: "#ffffff", fontWeight: "bold", textDecoration: "none" }}>
                    Novo Aluno
                </a>
            </div>

            <input
                type="text"
                name="busca-aluno"
                id="busca-aluno"
                placeholder="Buscar aluno"
                style={{ width: "100%", maxWidth: "1200px", margin: "0 auto 16px auto", padding: "10px 12px", borderBottom: "2px solid #ff7300", borderTop: "none", borderLeft: "none", borderRight: "none", borderRadius: "2px", fontSize: "1rem", outline: "none", boxSizing: "border-box" }}
            />

            <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", flex: 1, display: "flex", flexDirection: "column", backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: "0px 4px 12px rgba(0,0,0,0.1)", border: "1px solid #e0e0e0", overflow: "hidden" }}>
                <div style={{ flex: 1, overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#ff7300" }}>
                                <th style={{ padding: "14px 16px", color: "#ffffff", textAlign: "left", borderBottom: "1px solid #e06600" }}>Nome</th>
                                <th style={{ padding: "14px 16px", color: "#ffffff", textAlign: "left", borderBottom: "1px solid #e06600" }}>CPF</th>
                                <th style={{ padding: "14px 16px", color: "#ffffff", textAlign: "left", borderBottom: "1px solid #e06600" }}>Telefone</th>
                                <th style={{ padding: "14px 16px", color: "#ffffff", textAlign: "center", borderBottom: "1px solid #e06600" }}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentAlunos && currentAlunos.length > 0 ? (
                                currentAlunos.map((aluno, index) => (
                                    <tr key={index} style={{ borderBottom: "1px solid #e0e0e0" }}>
                                        <td style={{ padding: "12px 16px", color: "#000000", fontWeight: 600 }}>{aluno.nome} {aluno.sobrenome}</td>
                                        <td style={{ padding: "12px 16px", color: "#000000" }}>{aluno.cpf}</td>
                                        <td style={{ padding: "12px 16px", color: "#000000" }}>{aluno.celular}</td>
                                        <td style={{ padding: "12px 16px", textAlign: "center" }}>
                                            <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                                                <button
                                                    onClick={() => navigate(`/detalhes/aluno/${aluno.cpf}`)}
                                                    style={{ padding: "6px 12px", borderRadius: "6px", border: "none", backgroundColor: "#fff3e0", color: "#ff7300", fontWeight: 500, cursor: "pointer", fontSize: "0.85rem" }}
                                                >
                                                    Detalhes
                                                </button>
                                                <button style={{ padding: "6px 12px", borderRadius: "6px", border: "none", backgroundColor: "#e0f2e9", color: "#15803d", fontWeight: 500, cursor: "pointer", fontSize: "0.85rem" }}>
                                                    Atualizar
                                                </button>
                                                <button style={{ padding: "6px 12px", borderRadius: "6px", border: "none", backgroundColor: "#fee2e2", color: "#b91c1c", fontWeight: 500, cursor: "pointer", fontSize: "0.85rem" }}>
                                                    Deletar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: "center", padding: "40px", color: "#999999", fontStyle: "italic" }}>
                                        Nenhum aluno encontrado
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div style={{ backgroundColor: "#f9f9f9", borderTop: "1px solid #e0e0e0", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "0.85rem", color: "#000000" }}>
                        Mostrando <strong>{indexOfFirstRow + 1}</strong> até <strong>{Math.min(indexOfLastRow, alunos.length)}</strong> de <strong>{alunos.length}</strong> resultados
                    </p>
                    <div style={{ display: "flex", gap: "4px" }}>
                        <button
                            onClick={() => paginate(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #e0e0e0", backgroundColor: "#ffffff", color: "#000000", cursor: currentPage === 1 ? "not-allowed" : "pointer", opacity: currentPage === 1 ? 0.5 : 1, fontSize: "0.85rem" }}
                        >
                            Anterior
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => paginate(i + 1)}
                                style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #e0e0e0", backgroundColor: currentPage === i + 1 ? "#ff7300" : "#ffffff", color: currentPage === i + 1 ? "#ffffff" : "#000000", cursor: "pointer", fontSize: "0.85rem", fontWeight: currentPage === i + 1 ? 600 : 400 }}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #e0e0e0", backgroundColor: "#ffffff", color: "#000000", cursor: currentPage === totalPages ? "not-allowed" : "pointer", opacity: currentPage === totalPages ? 0.5 : 1, fontSize: "0.85rem" }}
                        >
                            Próximo
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ListagemAlunos;
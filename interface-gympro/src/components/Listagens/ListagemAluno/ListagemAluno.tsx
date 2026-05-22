import { type JSX, useEffect, useState } from "react";
import AlunoRequests from "../../fetch/AlunoRequests";
import type AlunoDTO from "../../dto/AlunoDTO";
import { useNavigate } from "react-router-dom";

function ListagemAlunos(): JSX.Element {
    const [alunos, setAlunos] = useState<AlunoDTO[]>([]);
    const [busca, setBusca] = useState("");
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
        };
        buscarAlunos();
    }, []);

    const alunosFiltrados = alunos.filter((a) =>
        `${a.nome} ${a.sobrenome} ${a.email} ${a.celular} ${a.cod_aluno}`
            .toLowerCase()
            .includes(busca.toLowerCase())
    );

    const totalPages = Math.ceil(alunosFiltrados.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentAlunos = alunosFiltrados.slice(indexOfFirstRow, indexOfLastRow);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleBusca = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBusca(e.target.value);
        setCurrentPage(1);
    };

    return (
        <main className="page-main">

            <div className="page-header">
                <h1 className="page-title">ALUNOS</h1>
                <p className="page-subtitle">Gerencie os alunos cadastrados na academia</p>
            </div>

            <div className="page-actions">
                <button className="btn-primary" onClick={() => navigate("/novo/aluno")}>
                    Novo Aluno
                </button>
                <input
                    type="text"
                    className="search-input"
                    value={busca}
                    onChange={handleBusca}
                    placeholder="Buscar por nome, e-mail ou RA..."
                />
            </div>

            <div className="table-wrapper">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>RA</th>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Telefone</th>
                            <th>Status</th>
                            <th className="center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAlunos.length > 0 ? (
                            currentAlunos.map((aluno, index) => (
                                <tr key={aluno.id_aluno ?? index}>
                                    <td>#{aluno.id_aluno ?? "—"}</td>
                                    <td>{aluno.cod_aluno ?? aluno.id_aluno ?? "—"}</td>
                                    <td className="bold">{aluno.nome} {aluno.sobrenome}</td>
                                    <td>{aluno.email}</td>
                                    <td>{aluno.celular ?? "—"}</td>
                                    <td>
                                        <span className={`badge ${aluno.status_aluno ? "badge-active" : "badge-inactive"}`}>
                                            {aluno.status_aluno ? "Ativo" : "Inativo"}
                                        </span>
                                    </td>
                                    <td className="center">
                                        <div className="action-group">
                                            <button
                                                className="btn-details"
                                                onClick={() => {
                                                    if (!aluno.id_aluno) {
                                                        alert("ID do aluno não encontrado.");
                                                        return;
                                                    }
                                                    navigate(`/detalhes/aluno/${aluno.id_aluno}`);
                                                }}
                                            >
                                                Detalhes
                                            </button>
                                            <button
                                                className="btn-update"
                                                onClick={() => aluno.id_aluno && navigate(`/atualizar/aluno/${aluno.id_aluno}`)}
                                            >
                                                Atualizar
                                            </button>
                                            <button className="btn-delete">
                                                Deletar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="table-empty">
                                    Nenhum aluno encontrado
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="pagination-wrapper">
                <p className="pagination-info">
                    Mostrando{" "}
                    <strong>
                        {alunosFiltrados.length > 0
                            ? `${indexOfFirstRow + 1}–${Math.min(indexOfLastRow, alunosFiltrados.length)}`
                            : 0}
                    </strong>{" "}
                    de <strong>{alunosFiltrados.length}</strong> resultados
                </p>

                <div className="pagination">
                    <button
                        className="page-btn"
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                    >
                        {"<"}
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
                            onClick={() => paginate(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        className="page-btn"
                        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages || totalPages === 0}
                    >
                        {">"}
                    </button>
                </div>
            </div>

        </main>
    );
}

export default ListagemAlunos;
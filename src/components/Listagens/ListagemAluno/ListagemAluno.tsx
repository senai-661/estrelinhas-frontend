import { type JSX } from "react";
import { useState, useEffect } from "react";
import AlunoRequests from "../../../fetch/AlunoRequests";
import type AlunoDTO from "../../../dto/AlunoDTO";
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
        <section className="alunos-page">
            <div className="alunos-page__content">

                {/* Cabeçalho */}
                <div className="alunos-page__header">
                    <h1>Alunos</h1>
                    <p>Gerencie os alunos cadastrados na academia</p>
                </div>

                {/* Barra de ações */}
                <div className="alunos-page__toolbar">
                    <button
                        onClick={() => navigate("/novo/aluno")}
                        className="btn btn-primary alunos-btn-primary"
                    >
                        <i className="pi pi-plus"></i>
                        Novo Aluno
                    </button>

                    <div className="search-field">
                        <i className="pi pi-search search-field__icon"></i>
                        <input
                            type="text"
                            value={busca}
                            onChange={handleBusca}
                            placeholder="Buscar por nome, e-mail ou RA..."
                            className="search-field__input"
                        />
                    </div>
                </div>

                {/* Tabela */}
                <div className="alunos-card">
                    <table className="alunos-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>RA</th>
                                <th>Nome</th>
                                <th className="desktop-only">E-mail</th>
                                <th className="desktop-only-md">Telefone</th>
                                <th className="desktop-only-lg">Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentAlunos.length > 0 ? (
                                currentAlunos.map((aluno, index) => (
                                    <tr key={aluno.id_aluno ?? index} className="alunos-row">
                                        <td className="alunos-table__cell alunos-table__cell--id">#{aluno.id_aluno ?? "—"}</td>
                                        <td className="alunos-table__cell alunos-table__cell--ra">{aluno.cod_aluno ?? aluno.id_aluno ?? "—"}</td>
                                        <td className="alunos-table__cell alunos-table__cell--name">{aluno.nome} {aluno.sobrenome}</td>
                                        <td className="alunos-table__cell desktop-only">{aluno.email}</td>
                                        <td className="alunos-table__cell desktop-only-md">{aluno.celular ?? "—"}</td>
                                        <td className="alunos-table__cell desktop-only-lg">
                                            <span className={aluno.status_aluno ? "status-pill status-pill--active" : "status-pill status-pill--inactive"}>
                                                <span className="status-pill__dot" style={{ backgroundColor: aluno.status_aluno ? '#16a34a' : '#f87171' }} />
                                                {aluno.status_aluno ? "Ativo" : "Inativo"}
                                            </span>
                                        </td>
                                        <td className="alunos-table__cell alunos-actions-cell">
                                            <div className="alunos-actions">
                                                <button
                                                    onClick={() => {
                                                        if (!aluno.id_aluno) {
                                                            alert("ID do aluno não encontrado.");
                                                            return;
                                                        }
                                                        navigate(`/detalhes/aluno/${aluno.id_aluno}`);
                                                    }}
                                                    className="btn btn-secondary"
                                                >
                                                    <i className="pi pi-eye"></i>
                                                    Detalhes
                                                </button>
                                                <button
                                                    onClick={() => aluno.id_aluno && navigate(`/atualizar/aluno/${aluno.id_aluno}`)}
                                                    className="icon-btn edit"
                                                    title="Atualizar"
                                                >
                                                    Atualizar
                                                </button>
                                                <button
                                                    className="icon-btn delete"
                                                    title="Deletar"
                                                >
                                                    Deletar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="alunos-empty-state">
                                        <i className="pi pi-inbox"></i>
                                        <span>Nenhum aluno encontrado</span>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Paginação */}
                    <div className="alunos-pagination">
                        <p>
                            Mostrando <strong>{alunosFiltrados.length > 0 ? `${indexOfFirstRow + 1}–${Math.min(indexOfLastRow, alunosFiltrados.length)}` : 0}</strong> de <strong>{alunosFiltrados.length}</strong> resultados
                        </p>

                        <nav className="pagination-controls">
                            <button
                                onClick={() => paginate(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="pagination-btn"
                            >
                                <i className="pi pi-chevron-left"></i>
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => paginate(i + 1)}
                                    className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className="pagination-btn"
                            >
                                <i className="pi pi-chevron-right"></i>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ListagemAlunos;
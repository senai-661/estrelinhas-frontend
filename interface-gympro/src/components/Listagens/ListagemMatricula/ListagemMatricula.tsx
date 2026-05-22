import { type JSX, useEffect, useState } from "react";
import MatriculaRequests from "../../fetch/MatriculaRequests";
import AuthRequests from "../../fetch/AuthRequests";
import { useNavigate } from "react-router-dom";
import type MatriculaDTO from "../../dto/MatriculaDTO";

function ListagemMatriculas(): JSX.Element {
    const [matriculas, setMatriculas] = useState<MatriculaDTO[]>([]);
    const [pagina, setPagina] = useState(1);
    const [carregando, setCarregando] = useState(true);
    const itensPorPagina = 6;
    const navigate = useNavigate();

    useEffect(() => {
        const buscarMatriculas = async () => {
            try {
                const token = localStorage.getItem("token");
                const isAuth = localStorage.getItem("isAuth");
                if (!token || !isAuth || !AuthRequests.checkTokenExpiry()) return;

                const lista: MatriculaDTO[] = await MatriculaRequests.obterListaDeMatriculas();
                if (!Array.isArray(lista)) {
                    setMatriculas([]);
                    return;
                }
                setMatriculas(lista);
            } catch (error) {
                console.error("Erro ao buscar matrículas:", error);
                setMatriculas([]);
            } finally {
                setCarregando(false);
            }
        };
        buscarMatriculas();
    }, []);

    const totalPaginas = Math.ceil(matriculas.length / itensPorPagina);
    const matriculasPagina = matriculas.slice(
        (pagina - 1) * itensPorPagina,
        pagina * itensPorPagina
    );

    const formatarData = (data: Date | string | undefined) => {
        if (!data) return "—";
        try {
            return new Date(data).toLocaleDateString("pt-BR");
        } catch {
            return "—";
        }
    };

    const getDadosMatricula = (matricula: MatriculaDTO) => {
        const raw = matricula as any;
        const aluno = (
            matricula.aluno ??
            raw.aluno ??
            raw.student ??
            raw.alunoMatricula ??
            raw.aluno_matricula
        ) as any;

        return {
            id: matricula.id_matricula ?? raw.idMatricula ?? raw.id ?? raw.id_aluno ?? "—",
            nome:
                aluno?.nome ?? aluno?.nome_aluno ?? aluno?.nomeAluno ??
                aluno?.firstName ?? aluno?.first_name ??
                raw.aluno_nome ?? raw.nome_aluno ?? raw.nome ?? "—",
            sobrenome:
                aluno?.sobrenome ?? aluno?.sobrenome_aluno ?? aluno?.sobrenomeAluno ??
                aluno?.lastName ?? aluno?.last_name ??
                raw.aluno_sobrenome ?? raw.sobrenome_aluno ?? raw.sobrenome ?? "—",
            dataInicio: matricula.data_inicio ?? raw.dataInicio ?? raw.dataMatricula ?? raw.data_matricula ?? raw.data_inicio,
            dataFim: matricula.data_fim ?? raw.dataFim ?? raw.dataVencimento ?? raw.data_vencimento ?? raw.data_fim,
            valorFinal: matricula.valor_final ?? raw.valorFinal ?? raw.valorPago ?? raw.valor_pago ?? raw.valor_final,
            formaPagamento: matricula.forma_pagamento ?? raw.formaPagamento ?? raw.forma_pagamento ?? "—",
            status: matricula.status_matricula ?? raw.statusMatricula ?? raw.status_matricula ?? "—",
        };
    };

    return (
        <main className="page-main">

            <div className="page-actions" style={{ justifyContent: "space-between" }}>
                <h1 className="page-title">MATRÍCULAS</h1>
                <button className="btn-primary">+ Nova Matrícula</button>
            </div>

            <div className="table-wrapper">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Sobrenome</th>
                            <th>Vigência</th>
                            <th>Valor Pago</th>
                            <th>Forma Pgto.</th>
                            <th>Status</th>
                            <th className="center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carregando ? (
                            <tr>
                                <td colSpan={8} className="table-empty">
                                    Carregando matrículas...
                                </td>
                            </tr>
                        ) : matriculasPagina.length > 0 ? (
                            matriculasPagina.map((matricula, index) => {
                                const { id, nome, sobrenome, dataInicio, dataFim, valorFinal, formaPagamento, status } =
                                    getDadosMatricula(matricula);
                                return (
                                    <tr key={id ?? index}>
                                        <td>{id}</td>
                                        <td className="bold">{nome}</td>
                                        <td className="bold">{sobrenome}</td>
                                        <td>
                                            {formatarData(dataInicio)} → {formatarData(dataFim)}
                                        </td>
                                        <td className="bold">
                                            R$ {valorFinal != null && valorFinal !== "—"
                                                ? Number(valorFinal).toFixed(2)
                                                : "—"}
                                        </td>
                                        <td>{formaPagamento}</td>
                                        <td>
                                            <span className={`badge ${status === "ATIVA" ? "badge-active" : "badge-inactive"}`}>
                                                {status}
                                            </span>
                                        </td>
                                        <td className="center">
                                            <div className="action-group">
                                                <button
                                                    className="btn-details"
                                                    onClick={() => navigate(`/detalhes/matricula/${id}`)}
                                                >
                                                    Detalhes
                                                </button>
                                                <button className="btn-update">Atualizar</button>
                                                <button className="btn-delete">Deletar</button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={8} className="table-empty">
                                    Nenhuma matrícula encontrada
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="pagination-wrapper-end">
                <button
                    className="page-btn"
                    onClick={() => setPagina((p) => Math.max(1, p - 1))}
                    disabled={pagina === 1}
                >
                    {"<"}
                </button>

                {Array.from({ length: totalPaginas }, (_, i) => (
                    <button
                        key={i + 1}
                        className={`page-btn ${pagina === i + 1 ? "active" : ""}`}
                        onClick={() => setPagina(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    className="page-btn"
                    onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
                    disabled={pagina === totalPaginas || totalPaginas === 0}
                >
                    {">"}
                </button>
            </div>

        </main>
    );
}

export default ListagemMatriculas;
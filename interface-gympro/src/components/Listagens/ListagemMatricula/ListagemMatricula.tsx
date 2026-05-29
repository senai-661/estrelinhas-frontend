<<<<<<< HEAD
import { type JSX, useEffect, useState } from "react";
import MatriculaRequests from "../../fetch/MatriculaRequests";
import AuthRequests from "../../fetch/AuthRequests";
import { useNavigate } from "react-router-dom";
import type MatriculaDTO from "../../dto/MatriculaDTO";

function ListagemMatriculas(): JSX.Element {
    const [matriculas, setMatriculas] = useState<MatriculaDTO[]>([]);
    const [pagina, setPagina] = useState(1);
    const [carregando, setCarregando] = useState(true);
=======
import { useState, useEffect, type JSX } from "react";
import MatriculaRequests from "../../../fetch/MatriculaRequests";
import AuthRequests from "../../../fetch/AuthRequests";
import { useNavigate } from "react-router-dom";

function ListagemMatriculas(): JSX.Element {
    const [matriculas, setMatriculas] = useState<any[]>([]);
    const [pagina, setPagina] = useState(1);
>>>>>>> origin/lais-zanqueta
    const itensPorPagina = 6;
    const navigate = useNavigate();

    useEffect(() => {
        const buscarMatriculas = async () => {
            try {
<<<<<<< HEAD
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
=======
                const token = localStorage.getItem('token');
                const isAuth = localStorage.getItem('isAuth');
                if (!token || !isAuth || !AuthRequests.checkTokenExpiry()) return;
                const lista = await MatriculaRequests.obterListaDeMatriculas();
                setMatriculas(Array.isArray(lista) ? lista : []);
            } catch (error) {
                console.error(`Erro ao buscar matrículas:`, error);
                alert(`Erro ao carregar matrículas: ${error}`);
                setMatriculas([]);
>>>>>>> origin/lais-zanqueta
            }
        };
        buscarMatriculas();
    }, []);

    const totalPaginas = Math.ceil(matriculas.length / itensPorPagina);
<<<<<<< HEAD
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
=======
    const matriculasPagina = matriculas.slice((pagina - 1) * itensPorPagina, pagina * itensPorPagina);

    const tdStyle = { padding: '14px 16px', borderBottom: '1px solid #f0f0f0', fontSize: '0.9rem', color: '#333' };
    const thStyle = { padding: '12px 16px', textAlign: 'left' as const, fontSize: '0.78rem', color: '#888', fontWeight: 600, textTransform: 'uppercase' as const, backgroundColor: '#fafafa' };

    return (
        <main style={{ minHeight: '88vh', backgroundColor: '#fff', padding: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 700, margin: 0 }}>Matrículas</h1>
                <button style={{
                    backgroundColor: '#f97316', color: 'white', border: 'none',
                    borderRadius: '8px', padding: '10px 20px', fontWeight: 600, cursor: 'pointer'
                }}>
                    + Nova Matrícula
                </button>
            </div>

            <div style={{ border: '1px solid #f0f0f0', borderRadius: '12px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={thStyle}>ID</th>
                            <th style={thStyle}>Vigência</th>
                            <th style={thStyle}>Valor Pago</th>
                            <th style={thStyle}>Forma Pgto.</th>
                            <th style={thStyle}>Status</th>
                            <th style={{ ...thStyle, textAlign: 'center' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matriculasPagina.length > 0 ? matriculasPagina.map((matricula, index) => (
                            <tr key={matricula.idMatricula ?? index}
                                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fff8f5')}
                                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#fff')}>
                                <td style={tdStyle}>{matricula.idMatricula}</td>
                                <td style={tdStyle}>
                                    {new Date(matricula.dataMatricula).toLocaleDateString('pt-BR')} → {new Date(matricula.dataVencimento).toLocaleDateString('pt-BR')}
                                </td>
                                <td style={{ ...tdStyle, fontWeight: 700 }}>
                                    R$ {Number(matricula.valorPago).toFixed(2)}
                                </td>
                                <td style={tdStyle}>{matricula.formaPagamento}</td>
                                <td style={tdStyle}>
                                    <span style={{
                                        backgroundColor: matricula.statusMatricula === 'ATIVA' ? '#dcfce7' : '#e5e7eb',
                                        color: matricula.statusMatricula === 'ATIVA' ? '#16a34a' : '#374151',
                                        padding: '3px 12px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 600
                                    }}>
                                        {matricula.statusMatricula}
                                    </span>
                                </td>
                                <td style={{ ...tdStyle, textAlign: 'center' }}>
                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                        <button
                                            onClick={() => navigate(`/detalhes/matricula/${matricula.idMatricula}`)}
                                            style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid #bfdbfe', backgroundColor: '#eff6ff', color: '#3b82f6', fontSize: '0.8rem', cursor: 'pointer' }}>
                                            Detalhes
                                        </button>
                                        <button style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid #bbf7d0', backgroundColor: '#f0fdf4', color: '#16a34a', fontSize: '0.8rem', cursor: 'pointer' }}>Atualizar</button>
                                        <button style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid #fecaca', backgroundColor: '#fff1f2', color: '#ef4444', fontSize: '0.8rem', cursor: 'pointer' }}>Deletar</button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
>>>>>>> origin/lais-zanqueta
                                    Nenhuma matrícula encontrada
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

<<<<<<< HEAD
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

=======
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
>>>>>>> origin/lais-zanqueta
        </main>
    );
}

export default ListagemMatriculas;
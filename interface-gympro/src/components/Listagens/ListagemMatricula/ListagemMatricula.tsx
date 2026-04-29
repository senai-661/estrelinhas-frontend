import { type JSX, useEffect, useState } from "react";
import MatriculaRequests from "../../../fetch/MatriculaRequests";
import type { MatriculaDTO } from "../../../dto/MatriculaDTO";

const MATRICULAS_POR_PAGINA = 6;

function ListagemMatriculas(): JSX.Element {
    const [matriculas, setMatriculas] = useState<MatriculaDTO[]>([]);
    const [paginaAtual, setPaginaAtual] = useState(1);

    useEffect(() => {
        const buscarMatriculas = async () => {
            try {
                const lista = await MatriculaRequests.obterListaDeMatriculas();
                setMatriculas(lista ?? []);
            } catch (error) {
                console.error(`Erro ao buscar matrículas. ${error}`);
                alert("Erro ao criar a listagem de matrículas.");
            }
        }
        buscarMatriculas();
    }, []);

    const totalPaginas = Math.ceil(matriculas.length / MATRICULAS_POR_PAGINA);
    const matriculasPaginadas = matriculas.slice(
        (paginaAtual - 1) * MATRICULAS_POR_PAGINA,
        paginaAtual * MATRICULAS_POR_PAGINA
    );

    const formatarData = (data: string | Date): string => {
        return new Date(data).toLocaleDateString("pt-BR");
    };

    const formatarValor = (valor: number): string => {
        return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    };

    return (
        <main style={{
            minHeight: "76vh",
            backgroundColor: "var(--bg)",
            padding: "40px 16px",
            fontFamily: "var(--sans)"
        }}>
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>

                {/* Cabeçalho */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                    <h1 style={{ fontSize: "24px", fontWeight: 600, margin: 0, color: "var(--text-h)" }}>
                        Matrículas
                    </h1>
                    <a href="#" style={{
                        backgroundColor: "#f97316",
                        color: "#fff",
                        fontSize: "14px",
                        fontWeight: 600,
                        padding: "8px 18px",
                        borderRadius: "8px",
                        textDecoration: "none",
                    }}>
                        + Nova Matrícula
                    </a>
                </div>

                {/* Tabela */}
                <div style={{
                    backgroundColor: "var(--bg)",
                    borderRadius: "12px",
                    border: "1px solid var(--border)",
                    overflow: "hidden"
                }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                        <thead>
                            <tr style={{ backgroundColor: "var(--code-bg)" }}>
                                {["Cód. Matrícula", "Vigência", "Valor Final", "Forma Pgto.", "Status", "Ações"].map((col, i) => (
                                    <th key={col} style={{
                                        padding: "12px 16px",
                                        textAlign: i === 0 ? "left" : "center",
                                        color: "var(--text)",
                                        fontWeight: 600,
                                        fontSize: "12px",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                        borderBottom: "1px solid var(--border)"
                                    }}>
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {matriculasPaginadas.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "var(--text)" }}>
                                        Nenhuma matrícula encontrada.
                                    </td>
                                </tr>
                            ) : (
                                matriculasPaginadas.map((matricula, index) => (
                                    <tr key={matricula.cod_matricula ?? index} style={{ borderBottom: "1px solid var(--border)" }}>
                                        <td style={{ padding: "14px 16px", textAlign: "left", fontWeight: 500, color: "var(--text-h)", fontFamily: "monospace", fontSize: "12px" }}>
                                            {matricula.cod_matricula}
                                        </td>
                                        <td style={{ padding: "14px 16px", textAlign: "center", color: "var(--text)" }}>
                                            {formatarData(matricula.data_inicio)} → {formatarData(matricula.data_fim)}
                                        </td>
                                        <td style={{ padding: "14px 16px", textAlign: "center", fontWeight: 600, color: "var(--text-h)" }}>
                                            {formatarValor(matricula.valor_final)}
                                        </td>
                                        <td style={{ padding: "14px 16px", textAlign: "center", color: "var(--text)" }}>
                                            {matricula.forma_pagamento ?? "—"}
                                        </td>
                                        <td style={{ padding: "14px 16px", textAlign: "center" }}>
                                            <span style={{
                                                padding: "4px 12px",
                                                borderRadius: "999px",
                                                fontSize: "12px",
                                                fontWeight: 600,
                                                color: "#fff",
                                                backgroundColor:
                                                    matricula.status_matricula === "ATIVA" ? "#22c55e" :
                                                    matricula.status_matricula === "INATIVA" ? "#ef4444" :
                                                    matricula.status_matricula === "PENDENTE" ? "#eab308" :
                                                    "#6b7280"
                                            }}>
                                                {matricula.status_matricula}
                                            </span>
                                        </td>
                                        <td style={{ padding: "14px 16px", textAlign: "center" }}>
                                            <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                                                <a href="#" style={{ fontSize: "12px", padding: "4px 10px", borderRadius: "6px", textDecoration: "none", fontWeight: 500, backgroundColor: "#e0f2fe", color: "#0369a1", border: "1px solid #bae6fd" }}>Detalhes</a>
                                                <a href="#" style={{ fontSize: "12px", padding: "4px 10px", borderRadius: "6px", textDecoration: "none", fontWeight: 500, backgroundColor: "#dcfce7", color: "#15803d", border: "1px solid #bbf7d0" }}>Atualizar</a>
                                                <a href="#" style={{ fontSize: "12px", padding: "4px 10px", borderRadius: "6px", textDecoration: "none", fontWeight: 500, backgroundColor: "#fee2e2", color: "#b91c1c", border: "1px solid #fecaca" }}>Deletar</a>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Paginação */}
                {totalPaginas > 1 && (
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "6px", marginTop: "20px", alignItems: "center" }}>
                        <PaginaBtn onClick={() => setPaginaAtual(p => Math.max(p - 1, 1))} disabled={paginaAtual === 1}>&lt;</PaginaBtn>
                        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(num => (
                            <PaginaBtn key={num} onClick={() => setPaginaAtual(num)} ativo={paginaAtual === num}>{num}</PaginaBtn>
                        ))}
                        <PaginaBtn onClick={() => setPaginaAtual(p => Math.min(p + 1, totalPaginas))} disabled={paginaAtual === totalPaginas}>&gt;</PaginaBtn>
                    </div>
                )}
            </div>
        </main>
    );
}

function PaginaBtn({ onClick, disabled, ativo, children }: {
    onClick: () => void;
    disabled?: boolean;
    ativo?: boolean;
    children: React.ReactNode;
}) {
    return (
        <button onClick={onClick} disabled={disabled} style={{
            width: "32px", height: "32px", borderRadius: "6px",
            border: "1px solid var(--border)",
            backgroundColor: ativo ? "#f97316" : "var(--bg)",
            color: ativo ? "#fff" : "var(--text-h)",
            fontSize: "13px", fontWeight: 500,
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.4 : 1,
        }}>
            {children}
        </button>
    );
}

export default ListagemMatriculas;
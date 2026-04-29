import { type JSX, useEffect, useState } from "react";
import PlanoRequests from "../../../fetch/PlanoRequests";
import type { PlanoDTO } from "../../../dto/PlanoDTO";

const PLANOS_POR_PAGINA = 6;

function ListagemPlanos(): JSX.Element {
    const [planos, setPlanos] = useState<PlanoDTO[]>([]);
    const [paginaAtual, setPaginaAtual] = useState(1);

    useEffect(() => {
        const buscarPlanos = async () => {
            try {
                const listaDePlanos = await PlanoRequests.obterListaDePlanos();
                setPlanos(listaDePlanos ?? []);
            } catch (error) {
                console.error(`Erro ao buscar planos. ${error}`);
                alert("Erro ao criar a listagem de planos.");
            }
        }
        buscarPlanos();
    }, []);

    const totalPaginas = Math.ceil(planos.length / PLANOS_POR_PAGINA);
    const planosPaginados = planos.slice(
        (paginaAtual - 1) * PLANOS_POR_PAGINA,
        paginaAtual * PLANOS_POR_PAGINA
    );

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
                        Planos
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
                        + Novo Plano
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
                                {["Cód. Plano", "Tipo", "Duração", "Valor", "Status", "Ações"].map((col, i) => (
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
                            {planosPaginados.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "var(--text)" }}>
                                        Nenhum plano encontrado.
                                    </td>
                                </tr>
                            ) : (
                                planosPaginados.map((plano, index) => (
                                    <tr key={plano.cod_plano ?? index} style={{ borderBottom: "1px solid var(--border)" }}>
                                        <td style={{ padding: "14px 16px", textAlign: "left", fontWeight: 500, color: "var(--text-h)", fontFamily: "monospace", fontSize: "12px" }}>
                                            {plano.cod_plano}
                                        </td>
                                        <td style={{ padding: "14px 16px", textAlign: "center", color: "var(--text)" }}>
                                            {plano.tipo_plano}
                                        </td>
                                        <td style={{ padding: "14px 16px", textAlign: "center", color: "var(--text)" }}>
                                            {plano.duracao_dias} dias
                                        </td>
                                        <td style={{ padding: "14px 16px", textAlign: "center", fontWeight: 600, color: "var(--text-h)" }}>
                                            {formatarValor(plano.valor)}
                                        </td>
                                        <td style={{ padding: "14px 16px", textAlign: "center" }}>
                                            <span style={{
                                                padding: "4px 12px",
                                                borderRadius: "999px",
                                                fontSize: "12px",
                                                fontWeight: 600,
                                                color: "#fff",
                                                backgroundColor:
                                                    plano.status_plano === "ATIVO" ? "#22c55e" :
                                                    plano.status_plano === "INATIVO" ? "#ef4444" :
                                                    "#6b7280"
                                            }}>
                                                {plano.status_plano ?? "—"}
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

export default ListagemPlanos;
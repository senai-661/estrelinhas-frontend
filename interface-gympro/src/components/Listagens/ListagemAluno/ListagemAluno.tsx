import { type JSX } from "react";
import { useState, useEffect } from "react";
import AlunoRequest from '../../../fetch/AlunoRequests'
import type { AlunoDTO } from '../../../dto/AlunoDTO'

const ALUNOS_POR_PAGINA = 6;

function ListagemAlunos(): JSX.Element {
    const [alunos, setAlunos] = useState<AlunoDTO[]>([]);
    const [busca, setBusca] = useState("");
    const [paginaAtual, setPaginaAtual] = useState(1);

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

    const alunosFiltrados = alunos.filter((aluno) => {
        const nomeCompleto = `${aluno.nome} ${aluno.sobrenome}`.toLowerCase();
        return nomeCompleto.includes(busca.toLowerCase());
    });

    const totalPaginas = Math.ceil(alunosFiltrados.length / ALUNOS_POR_PAGINA);

    const alunosPaginados = alunosFiltrados.slice(
        (paginaAtual - 1) * ALUNOS_POR_PAGINA,
        paginaAtual * ALUNOS_POR_PAGINA
    );

    const handleBusca = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBusca(e.target.value);
        setPaginaAtual(1);
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
                        Lista de Alunos
                    </h1>
                    <a
                        href="#"
                        style={{
                            backgroundColor: "#f97316",
                            color: "#fff",
                            fontSize: "14px",
                            fontWeight: 600,
                            padding: "8px 18px",
                            borderRadius: "8px",
                            textDecoration: "none",
                        }}
                    >
                        + Novo Aluno
                    </a>
                </div>

                {/* Busca */}
                <input
                    type="text"
                    placeholder="Buscar aluno..."
                    value={busca}
                    onChange={handleBusca}
                    style={{
                        width: "100%",
                        marginBottom: "16px",
                        padding: "10px 16px",
                        borderRadius: "8px",
                        border: "1px solid var(--border)",
                        backgroundColor: "var(--bg)",
                        color: "var(--text-h)",
                        fontSize: "14px",
                        outline: "none",
                        boxSizing: "border-box",
                        fontFamily: "var(--sans)"
                    }}
                />

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
                                {["Nome", "CPF", "Telefone", "Status", "Ações"].map((col, i) => (
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
                            {alunosPaginados.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "var(--text)" }}>
                                        Nenhum aluno encontrado.
                                    </td>
                                </tr>
                            ) : (
                                alunosPaginados.map((aluno, index) => (
                                    <tr
                                        key={aluno.cpf ?? index}
                                        style={{ borderBottom: "1px solid var(--border)" }}
                                    >
                                        <td style={{ padding: "14px 16px", textAlign: "left", fontWeight: 500, color: "var(--text-h)" }}>
                                            {aluno.nome} {aluno.sobrenome}
                                        </td>
                                        <td style={{ padding: "14px 16px", textAlign: "center", color: "var(--text)" }}>
                                            {aluno.cpf}
                                        </td>
                                        <td style={{ padding: "14px 16px", textAlign: "center", color: "var(--text)" }}>
                                            {aluno.celular}
                                        </td>
                                        <td style={{ padding: "14px 16px", textAlign: "center" }}>
                                            <span style={{
                                                padding: "4px 12px",
                                                borderRadius: "999px",
                                                fontSize: "12px",
                                                fontWeight: 600,
                                                color: "#fff",
                                                backgroundColor: aluno.statusAluno === "ATIVO"
                                                    ? "#22c55e"
                                                    : aluno.statusAluno === "INATIVO"
                                                        ? "#f97316"
                                                        : "#eab308"
                                            }}>
                                                {aluno.statusAluno === "ATIVO" ? "Ativo" : "Inativo"}
                                            </span>
                                        </td>
                                        <td style={{ padding: "14px 16px", textAlign: "center" }}>
                                            <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                                                <a href="#" style={{ fontSize: "12px", padding: "4px 10px", borderRadius: "6px", textDecoration: "none", fontWeight: 500, backgroundColor: "#e0f2fe", color: "#0369a1", border: "1px solid #bae6fd" }}>Detalhes</a>
                                                <a href="#" style={{ fontSize: "12px", padding: "4px 10px", borderRadius: "6px", textDecoration: "none", fontWeight: 500, backgroundColor: "#dcfce7", color: "#15803d", border: "1px solid #bbf7d0" }}>Editar</a>
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
                        <PaginaBtn onClick={() => setPaginaAtual(p => Math.max(p - 1, 1))} disabled={paginaAtual === 1}>
                            &lt;
                        </PaginaBtn>
                        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(num => (
                            <PaginaBtn key={num} onClick={() => setPaginaAtual(num)} ativo={paginaAtual === num}>
                                {num}
                            </PaginaBtn>
                        ))}
                        <PaginaBtn onClick={() => setPaginaAtual(p => Math.min(p + 1, totalPaginas))} disabled={paginaAtual === totalPaginas}>
                            &gt;
                        </PaginaBtn>
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
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                width: "32px",
                height: "32px",
                borderRadius: "6px",
                border: "1px solid var(--border)",
                backgroundColor: ativo ? "#f97316" : "var(--bg)",
                color: ativo ? "#fff" : "var(--text-h)",
                fontSize: "13px",
                fontWeight: 500,
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.4 : 1,
            }}
        >
            {children}
        </button>
    );
}

export default ListagemAlunos
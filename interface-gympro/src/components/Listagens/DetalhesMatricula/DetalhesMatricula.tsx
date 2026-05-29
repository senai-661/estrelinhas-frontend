import { useEffect, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import MatriculaRequests from "../../fetch/MatriculaRequests";
import type MatriculaDTO from "../../dto/MatriculaDTO";

interface DetalhesMatriculaProps {
    id_matricula: number;
}

function DetalhesMatricula({ id_matricula }: DetalhesMatriculaProps): JSX.Element {
    const [matricula, setMatricula] = useState<MatriculaDTO | null>(null);
=======
import MatriculaRequests from "../../../fetch/MatriculaRequests";

interface DetalhesMatriculaProps {
    idMatricula: number;
}

function DetalhesMatricula({ idMatricula }: DetalhesMatriculaProps): JSX.Element {
    const [matricula, setMatricula] = useState<any | null>(null);
>>>>>>> origin/lais-zanqueta
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
<<<<<<< HEAD
        if (!id_matricula || isNaN(id_matricula)) {
=======
        if (!idMatricula || isNaN(idMatricula)) {
>>>>>>> origin/lais-zanqueta
            setError("ID da matrícula inválido.");
            setLoading(false);
            return;
        }

        async function buscarDados() {
            setLoading(true);
            setError(null);
<<<<<<< HEAD

                try {
                const dados = await MatriculaRequests.obterMatriculaPorId(id_matricula);
                if (dados) {
                    setMatricula(dados);

                    // Se a API não devolveu os dados completos do aluno, buscar por ID
                    try {
                        const alunoId = (dados.aluno as any)?.id_aluno ?? (dados.aluno as any)?.id;
                        if (alunoId && !((dados.aluno as any)?.nome)) {
                            const alunoDetalhe = await (await import("../../fetch/AlunoRequests")).default.obterAlunoPorId(Number(alunoId));
                            if (alunoDetalhe) setMatricula(prev => prev ? ({ ...(prev as any), aluno: alunoDetalhe as any }) : prev);
                        }
                    } catch (err) {
                        console.warn('Erro ao buscar detalhes do aluno:', err);
                    }

                    // Se o plano vier apenas com ID, buscar detalhes do plano
                    try {
                        const planoId = (dados.plano as any)?.id_plano ?? (dados.plano as any)?.id;
                        if (planoId && !((dados.plano as any)?.tipo_plano)) {
                            const planoDetalhe = await (await import("../../fetch/PlanoRequests")).default.getById(Number(planoId));
                            if (planoDetalhe) setMatricula(prev => prev ? ({ ...(prev as any), plano: planoDetalhe as any }) : prev);
                        }
                    } catch (err) {
                        console.warn('Erro ao buscar detalhes do plano:', err);
                    }

=======
            try {
                const dados = await MatriculaRequests.obterMatriculaPorId(idMatricula);
                if (dados) {
                    setMatricula(dados);
>>>>>>> origin/lais-zanqueta
                } else {
                    setError("Matrícula não encontrada.");
                }
            } catch (err) {
                console.error("Erro ao carregar detalhes da matrícula:", err);
                setError("Ocorreu um erro ao buscar as informações da matrícula.");
            } finally {
                setLoading(false);
            }
        }

        buscarDados();
<<<<<<< HEAD
    }, [id_matricula]);

    const formatarData = (data: Date | string | undefined) => {
        if (!data) return "—";
        try {
            return new Date(data).toLocaleDateString("pt-BR");
        } catch {
            return "Data inválida";
        }
    };
   const idMatricula = matricula?.id_matricula ?? (matricula as any)?.idMatricula;
    const codMatricula = matricula?.cod_matricula ?? (matricula as any)?.codMatricula;
    const dataInicio = matricula?.data_inicio ?? (matricula as any)?.dataInicio ?? (matricula as any)?.dataMatricula ?? (matricula as any)?.data_matricula;
    const dataFim = matricula?.data_fim ?? (matricula as any)?.dataFim ?? (matricula as any)?.dataVencimento ?? (matricula as any)?.data_vencimento;
    const statusMatricula = matricula?.status_matricula ?? (matricula as any)?.statusMatricula ?? (matricula as any)?.status_matricula;
    const formaPagamento = matricula?.forma_pagamento ?? (matricula as any)?.formaPagamento ?? (matricula as any)?.forma_pagamento;
    const valorFinal = matricula?.valor_final ?? (matricula as any)?.valorFinal ?? (matricula as any)?.valorPago ?? (matricula as any)?.valor_pago;
    const plano = matricula?.plano ?? (matricula as any)?.plano ?? (matricula as any)?.planoMatricula;
    const rawMatricula = matricula as any;
    const aluno = matricula?.aluno ?? rawMatricula?.aluno ?? rawMatricula?.student ?? rawMatricula?.alunoMatricula ?? rawMatricula?.aluno_matricula;
    const nomeAluno = aluno?.nome ?? aluno?.nome_aluno ?? aluno?.nomeAluno ?? aluno?.firstName ?? aluno?.first_name ?? rawMatricula?.aluno_nome ?? rawMatricula?.nome_aluno ?? rawMatricula?.nome ?? '—';
    const sobrenomeAluno = aluno?.sobrenome ?? aluno?.sobrenome_aluno ?? aluno?.sobrenomeAluno ?? aluno?.lastName ?? aluno?.last_name ?? rawMatricula?.aluno_sobrenome ?? rawMatricula?.sobrenome_aluno ?? rawMatricula?.sobrenome ?? '—';
    const inicialAluno = `${nomeAluno?.charAt(0) ?? ""}${sobrenomeAluno?.charAt(0) ?? ""}`.toUpperCase();
    const nomeCompletoAluno = [nomeAluno, sobrenomeAluno].filter(Boolean).join(" ");

    if (loading) {
        return (
            <div className="alunos-page">
                <div className="alunos-page__content">
                    <div className="alunos-card animate-pulse">
                        <div className="flex gap-6">
                            <div className="w-64 flex-shrink-0 bg-white rounded-xl border border-gray-200 p-6 h-64"></div>
                            <div className="flex-1 flex flex-col gap-4">
                                <div className="bg-white rounded-xl border border-gray-200 p-6 h-40"></div>
                                <div className="bg-white rounded-xl border border-gray-200 p-6 h-40"></div>
                            </div>
=======
    }, [idMatricula]);

    if (loading) {
        return (
            <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 16px" }}>
                <div style={{ width: "100%", maxWidth: "900px" }}>
                    <div style={{ display: "flex", gap: "24px" }}>
                        <div style={{ width: "256px", backgroundColor: "#ffffff", borderRadius: "16px", height: "320px", flexShrink: 0 }} />
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
                            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", height: "176px" }} />
                            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", height: "176px" }} />
>>>>>>> origin/lais-zanqueta
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !matricula) {
        return (
<<<<<<< HEAD
            <div className="alunos-page">
                <div className="alunos-page__content">
                    <div className="alunos-card flex items-center justify-center p-8">
                        <div className="text-center w-full max-w-md">
                            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                                <i className="pi pi-exclamation-triangle text-red-500 text-2xl"></i>
                            </div>
                            <h2 className="text-lg font-bold text-gray-800 mb-2">Erro ao carregar matrícula</h2>
                            <p className="text-sm text-gray-400 mb-6">{error || "Erro desconhecido."}</p>
                            <button
                                onClick={() => navigate("/lista/matriculas")}
                                className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-lg transition-all"
                            >
                                Voltar para a lista
                            </button>
                        </div>
                    </div>
=======
            <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
                <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "40px", maxWidth: "400px", width: "100%", textAlign: "center" }}>
                    <h2 style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#000000", marginBottom: "8px" }}>Erro ao carregar matrícula</h2>
                    <p style={{ fontSize: "0.875rem", color: "#999999", marginBottom: "24px" }}>{error || "Erro desconhecido."}</p>
                    <button
                        onClick={() => navigate("/lista/matriculas")}
                        style={{ padding: "10px 24px", backgroundColor: "#ff7300", color: "#ffffff", border: "none", borderRadius: "10px", fontWeight: "bold", cursor: "pointer", fontSize: "0.875rem" }}
                    >
                        Voltar para a lista
                    </button>
>>>>>>> origin/lais-zanqueta
                </div>
            </div>
        );
    }

<<<<<<< HEAD
    const iniciais = inicialAluno;

    return (
        <div className="alunos-page">
            <div className="alunos-page__content">
                <div className="alunos-card">
                    <div className="breadcrumb">
                        <button
                            onClick={() => navigate("/lista/matriculas")}
                            className="text-primary font-medium"
                        >
                            Matrículas
                        </button>
                        <span className="sep">/</span>
                        <span className="current">{codMatricula ?? `Matrícula ${idMatricula}`}</span>
                    </div>

                    <div className="detail-layout">
                        <div className="detail-profile-card">
                            <div className="detail-avatar">{iniciais}</div>
                            <h2>{aluno?.nome ?? "Aluno desconhecido"} {aluno?.sobrenome ?? ""}</h2>
                            <p className="ra-label">RA: {aluno?.cod_aluno ?? aluno?.id_aluno ?? aluno?.codAluno ?? aluno?.idAluno ?? "—"}</p>
                            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${statusMatricula === "ATIVA" || statusMatricula === "Ativa" ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"}`}>
                                <span className={`w-2 h-2 rounded-full ${statusMatricula === "ATIVA" || statusMatricula === "Ativa" ? "bg-green-500" : "bg-orange-400"}`}></span>
                                {statusMatricula ?? "—"}
                            </span>
                            <div className="actions w-full mt-4">
                                <button
                                    onClick={() => navigate(`/atualizar/matricula/${idMatricula}`)}
                                    className="btn btn-primary"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => navigate("/lista/matriculas")}
                                    className="btn btn-secondary"
                                >
                                    Voltar
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5">
                            <div className="detail-info-card">
                                <div className="detail-info-section">
                                    <h3>Dados da Matrícula</h3>
                                    <div className="detail-field">
                                        <div className="detail-field-content">
                                            <label>ID da Matrícula</label>
                                            <span>{String(idMatricula ?? "—")}</span>
                                        </div>
                                    </div>
                                    <div className="detail-field">
                                        <div className="detail-field-content">
                                            <label>Código da Matrícula</label>
                                            <span className="text-orange-500 font-mono">{codMatricula ?? "—"}</span>
                                        </div>
                                    </div>
                                    <div className="detail-field">
                                        <div className="detail-field-content">
                                            <label>Data de Início</label>
                                            <span>{formatarData(dataInicio)}</span>
                                        </div>
                                    </div>
                                    <div className="detail-field">
                                        <div className="detail-field-content">
                                            <label>Data de Fim</label>
                                            <span>{formatarData(dataFim)}</span>
                                        </div>
                                    </div>
                                    <div className="detail-field">
                                        <div className="detail-field-content">
                                            <label>Forma de Pagamento</label>
                                            <span>{formaPagamento ?? "—"}</span>
                                        </div>
                                    </div>
                                    <div className="detail-field">
                                        <div className="detail-field-content">
                                            <label>Valor Final</label>
                                            <span>{valorFinal != null ? `R$ ${Number(valorFinal).toFixed(2).replace('.', ',')}` : "—"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="detail-info-card">
                                <div className="detail-info-section">
                                    <h3>Plano e Aluno</h3>
                                    <div className="detail-field">
                                        <div className="detail-field-content">
                                            <label>Plano</label>
                                            <span>{plano?.tipo_plano ?? plano?.tipoPlano ?? "—"}</span>
                                        </div>
                                    </div>
                                    <div className="detail-field">
                                        <div className="detail-field-content">
                                            <label>Código do Plano</label>
                                            <span>{plano?.cod_plano ?? plano?.codPlano ?? "—"}</span>
                                        </div>
                                    </div>
                                    <div className="detail-field">
                                        <div className="detail-field-content">
                                            <label>Duração (dias)</label>
                                            <span>{plano?.duracao_dias ?? plano?.duracaoDias ?? "—"}</span>
                                        </div>
                                    </div>
                                    <div className="detail-field">
                                        <div className="detail-field-content">
                                            <label>Valor do Plano</label>
                                            <span>{plano?.valor != null ? `R$ ${Number(plano.valor).toFixed(2).replace('.', ',')}` : "—"}</span>
                                        </div>
                                    </div>
                                    <div className="detail-field">
                                        <div className="detail-field-content">
                                            <label>Status do Plano</label>
                                            <span>{plano?.status_plano ?? plano?.statusPlano ?? "—"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
=======
    const formatarData = (data: string | Date) => {
        try {
            const d = new Date(data);
            if (isNaN(d.getTime())) return "Não informado";
            return d.toLocaleDateString("pt-BR");
        } catch {
            return "Não informado";
        }
    };

    const formatarValor = (valor: number) => {
        return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", padding: "32px 16px" }}>
            <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto" }}>

                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.875rem", marginBottom: "24px" }}>
                    <button
                        onClick={() => navigate("/lista/matriculas")}
                        style={{ color: "#ff7300", fontWeight: "600", background: "none", border: "none", cursor: "pointer", fontSize: "0.875rem" }}
                    >
                        Matrículas
                    </button>
                    <span style={{ color: "#999999" }}>/</span>
                    <span style={{ color: "#666666", fontWeight: "500" }}>Matrícula #{matricula.idMatricula}</span>
                </div>

                <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>

                    <div style={{ width: "256px", flexShrink: 0, backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #f0f0f0", padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                        <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "#ff7300", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", fontSize: "1.5rem", fontWeight: "bold" }}>
                            #{matricula.idMatricula}
                        </div>

                        <div style={{ textAlign: "center" }}>
                            <h2 style={{ fontSize: "1rem", fontWeight: "bold", color: "#000000", margin: 0 }}>Matrícula #{matricula.idMatricula}</h2>
                        </div>

                        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "999px", fontSize: "0.75rem", fontWeight: "600", backgroundColor: matricula.statusMatricula === "ATIVA" ? "#f0fdf4" : "#fef2f2", color: matricula.statusMatricula === "ATIVA" ? "#15803d" : "#b91c1c" }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: matricula.statusMatricula === "ATIVA" ? "#22c55e" : "#ef4444" }} />
                            {matricula.statusMatricula}
                        </span>

                        <div style={{ width: "100%", borderTop: "1px solid #f0f0f0", marginTop: "8px" }} />

                        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "8px" }}>
                            <button
                                onClick={() => navigate(`/atualizar/matricula/${matricula.idMatricula}`)}
                                style={{ width: "100%", backgroundColor: "#ff7300", color: "#ffffff", border: "none", borderRadius: "10px", padding: "10px", fontWeight: "bold", cursor: "pointer", fontSize: "0.875rem" }}
                            >
                                Editar Matrícula
                            </button>
                            <button
                                onClick={() => navigate("/lista/matriculas")}
                                style={{ width: "100%", backgroundColor: "#ffffff", color: "#000000", border: "1px solid #e0e0e0", borderRadius: "10px", padding: "10px", fontWeight: "bold", cursor: "pointer", fontSize: "0.875rem" }}
                            >
                                Voltar
                            </button>
                        </div>
                    </div>

                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px", minWidth: "280px" }}>

                        <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #f0f0f0", padding: "24px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                                <div style={{ width: "28px", height: "28px", borderRadius: "8px", backgroundColor: "#ff7300", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <i className="pi pi-id-card" style={{ color: "#ffffff", fontSize: "0.75rem" }} />
                                </div>
                                <h3 style={{ fontSize: "0.875rem", fontWeight: "bold", color: "#000000", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>Dados da Matrícula</h3>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                <Campo label="ID da Matrícula" valor={String(matricula.idMatricula)} icone="pi-hashtag" />
                                <Campo label="Status" valor={matricula.statusMatricula} icone="pi-info-circle" />
                                <Campo label="ID do Aluno" valor={String(matricula.codAluno)} icone="pi-user" />
                                <Campo label="ID do Plano" valor={String(matricula.codPlano)} icone="pi-book" />
                            </div>
                        </div>

                        <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #f0f0f0", padding: "24px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
                                <div style={{ width: "28px", height: "28px", borderRadius: "8px", backgroundColor: "#ff7300", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <i className="pi pi-calendar" style={{ color: "#ffffff", fontSize: "0.75rem" }} />
                                </div>
                                <h3 style={{ fontSize: "0.875rem", fontWeight: "bold", color: "#000000", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>Período e Pagamento</h3>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                <Campo label="Data de Início" valor={formatarData(matricula.dataMatricula)} icone="pi-calendar" />
                                <Campo label="Data de Término" valor={formatarData(matricula.dataVencimento)} icone="pi-calendar" />
                                <Campo label="Forma de Pagamento" valor={matricula.formaPagamento ?? "Não informado"} icone="pi-credit-card" />
                                <Campo label="Valor Final" valor={formatarValor(Number(matricula.valorPago))} icone="pi-dollar" />
                            </div>
                        </div>

>>>>>>> origin/lais-zanqueta
                    </div>
                </div>
            </div>
        </div>
    );
}

<<<<<<< HEAD
=======
interface CampoProps {
    label: string;
    valor: string;
    icone: string;
}

function Campo({ label, valor, icone }: CampoProps) {
    return (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "12px", borderRadius: "10px", backgroundColor: "#f9f9f9" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#ffffff", border: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <i className={`pi ${icone}`} style={{ color: "#ff7300", fontSize: "0.875rem" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.7rem", color: "#999999", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
                <span style={{ fontSize: "0.875rem", fontWeight: "600", color: "#000000", marginTop: "2px" }}>{valor}</span>
            </div>
        </div>
    );
}

>>>>>>> origin/lais-zanqueta
export default DetalhesMatricula;
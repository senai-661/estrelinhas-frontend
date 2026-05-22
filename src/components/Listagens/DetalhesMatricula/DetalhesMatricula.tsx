import { useEffect, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import MatriculaRequests from "../../../fetch/MatriculaRequests";
import type MatriculaDTO from "../../../dto/MatriculaDTO";

interface DetalhesMatriculaProps {
    id_matricula: number;
}

function DetalhesMatricula({ id_matricula }: DetalhesMatriculaProps): JSX.Element {
    const [matricula, setMatricula] = useState<MatriculaDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id_matricula || isNaN(id_matricula)) {
            setError("ID da matrícula inválido.");
            setLoading(false);
            return;
        }

        async function buscarDados() {
            setLoading(true);
            setError(null);

                try {
                const dados = await MatriculaRequests.obterMatriculaPorId(id_matricula);
                if (dados) {
                    setMatricula(dados);

                    // Se a API não devolveu os dados completos do aluno, buscar por ID
                    try {
                        const alunoId = (dados.aluno as any)?.id_aluno ?? (dados.aluno as any)?.id;
                        if (alunoId && !((dados.aluno as any)?.nome)) {
                            const alunoDetalhe = await (await import("../../../fetch/AlunoRequests")).default.obterAlunoPorId(Number(alunoId));
                            if (alunoDetalhe) setMatricula(prev => prev ? ({ ...(prev as any), aluno: alunoDetalhe as any }) : prev);
                        }
                    } catch (err) {
                        console.warn('Erro ao buscar detalhes do aluno:', err);
                    }

                    // Se o plano vier apenas com ID, buscar detalhes do plano
                    try {
                        const planoId = (dados.plano as any)?.id_plano ?? (dados.plano as any)?.id;
                        if (planoId && !((dados.plano as any)?.tipo_plano)) {
                            const planoDetalhe = await (await import("../../../fetch/PlanoRequests")).default.getById(Number(planoId));
                            if (planoDetalhe) setMatricula(prev => prev ? ({ ...(prev as any), plano: planoDetalhe as any }) : prev);
                        }
                    } catch (err) {
                        console.warn('Erro ao buscar detalhes do plano:', err);
                    }

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
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !matricula) {
        return (
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
                </div>
            </div>
        );
    }

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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetalhesMatricula;

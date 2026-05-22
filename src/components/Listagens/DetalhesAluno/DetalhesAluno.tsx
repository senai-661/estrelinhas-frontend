import { useEffect, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import AlunoRequests from "../../../fetch/AlunoRequests";
import type AlunoDTO from "../../../dto/AlunoDTO";

interface DetalhesAlunoProps {
    id_aluno: number;
}

function DetalhesAluno({ id_aluno }: DetalhesAlunoProps): JSX.Element {
    const [aluno, setAluno] = useState<AlunoDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id_aluno || isNaN(id_aluno)) {
            setError("ID do aluno inválido.");
            setLoading(false);
            return;
        }

        async function buscarDados() {
            setLoading(true);
            setError(null);
            try {
                const dados = await AlunoRequests.obterAlunoPorId(id_aluno);
                if (dados) {
                    setAluno(dados);
                } else {
                    setError("Aluno não encontrado.");
                }
            } catch (err) {
                console.error("Erro ao carregar detalhes do aluno:", err);
                setError("Ocorreu um erro ao buscar as informações do aluno.");
            } finally {
                setLoading(false);
            }
        }

        buscarDados();
    }, [id_aluno]);

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

    if (error || !aluno) {
        return (
            <div className="alunos-page">
                <div className="alunos-page__content">
                    <div className="alunos-card flex items-center justify-center">
                        <div className="bg-white rounded-xl border border-red-100 p-8 max-w-md w-full text-center">
                            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                                <i className="pi pi-exclamation-triangle text-red-500 text-2xl"></i>
                            </div>
                            <h2 className="text-lg font-bold text-gray-800 mb-2">Erro ao carregar aluno</h2>
                            <p className="text-sm text-gray-400 mb-6">{error || "Erro desconhecido."}</p>
                            <button
                                onClick={() => navigate("/lista/alunos")}
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

    const formatarData = (data: Date | string) => {
        try {
            return new Date(data).toLocaleDateString("pt-BR");
        } catch {
            return "Data inválida";
        }
    };

    const iniciais = `${aluno.nome?.charAt(0) ?? ""}${aluno.sobrenome?.charAt(0) ?? ""}`.toUpperCase();

    return (
        <div className="alunos-page">
            <div className="alunos-page__content">
                <div className="alunos-card">
                    <div className="breadcrumb">
                        <button
                            onClick={() => navigate("/lista/alunos")}
                            className="text-primary font-medium"
                        >
                            Alunos
                        </button>
                        <span className="sep">/</span>
                        <span className="current">{aluno.nome} {aluno.sobrenome}</span>
                    </div>

                    <div className="detail-layout">
                        <div className="detail-profile-card">
                            <div className="detail-avatar">{iniciais}</div>
                            <h2>{aluno.nome} {aluno.sobrenome}</h2>
                            <p className="ra-label">RA: {aluno.cod_aluno ?? aluno.id_aluno ?? "—"}</p>
                            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${aluno.status_aluno ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                                <span className={`w-2 h-2 rounded-full ${aluno.status_aluno ? "bg-green-500" : "bg-red-400"}`}></span>
                                {aluno.status_aluno ? "Ativo" : "Inativo"}
                            </span>
                            <div className="actions w-full mt-4">
                                <button
                                    onClick={() => navigate(`/atualizar/aluno/${aluno.id_aluno}`)}
                                    className="btn btn-primary"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => navigate("/lista/alunos")}
                                    className="btn btn-secondary"
                                >
                                    Voltar
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5">
                            <div className="detail-info-card">
                                <div className="detail-info-section">
                                    <h3>Dados Cadastrais</h3>
                                    <div className="detail-field">
                                        <div className="detail-field-icon"><i className="pi pi-hashtag"></i></div>
                                        <div className="detail-field-content">
                                            <label>ID do Sistema</label>
                                            <span>{String(aluno.id_aluno ?? "—")}</span>
                                        </div>
                                    </div>
                                    <div className="detail-field">
                                        <div className="detail-field-icon"><i className="pi pi-bookmark"></i></div>
                                        <div className="detail-field-content">
                                            <label>Código do Aluno (RA)</label>
                                            <span className="text-orange-500 font-mono">{aluno.cod_aluno ?? "—"}</span>
                                        </div>
                                    </div>
                                    <div className="detail-field">
                                        <div className="detail-field-icon"><i className="pi pi-file"></i></div>
                                        <div className="detail-field-content">
                                            <label>CPF</label>
                                            <span>{aluno.cpf ?? "—"}</span>
                                        </div>
                                    </div>
                                    <div className="detail-field">
                                        <div className="detail-field-icon"><i className="pi pi-calendar"></i></div>
                                        <div className="detail-field-content">
                                            <label>Data de Nascimento</label>
                                            <span>{formatarData(aluno.data_nascimento)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="detail-info-card">
                                <div className="detail-info-section">
                                    <h3>Contato e Localização</h3>
                                    <div className="detail-field">
                                        <div className="detail-field-icon"><i className="pi pi-envelope"></i></div>
                                        <div className="detail-field-content">
                                            <label>E-mail</label>
                                            <span>{aluno.email}</span>
                                        </div>
                                    </div>
                                    <div className="detail-field">
                                        <div className="detail-field-icon"><i className="pi pi-phone"></i></div>
                                        <div className="detail-field-content">
                                            <label>Celular / Telefone</label>
                                            <span>{aluno.celular ?? "Não informado"}</span>
                                        </div>
                                    </div>
                                    <div className="detail-field">
                                        <div className="detail-field-icon"><i className="pi pi-home"></i></div>
                                        <div className="detail-field-content">
                                            <label>Endereço</label>
                                            <span>{aluno.endereco}</span>
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

interface CampoInfoProps {
    label: string;
    valor: string;
    icone: string;
    destaque?: boolean;
}

function CampoInfo({ label, valor, icone, destaque = false }: CampoInfoProps) {
    return (
        <div className="flex items-center gap-4 px-5 py-4">
            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                <i className={`pi ${icone} text-orange-400 text-sm`}></i>
            </div>
            <div className="flex flex-col min-w-0">
                <span className="text-xs text-gray-400 font-medium">{label}</span>
                <span className={`text-sm font-semibold truncate ${destaque ? "text-orange-500 font-mono" : "text-gray-700"}`}>
                    {valor}
                </span>
            </div>
        </div>
    );
}

export default DetalhesAluno;
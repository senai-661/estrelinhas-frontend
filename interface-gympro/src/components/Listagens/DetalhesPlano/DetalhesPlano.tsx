import { useEffect, useState, type JSX } from "react";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { Message } from "primereact/message";
import PlanoRequests from "../../fetch/PlanoRequests";
import type PlanoDTO from "../../dto/PlanoDTO";
import { useNavigate } from "react-router-dom";

interface DetalhesPlanoProps {
    id_plano: string | number;
}

type PlanoDetalhes = PlanoDTO & Record<string, any>;

function DetalhesPlano({ id_plano }: DetalhesPlanoProps): JSX.Element {
    const [plano, setPlano] = useState<PlanoDetalhes | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function buscarDados() {
            if (!id_plano) {
                setError("ID do plano não informado.");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            const buscarPorId = async () => {
                try {
                    const dados = await PlanoRequests.getById(id_plano);
                    return dados;
                } catch {
                    return null;
                }
            };

            try {
                let dados = await buscarPorId();

                if (!dados) {
                    const lista = await PlanoRequests.getAll();
                    if (Array.isArray(lista)) {
                        const searchKey = String(id_plano).toLowerCase();
                        dados = lista.find((item: any) => {
                            const itemId = item.id_plano ?? item.idPlano ?? item.id;
                            const itemCode = item.cod_plano ?? item.codPlano ?? item.codigo ?? item.codPlano;
                            return String(itemId) === searchKey || String(itemCode).toLowerCase() === searchKey;
                        });
                    }
                }

                if (dados) {
                    setPlano(dados);
                } else {
                    setError("Plano não encontrado.");
                }
            } catch (err) {
                console.error("Erro ao carregar detalhes do plano:", err);
                setError("Ocorreu um erro ao buscar as informações do plano.");
            } finally {
                setLoading(false);
            }
        }

        buscarDados();
    }, [id_plano]);

    const tituloPlano = plano?.tipo_plano ?? plano?.tipoPlano ?? plano?.tipo ?? "—";
    const codigoPlano = plano?.cod_plano ?? plano?.codPlano ?? plano?.codigo ?? plano?.code ?? "—";
    const rawDuracaoPlano = plano?.duracao_dias ?? plano?.duracaoDias ?? plano?.duracao ?? plano?.duracaoPlano ?? plano?.duration ?? plano?.days;
    const duracaoPlano = rawDuracaoPlano !== undefined && rawDuracaoPlano !== null && rawDuracaoPlano !== "" ? rawDuracaoPlano : "—";
    const valorPlano = plano?.valor ?? (plano as any)?.valorPlano ?? (plano as any)?.price ?? 0;
    let descricaoPlano = plano?.descricao ?? (plano as any)?.descricaoPlano ?? (plano as any)?.descricao_plano ?? (plano as any)?.description ?? (plano as any)?.descriptionPlano ?? "";
    if (!descricaoPlano || String(descricaoPlano).trim() === "") {
        descricaoPlano = "Não informada";
    }
    const statusRaw = plano?.status_plano ?? plano?.statusPlano ?? plano?.status ?? "inativo";
    const statusPlano = String(statusRaw).toLowerCase() === "ativo" ? "ativo" : "inativo";

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

    if (error || !plano) {
        return (
            <div className="alunos-page">
                <div className="alunos-page__content">
                    <div className="alunos-card flex items-center justify-center p-8">
                        <div className="text-center w-full max-w-md">
                            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                                <i className="pi pi-exclamation-triangle text-red-500 text-2xl"></i>
                            </div>
                            <h2 className="text-lg font-bold text-gray-800 mb-2">Erro ao carregar plano</h2>
                            <p className="text-sm text-gray-400 mb-6">{error || "Erro desconhecido."}</p>
                            <button
                                onClick={() => navigate('/lista/planos')}
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

    const planoId = plano?.id_plano ?? plano?.idPlano ?? plano?.id ?? codigoPlano;
    const initials = `${tituloPlano?.charAt(0) ?? "P"}${codigoPlano?.charAt(0) ?? "L"}`.toUpperCase();

    return (
        <div className="alunos-page">
            <div className="alunos-page__content">
                <div className="alunos-card">
                    <div className="breadcrumb">
                        <button
                            onClick={() => navigate('/lista/planos')}
                            className="text-primary font-medium"
                        >
                            Planos
                        </button>
                        <span className="sep">/</span>
                        <span className="current">{codigoPlano ?? tituloPlano}</span>
                    </div>

                    <div className="detail-layout">
                        <div className="detail-profile-card">
                            <div className="detail-avatar">{initials}</div>
                            <h2>{tituloPlano}</h2>
                            <p className="ra-label">Código: {codigoPlano}</p>
                            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${statusPlano === "ativo" ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"}`}>
                                <span className={`w-2 h-2 rounded-full ${statusPlano === "ativo" ? "bg-green-500" : "bg-orange-400"}`}></span>
                                {statusPlano === "ativo" ? "Ativo" : "Inativo"}
                            </span>
                            <div className="actions w-full mt-4">
                                <button
                                    onClick={() => navigate(`/atualizar/plano/${planoId}`)}
                                    className="btn btn-primary"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => navigate('/lista/planos')}
                                    className="btn btn-secondary"
                                >
                                    Voltar
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5">
                            <div className="detail-info-card">
                                <div className="detail-info-section">
                                    <h3>Detalhes do Plano</h3>
                                    <div className="detail-field">
                                        <div className="detail-field-content">
                                            <label>Tipo do Plano</label>
                                            <span>{tituloPlano}</span>
                                        </div>
                                    </div>
                                    <div className="detail-field">
                                        <div className="detail-field-content">
                                            <label>Duração (dias)</label>
                                            <span>{duracaoPlano}</span>
                                        </div>
                                    </div>
                                    <div className="detail-field">
                                        <div className="detail-field-content">
                                            <label>Valor</label>
                                            <span>{valorPlano != null ? Number(valorPlano).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '—'}</span>
                                        </div>
                                    </div>
                                    <div className="detail-field">
                                        <div className="detail-field-content">
                                            <label>Status</label>
                                            <span>{statusPlano === "ativo" ? "Ativo" : "Inativo"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="detail-info-card">
                                <div className="detail-info-section">
                                    <h3>Descrição</h3>
                                    <div className="detail-field">
                                        <div className="detail-field-content">
                                            <label>Descrição do Plano</label>
                                            <span>{descricaoPlano}</span>
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

export default DetalhesPlano;
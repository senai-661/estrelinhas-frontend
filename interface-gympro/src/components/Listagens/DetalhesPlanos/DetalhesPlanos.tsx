import { useEffect, useState, type JSX } from "react";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { Message } from "primereact/message";
import PlanoRequests from "../../../fetch/PlanoRequests";
import type { PlanoDTO } from "../../../dto/PlanoDTO";
import { useNavigate } from "react-router-dom";

interface DetalhesPlanoProps {
    cod_plano: string;
}

/**
 * Componente que exibe os detalhes de um plano da academia GymPro.
 * Faz a consulta à API com base no código fornecido e monta a visualização.
 */
function DetalhesPlano({ cod_plano }: DetalhesPlanoProps): JSX.Element {
    const [plano, setPlano] = useState<PlanoDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function buscarDados() {
            setLoading(true);
            setError(null);

            try {
                const dados = await PlanoRequests.obterPlanoPorCodigo(cod_plano);
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
    }, [cod_plano]);

    // Renderização do estado de carregamento (Skeleton)
    if (loading) {
        return (
            <Card className="shadow-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <Skeleton shape="circle" size="4rem" />
                        <div className="flex-1">
                            <Skeleton width="60%" height="2rem" className="mb-2" />
                            <Skeleton width="40%" />
                        </div>
                    </div>
                    <Divider />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i}>
                                <Skeleton width="30%" className="mb-2" />
                                <Skeleton width="80%" height="1.5rem" />
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        );
    }

    // Renderização do estado de erro
    if (error || !plano) {
        return (
            <div className="flex justify-center p-4">
                <Message severity="error" text={error || "Erro desconhecido."} />
            </div>
        );
    }

    // Renderização dos detalhes do plano
    return (
        <main className="bg-gray-200 flex-1 py-6 sm:py-10 px-4 overflow-y-auto">
            <Card
                title={plano.tipo_plano}
                className="shadow-lg animate-fade-in transition-all duration-300 w-full max-w-4xl p-4 sm:p-6 md:p-8 mx-auto font-bold text-xl"
            >
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <span className="text-gray-500 font-medium tracking-tight">Código do Plano</span>
                        <Tag value={plano.cod_plano} severity="info" className="px-3 py-1" />
                    </div>

                    <Divider />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
                        {/* Seção de Informações do Plano */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-lg font-semibold text-primary-700 flex items-center gap-2">
                                <i className="pi pi-list text-blue-500"></i> Informações do Plano
                            </h3>
                            <div className="flex flex-col gap-3 ml-1 border-l-2 border-blue-50 relative pl-4">
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Tipo do Plano</span>
                                    <span className="text-gray-700 font-medium">{plano.tipo_plano}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Duração</span>
                                    <span className="text-gray-700 font-medium">{plano.duracao_dias} dias</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Status do Plano</span>
                                    <Tag
                                        value={plano.status_plano ?? "Indefinido"}
                                        severity={plano.status_plano === "ativo" ? "success" : "danger"}
                                        className="w-fit mt-1 rounded-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Seção de Valor e Descrição */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-lg font-semibold text-primary-700 flex items-center gap-2">
                                <i className="pi pi-dollar text-green-500"></i> Valor e Descrição
                            </h3>
                            <div className="flex flex-col gap-3 ml-1 border-l-2 border-green-50 relative pl-4">
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Valor Mensal</span>
                                    <span className="text-gray-700 font-medium">
                                        {plano.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Descrição</span>
                                    <span className="text-gray-700 font-medium leading-relaxed">
                                        {plano.descricao ? plano.descricao : "Sem descrição cadastrada."}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <style>{`
                    .animate-fade-in {
                        animation: fadeIn 0.5s ease-out;
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
            </Card>

            <div className="w-full max-w-4xl mx-auto mt-6 sm:mt-8">
                <button
                    className="w-full bg-slate-700 hover:bg-slate-500 text-white px-4 py-3 md:mb-2 rounded-md font-bold transition-all shadow-md active:scale-95"
                    onClick={() => navigate(`/atualizar/plano/${plano.cod_plano}`)}
                >
                    Editar Plano
                </button>
                <button
                    className="w-full bg-white text-black hover:bg-slate-500 px-4 py-3 rounded-md font-bold transition-all shadow-md active:scale-95"
                    onClick={() => navigate(`/lista/planos`)}
                >
                    Voltar
                </button>
            </div>
        </main>
    );
}

export default DetalhesPlano;
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

    // Loading skeleton
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-start justify-center py-10 px-4">
                <div className="w-full max-w-5xl animate-pulse">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-64 bg-white rounded-2xl h-80 flex-shrink-0" />
                        <div className="flex-1 flex flex-col gap-4">
                            <div className="bg-white rounded-2xl h-44" />
                            <div className="bg-white rounded-2xl h-44" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !aluno) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl border border-red-100 p-10 max-w-md w-full text-center shadow-sm">
                    <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4">
                        <i className="pi pi-exclamation-triangle text-orange-500 text-2xl" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">Erro ao carregar aluno</h2>
                    <p className="text-sm text-gray-400 mb-6">{error || "Erro desconhecido."}</p>
                    <button
                        onClick={() => navigate("/lista/alunos")}
                        className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-sm font-bold rounded-xl transition-all"
                    >
                        Voltar para a lista
                    </button>
                </div>
            </div>
        );
    }

    const formatarData = (data: Date | string) => {
        try {
            const d = new Date(data);
            if (isNaN(d.getTime())) return "Não informado";
            return d.toLocaleDateString("pt-BR");
        } catch {
            return "Não informado";
        }
    };

    const iniciais = `${aluno.nome?.charAt(0) ?? ""}${aluno.sobrenome?.charAt(0) ?? ""}`.toUpperCase();

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="w-full max-w-5xl mx-auto">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm mb-6">
                    <button
                        onClick={() => navigate("/lista/alunos")}
                        className="text-orange-500 hover:text-orange-600 font-semibold transition-colors"
                    >
                        Alunos
                    </button>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-500 font-medium">{aluno.nome} {aluno.sobrenome}</span>
                </div>

                {/* Layout principal */}
                <div className="flex flex-col md:flex-row gap-6">

                    {/* Sidebar — Perfil */}
                    <div className="w-full md:w-64 flex-shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center gap-4">
                        {/* Avatar */}
                        <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                            {iniciais}
                        </div>

                        {/* Nome */}
                        <div className="text-center">
                            <h2 className="text-base font-bold text-gray-900">{aluno.nome} {aluno.sobrenome}</h2>
                            <p className="text-xs text-gray-400 mt-0.5">RA: <span className="font-mono text-orange-500">{aluno.cod_aluno ?? "—"}</span></p>
                        </div>

                        {/* Badge status */}
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                            aluno.statusAluno
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-600"
                        }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${aluno.statusAluno ? "bg-green-500" : "bg-red-400"}`} />
                            {aluno.statusAluno ? "Ativo" : "Inativo"}
                        </span>

                        <div className="w-full border-t border-gray-100 mt-2" />

                        {/* Botões */}
                        <div className="w-full flex flex-col gap-2">
                            <button
                                onClick={() => navigate(`/atualizar/aluno/${aluno.idAluno}`)}
                                className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-sm font-bold py-2.5 rounded-xl transition-all shadow-sm"
                            >
                                <i className="pi pi-pencil mr-2" />
                                Editar Aluno
                            </button>
                            <button
                                onClick={() => navigate("/lista/alunos")}
                                className="w-full bg-white hover:bg-gray-50 active:scale-95 text-gray-700 text-sm font-bold py-2.5 rounded-xl border border-gray-200 transition-all"
                            >
                                <i className="pi pi-arrow-left mr-2" />
                                Voltar
                            </button>
                        </div>
                    </div>

                    {/* Cards de informação */}
                    <div className="flex-1 flex flex-col gap-4">

                        {/* Card — Dados Cadastrais */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-2 mb-5">
                                <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center">
                                    <i className="pi pi-id-card text-white text-xs" />
                                </div>
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Dados Cadastrais</h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Campo label="ID do Sistema" valor={String(aluno.idAluno ?? "—")} icone="pi-hashtag" />
                                <Campo label="Código do Aluno (RA)" valor={aluno.cod_aluno ?? "—"} icone="pi-bookmark" destaque />
                                <Campo label="CPF" valor={aluno.cpf ?? "Não informado"} icone="pi-file" />
                                <Campo label="Data de Nascimento" valor={formatarData(aluno.dataNascimento)} icone="pi-calendar" />
                            </div>
                        </div>

                        {/* Card — Contato e Localização */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-2 mb-5">
                                <div className="w-7 h-7 rounded-lg bg-black flex items-center justify-center">
                                </div>
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Contato e Localização</h3>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Campo label="E-mail" valor={aluno.email ?? "Não informado"} icone="pi-envelope" />
                                <Campo label="Celular / Telefone" valor={aluno.celular ?? "Não informado"} icone="pi-phone" />
                                <div className="sm:col-span-2">
                                    <Campo label="Endereço Residencial" valor={aluno.endereco ?? "Não informado"} icone="pi-home" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

// Componente auxiliar de campo
interface CampoProps {
    label: string;
    valor: string;
    icone: string;
    destaque?: boolean;
}

function Campo({ label, valor, icone, destaque = false }: CampoProps) {
    return (
        <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-orange-50 transition-colors group">
            <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 group-hover:border-orange-200 flex items-center justify-center flex-shrink-0 shadow-sm transition-colors">
                <i className={`pi ${icone} text-orange-400 text-sm`} />
            </div>
            <div className="flex flex-col min-w-0">
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{label}</span>
                <span className={`text-sm font-semibold truncate mt-0.5 ${destaque ? "text-orange-500 font-mono" : "text-gray-800"}`}>
                    {valor}
                </span>
            </div>
        </div>
    );
}

export default DetalhesAluno;
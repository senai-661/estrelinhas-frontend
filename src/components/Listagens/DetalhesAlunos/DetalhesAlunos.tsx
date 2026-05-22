import { useEffect, useState, type JSX } from "react";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { Divider } from "primereact/divider";
import { Message } from "primereact/message";
import AlunoRequests from "../../../fetch/AlunoRequest";
import type AlunoDTO from "../../../dto/AlunoDTO";
import { useNavigate } from "react-router-dom";

interface DetalhesAlunoProps {
    id_aluno: number;
}

function DetalhesAluno({ id_aluno }: DetalhesAlunoProps): JSX.Element {
    const [aluno, setAluno] = useState<AlunoDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
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
                console.error("Erro ao carregar aluno:", err);
                setError("Erro ao buscar informações.");
            } finally {
                setLoading(false);
            }
        }

        buscarDados();
    }, [id_aluno]);

    if (loading) {
        return (
            <Card>
                <div className="flex flex-col gap-4">
                    <Skeleton width="60%" height="2rem" />
                    <Divider />
                    {[1, 2, 3].map((i) => (
                        <div key={i}>
                            <Skeleton width="30%" className="mb-2" />
                            <Skeleton width="80%" height="1.5rem" />
                        </div>
                    ))}
                </div>
            </Card>
        );
    }

    if (error || !aluno) {
        return (
            <div className="flex justify-center p-4">
                <Message severity="error" text={error || "Erro desconhecido."} />
            </div>
        );
    }

    return (
        <main className="bg-gray-200 min-h-screen flex items-center justify-center p-4">
            <Card
                title={aluno.nome}
                className="shadow-lg w-full max-w-md p-6 text-lg"
            >
                <div className="flex flex-col gap-4">

                    <Divider />

                    {/* CPF */}
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500">CPF</span>
                        <span className="font-medium">{aluno.cpf}</span>
                    </div>

                    {/* TELEFONE */}
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500">Telefone</span>
                        <span className="font-medium">
                            {aluno.celular || "Não informado"}
                        </span>
                    </div>

                </div>
            </Card>

            <div className="w-full max-w-md mt-6">
                <button
                    className="w-full bg-slate-700 hover:bg-slate-500 text-white px-4 py-3 rounded-md font-bold mb-2"
                    onClick={() => navigate(`/atualizar/aluno/${aluno.id_aluno}`)}
                >
                    Editar
                </button>

                <button
                    className="w-full bg-white text-black hover:bg-slate-200 px-4 py-3 rounded-md font-bold"
                    onClick={() => navigate(`/lista/alunos`)}
                >
                    Voltar
                </button>
            </div>
        </main>
    );
}

export default DetalhesAluno;
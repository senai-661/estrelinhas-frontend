import { type JSX } from "react";
import { useState, useEffect } from "react";
import AlunoRequests from "../../../fetch/AlunoRequests";
import type AlunoDTO from "../../../dto/AlunoDTO";

function ListagemAlunos(): JSX.Element {
    const [alunos, setAlunos] = useState<AlunoDTO[]>([]);

    useEffect(() => {
        const buscarAlunos = async () => {
            try {
                const listaDeAlunos = await AlunoRequests.obterListaDeAlunos();
                if (listaDeAlunos) {
                    setAlunos(listaDeAlunos);
                }
            } catch (error) {
                console.error(`Erro ao buscar alunos. ${error}`);
                alert("Erro ao carregar alunos.");
            }
        }

        buscarAlunos();
    }, []);

    return (
        <main className="bg-gray-200 h-[76vh]">
            
            <div className="w-8/10 flex m-auto p-12 items-center">
                <h1 className="w-9/10 text-3xl text-center text-orange-600 font-bold">
                    Alunos - GymPro
                </h1>

                <a 
                    href="#" 
                    className="w-1/10 p-3 text-md bg-orange-500 rounded-md text-center text-white font-bold flex items-center justify-center hover:bg-orange-600"
                >
                    Novo Aluno
                </a>
            </div>

            <div className="w-8/10 max-w-[80%] max-h-7/10 overflow-auto m-auto border border-orange-400 rounded-md">
                
                <table className="table-auto w-full border-collapse text-sm">
                    
                    <thead className="bg-orange-500 sticky top-0 z-10">
                        <tr>
                            <th className="text-white">ID</th>
                            <th className="text-white p-4">Nome</th>
                            <th className="text-white">E-mail</th>
                            <th className="text-white">Telefone</th>
                            <th className="text-white">Status</th>
                            <th className="text-white">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {alunos.map((aluno) => (
                            <tr 
                                key={aluno.id_aluno}
                                className="border-b text-center odd:bg-orange-50 even:bg-white hover:bg-orange-200 hover:cursor-pointer"
                            >
                                <td>{aluno.id_aluno}</td>
                                <td>{aluno.nome} {aluno.sobrenome}</td>
                                <td>{aluno.email}</td>
                                <td>{aluno.celular}</td>
                                <td>
                                    {aluno.status_aluno ? "Ativo" : "Inativo"}
                                </td>
                                <td>
                                    <a href="#" className="inline-block bg-blue-500 p-2 m-2 rounded-md text-white">
                                        Detalhes
                                    </a>
                                    <a href="#" className="inline-block bg-green-500 p-2 m-2 rounded-md text-white">
                                        Atualizar
                                    </a>
                                    <a href="#" className="inline-block bg-red-500 p-2 m-2 rounded-md text-white">
                                        Deletar
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        </main>
    );
}

export default ListagemAlunos;
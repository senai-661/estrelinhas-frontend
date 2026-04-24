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
                setAlunos(listaDeAlunos);
            } catch (error) {
                console.error(`Erro ao buscar alunos. ${error}`);
                alert("Erro ao criar a listagem de alunos.");
            }
        }

        buscarAlunos();
    }, []);

    return (
        <main className="bg-white h-[76vh] flex flex-col">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-12 py-8 shadow-lg">
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-bold text-white m-0">👥 Alunos</h1>
                    <a href="#" className="px-8 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        + Novo Aluno
                    </a>
                </div>
            </div>

            <div className="flex-1 overflow-auto px-12 py-8">
                <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-black text-white border-b-2 border-orange-500">
                                <th className="px-6 py-4 text-left font-semibold">ID</th>
                                <th className="px-6 py-4 text-left font-semibold">Código</th>
                                <th className="px-6 py-4 text-left font-semibold">Nome</th>
                                <th className="px-6 py-4 text-left font-semibold">E-mail</th>
                                <th className="px-6 py-4 text-left font-semibold">Celular</th>
                                <th className="px-6 py-4 text-center font-semibold">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alunos.map((aluno, index) => (
                                <tr key={aluno.id_aluno} className={`border-b transition-colors ${
                                    index % 2 === 0 ? 'bg-white hover:bg-orange-50' : 'bg-gray-50 hover:bg-orange-50'
                                }`}>
                                    <td className="px-6 py-4 text-gray-900 font-medium">{aluno.id_aluno}</td>
                                    <td className="px-6 py-4 text-gray-900 font-medium text-orange-600">{aluno.cod_aluno}</td>
                                    <td className="px-6 py-4 text-gray-900">{aluno.nome} {aluno.sobrenome}</td>
                                    <td className="px-6 py-4 text-gray-600 text-sm">{aluno.email}</td>
                                    <td className="px-6 py-4 text-gray-600 text-sm">{aluno.celular}</td>
                                    <td className="px-6 py-4 text-center space-x-2">
                                        <a href="#" className="inline-block bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all">Detalhes</a>
                                        <a href="#" className="inline-block bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all">Editar</a>
                                        <a href="#" className="inline-block bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all">Deletar</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );}


export default ListagemAlunos;
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
        <main className="bg-gradient-to-br from-gray-50 to-white min-h-[76vh] flex flex-col">
            <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 px-8 py-6 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">👥</span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white m-0">Alunos</h1>
                            <p className="text-orange-100 text-sm mt-1">Gerencie todos os alunos da academia</p>
                        </div>
                    </div>
                    <button className="px-6 py-3 bg-white text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2">
                        <span className="text-lg">+</span>
                        <span>Novo Aluno</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-auto px-8 py-6">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">Lista de Alunos</h2>
                        <p className="text-sm text-gray-600 mt-1">Total: {alunos.length} alunos cadastrados</p>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
                                <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">ID</th>
                                <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Código</th>
                                <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Nome</th>
                                <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">E-mail</th>
                                <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Celular</th>
                                <th className="px-6 py-4 text-center font-semibold text-sm uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alunos.map((aluno, index) => (
                                <tr key={aluno.id_aluno} className={`border-b border-gray-100 transition-all duration-200 ${
                                    index % 2 === 0 ? 'bg-white hover:bg-orange-50' : 'bg-gray-50 hover:bg-orange-50'
                                }`}>
                                    <td className="px-6 py-4 text-gray-900 font-medium">{aluno.id_aluno}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                                            {aluno.cod_aluno}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 font-medium">{aluno.nome} {aluno.sobrenome}</td>
                                    <td className="px-6 py-4 text-gray-600 text-sm">{aluno.email}</td>
                                    <td className="px-6 py-4 text-gray-600 text-sm font-mono">{aluno.celular}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center space-x-2">
                                            <button className="px-3 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white text-xs font-semibold transition-all duration-200 transform hover:scale-105 shadow-md">
                                                👁️ Detalhes
                                            </button>
                                            <button className="px-3 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-white text-xs font-semibold transition-all duration-200 transform hover:scale-105 shadow-md">
                                                ✏️ Editar
                                            </button>
                                            <button className="px-3 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white text-xs font-semibold transition-all duration-200 transform hover:scale-105 shadow-md">
                                                🗑️ Deletar
                                            </button>
                                        </div>
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
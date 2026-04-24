import { type JSX, useEffect, useState } from "react";
import MatriculaRequests from "../../../fetch/MatriculaRequests";
import type MatriculaDTO from "../../../dto/MatriculaDTO";
import AuthRequests from "../../../fetch/AuthRequests";

function ListagemMatriculas(): JSX.Element {
    const [matriculas, setMatriculas] = useState<MatriculaDTO[]>([]);

    useEffect(() => {
        const buscarMatriculas = async () => {
            try {
                // Verificar se usuário está autenticado
                const token = localStorage.getItem('token');
                const isAuth = localStorage.getItem('isAuth');

                if (!token || !isAuth || !AuthRequests.checkTokenExpiry()) {
                    console.error('Usuário não autenticado');
                    alert('Você precisa estar logado para acessar esta página.');
                    return;
                }

                console.log('Buscando matrículas...');
                const lista = await MatriculaRequests.obterListaDeMatriculas();
                console.log('Matrículas recebidas:', lista);
                setMatriculas(Array.isArray(lista) ? lista : []);
            } catch (error) {
                console.error(`Erro ao buscar matrículas:`, error);
                alert(`Erro ao carregar matrículas: ${error}`);
                setMatriculas([]);
            }
        };

        buscarMatriculas();
    }, []);

    return (
        <main className="bg-gradient-to-br from-gray-50 to-white min-h-[76vh] flex flex-col">
            <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 px-8 py-6 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">📋</span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white m-0">Matrículas</h1>
                            <p className="text-orange-100 text-sm mt-1">Controle das matrículas dos alunos</p>
                        </div>
                    </div>
                    <button className="px-6 py-3 bg-white text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2">
                        <span className="text-lg">+</span>
                        <span>Nova Matrícula</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-auto px-8 py-6">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">Lista de Matrículas</h2>
                        <p className="text-sm text-gray-600 mt-1">Total: {matriculas.length} matrículas ativas</p>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
                                <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">ID</th>
                                <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Código</th>
                                <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Aluno</th>
                                <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Plano</th>
                                <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Início</th>
                                <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Fim</th>
                                <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-center font-semibold text-sm uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matriculas && matriculas.length > 0 ? (
                                matriculas.map((matricula, index) => (
                                    <tr
                                        key={matricula.id_matricula}
                                        className={`border-b border-gray-100 transition-all duration-200 ${
                                            index % 2 === 0 ? 'bg-white hover:bg-orange-50' : 'bg-gray-50 hover:bg-orange-50'
                                        }`}
                                    >
                                        <td className="px-6 py-4 text-gray-900 font-medium">{matricula.id_matricula}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                                                {matricula.cod_matricula}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-900 font-medium">{matricula.aluno?.nome || "N/A"}</td>
                                        <td className="px-6 py-4 text-gray-600">{matricula.plano?.tipo_plano || "N/A"}</td>
                                        <td className="px-6 py-4 text-gray-600 text-sm font-mono">{new Date(matricula.data_inicio).toLocaleDateString('pt-BR')}</td>
                                        <td className="px-6 py-4 text-gray-600 text-sm font-mono">{new Date(matricula.data_fim).toLocaleDateString('pt-BR')}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                matricula.status_matricula === 'Ativa' 
                                                    ? 'bg-green-100 text-green-700' 
                                                    : 'bg-red-100 text-red-700'
                                            }`}>
                                                {matricula.status_matricula}
                                            </span>
                                        </td>
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
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center">
                                            <span className="text-4xl mb-4">📋</span>
                                            <p className="text-lg font-medium">Nenhuma matrícula encontrada</p>
                                            <p className="text-sm">Verifique se o servidor está rodando ou se há dados cadastrados.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}

export default ListagemMatriculas; 
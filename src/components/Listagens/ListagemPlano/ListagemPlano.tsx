import { type JSX } from "react";
import { useState, useEffect } from "react";
import PlanoRequests from "../../../fetch/PlanoRequests";
import type PlanoDTO from "../../../dto/PlanoDTO";

function ListagemPlanos(): JSX.Element {
    const [planos, setPlanos] = useState<PlanoDTO[]>([]);

    useEffect(() => {
        const buscarPlanos = async () => {
            try {
                const listaDePlanos = await PlanoRequests.obterListaDePlanos();
                setPlanos(listaDePlanos);
            } catch (error) {
                console.error(`Erro ao buscar planos. ${error}`);
                alert("Erro ao criar a listagem de planos.");
            }
        }

        buscarPlanos();
    }, []);

    return (
        <main className="bg-white h-[76vh] flex flex-col">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-12 py-8 shadow-lg">
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-bold text-white m-0">💳 Planos</h1>
                    <a href="#" className="px-8 py-3 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        + Novo Plano
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
                                <th className="px-6 py-4 text-left font-semibold">Tipo</th>
                                <th className="px-6 py-4 text-left font-semibold">Duração (dias)</th>
                                <th className="px-6 py-4 text-left font-semibold">Valor</th>
                                <th className="px-6 py-4 text-left font-semibold">Status</th>
                                <th className="px-6 py-4 text-center font-semibold">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {planos.map((plano, index) => (
                                <tr className={`border-b transition-colors ${
                                    index % 2 === 0 ? 'bg-white hover:bg-orange-50' : 'bg-gray-50 hover:bg-orange-50'
                                }`} key={plano.id_plano}>
                                    <td className="px-6 py-4 text-gray-900 font-medium">{plano.id_plano}</td>
                                    <td className="px-6 py-4 text-gray-900 font-medium text-orange-600">{plano.cod_plano}</td>
                                    <td className="px-6 py-4 text-gray-900">{plano.tipo_plano}</td>
                                    <td className="px-6 py-4 text-gray-900">{plano.duracao_dias}</td>
                                    <td className="px-6 py-4 text-gray-900 font-semibold text-orange-600">R$ {Number(plano.valor).toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                                            plano.status_plano === 'Ativa' 
                                                ? 'bg-green-100 text-green-700' 
                                                : 'bg-red-100 text-red-700'
                                        }`}>{plano.status_plano}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center space-x-2">
                                        <a href="#" className="inline-block bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-lg text-white text-sm font-semibold transition-all">Detalhes</a>
                                        <a href="#" className="inline-block bg-orange-500 hover:bg-orange-600 px-3 py-2 rounded-lg text-white text-sm font-semibold transition-all">Editar</a>
                                        <a href="#" className="inline-block bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg text-white text-sm font-semibold transition-all">Deletar</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}

export default ListagemPlanos;
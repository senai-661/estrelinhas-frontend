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
        <main className="bg-gray-200 h-[76vh]">
            <div className="w-8/10 flex m-auto p-12">
                <h1 className="w-9/10 text-3xl text-center">Planos</h1>
                <a href="#" className="w-1/10 text-md p-3 bg-slate-700 rounded-md text-center text-white font-bold flex items-center justify-center hover:cursor-pointer">
                    Novo Plano
                </a>
            </div>

            <div className="w-8/10 max-w-[80%] max-h-7/10 overflow-auto overscroll-none m-auto border border-slate-800">
                <table className="table-auto w-full border-collapse text-sm">
                    <thead className="bg-slate-700 sticky top-0 z-10">
                        <tr>
                            <th className="border border-slate-600 text-white">ID</th>
                            <th className="border border-slate-600 text-white p-4">Código</th>
                            <th className="border border-slate-600 text-white">Tipo</th>
                            <th className="border border-slate-600 text-white">Duração (dias)</th>
                            <th className="border border-slate-600 text-white">Valor</th>
                            <th className="border border-slate-600 text-white">Status</th>
                            <th className="border border-slate-600 text-white">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {planos.map((plano) => (
                            <tr className="border-b-2 text-center odd:bg-slate-300 even:bg-slate-100 hover:bg-slate-600 hover:text-white hover:cursor-pointer" key={plano.id_plano}>
                                <td>{plano.id_plano}</td>
                                <td className="p-3">{plano.cod_plano}</td>
                                <td>{plano.tipo_plano}</td>
                                <td>{plano.duracao_dias}</td>
                                <td>R$ {Number(plano.valor).toFixed(2)}</td>
                                <td>{plano.status_plano}</td>
                                <td>
                                    <a href="#" className="inline-block bg-sky-600 p-2 m-2 w-1/5 rounded-md text-white text-center">Detalhes</a>
                                    <a href="#" className="inline-block bg-emerald-700 p-2 m-2 w-1/5 rounded-md text-white">Atualizar</a>
                                    <a href="#" className="inline-block bg-red-600 p-2 m-2 w-1/5 rounded-md text-white">Deletar</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default ListagemPlanos;
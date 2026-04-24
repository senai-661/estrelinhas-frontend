import { type JSX } from "react";
import { useState, useEffect } from "react";
import PlanoRequests from '../../fetch/PlanoRequests';
import type {PlanoDTO} from '../../dto/PlanoDTO';


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

    const formatarValor = (valor: number): string => {
        return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    };

    return (
        <main className="bg-gray-200 h-[76vh]">
            <div className="w-8/10 flex m-auto p-12">
                <h1 className="w-9/10 text-3xl text-center">Planos</h1>
                <a href="#" className="w-1/10 p-3 text-md bg-slate-700 rounded-md text-center text-white font-bold flex items-center justify-center hover:cursor-pointer">
                    Novo Plano
                </a>
            </div>

            <div className="w-8/10 max-w-[80%] max-h-7/10 overflow-auto overscroll-none m-auto border border-slate-800">
                <table className="table-auto w-full border-collapse text-sm">
                    <thead className="bg-slate-700 sticky top-0 z-10">
                        <tr>
                            <th className="border border-slate-600 text-white p-4">Cód. Plano</th>
                            <th className="border border-slate-600 text-white p-4">Tipo</th>
                            <th className="border border-slate-600 text-white p-4">Duração</th>
                            <th className="border border-slate-600 text-white p-4">Valor</th>
                            <th className="border border-slate-600 text-white p-4">Status</th>
                            <th className="border border-slate-600 text-white p-4">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {planos.map((plano, index) => (
                            <tr
                                className="border-b-2 text-center odd:bg-slate-300 even:bg-slate-100 hover:bg-slate-600 hover:text-white hover:cursor-pointer"
                                key={plano.cod_plano ?? index}
                            >
                                <td className="p-3 font-mono text-xs">{plano.cod_plano}</td>
                                <td className="p-3">{plano.tipo_plano}</td>
                                <td className="p-3">{plano.duracao_dias} dias</td>
                                <td className="p-3 font-semibold">{formatarValor(plano.valor)}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded-full text-white text-xs font-semibold
                                        ${plano.status_plano === "ATIVO"   ? "bg-emerald-500" :
                                          plano.status_plano === "INATIVO" ? "bg-red-500"     :
                                          "bg-gray-400"}`}>
                                        {plano.status_plano ?? "—"}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <a href="#" className="inline-block bg-sky-600 p-2 m-1 w-1/4 rounded-md text-white text-center">Detalhes</a>
                                    <a href="#" className="inline-block bg-emerald-400 p-2 m-1 w-1/4 rounded-md text-white text-center">Atualizar</a>
                                    <a href="#" className="inline-block bg-red-600 p-2 m-1 w-1/4 rounded-md text-white text-center">Deletar</a>
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
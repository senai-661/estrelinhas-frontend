import { type JSX } from "react";
import { useState, useEffect } from "react";
import MatriculaRequests from "../../fetch/MatriculaRequests";
import type { MatriculaDTO } from "../../dto/MatriculaDTO";

function ListagemMatriculas(): JSX.Element {
    const [matriculas, setMatriculas] = useState<MatriculaDTO[]>([]);

    useEffect(() => {
        const buscarMatriculas = async () => {
            try {
                const lista = await MatriculaRequests.obterListaDeMatriculas();
                setMatriculas(lista);
            } catch (error) {
                console.error(`Erro ao buscar matrículas. ${error}`);
                alert("Erro ao criar a listagem de matrículas.");
            }
        }

        buscarMatriculas();
    }, []);

    const formatarData = (data: string | Date): string => {
        return new Date(data).toLocaleDateString("pt-BR");
    };

    const formatarValor = (valor: number): string => {
        return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    };

    return (
        <main className="bg-gray-200 h-[76vh]">
            <div className="w-8/10 flex m-auto p-12">
                <h1 className="w-9/10 text-3xl text-center">Matrículas</h1>
                <a href="#" className="w-1/10 p-3 text-md bg-slate-700 rounded-md text-center text-white font-bold flex items-center justify-center hover:cursor-pointer">
                    Nova Matrícula
                </a>
            </div>

            <div className="w-8/10 max-w-[80%] max-h-7/10 overflow-auto overscroll-none m-auto border border-slate-800">
                <table className="table-auto w-full border-collapse text-sm">
                    <thead className="bg-slate-700 sticky top-0 z-10">
                        <tr>
                            <th className="border border-slate-600 text-white p-4">Cód. Matrícula</th>
                            <th className="border border-slate-600 text-white p-4">Vigência</th>
                            <th className="border border-slate-600 text-white p-4">Valor Final</th>
                            <th className="border border-slate-600 text-white p-4">Forma Pgto.</th>
                            <th className="border border-slate-600 text-white p-4">Status</th>
                            <th className="border border-slate-600 text-white p-4">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matriculas.map((matricula, index) => (
                            <tr
                                className="border-b-2 text-center odd:bg-slate-300 even:bg-slate-100 hover:bg-slate-600 hover:text-white hover:cursor-pointer"
                                key={matricula.cod_matricula ?? index}
                            >
                                <td className="p-3 font-mono text-xs">{matricula.cod_matricula}</td>
                                <td className="p-3">
                                    {formatarData(matricula.data_inicio)} → {formatarData(matricula.data_fim)}
                                </td>
                                <td className="p-3 font-semibold">{formatarValor(matricula.valor_final)}</td>
                                <td className="p-3">{matricula.forma_pagamento ?? "—"}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded-full text-white text-xs font-semibold
                                        ${matricula.status_matricula === "ATIVA"    ? "bg-emerald-500" :
                                          matricula.status_matricula === "INATIVA"  ? "bg-red-500"     :
                                          matricula.status_matricula === "PENDENTE" ? "bg-yellow-500"  :
                                          "bg-gray-400"}`}>
                                        {matricula.status_matricula}
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

export default ListagemMatriculas;
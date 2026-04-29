import { type JSX } from "react";
import { useState, useEffect } from "react";
import MatriculaRequests from "../../../fetch/MatriculaRequest";
import type MatriculaDTO from "../../../dto/MatriculaDTO";

function ListagemMatriculas(): JSX.Element {
    const [matriculas, setMatriculas] = useState<MatriculaDTO[]>([]);

    useEffect(() => {
        const buscarMatriculas = async () => {
            try {
                const lista = await MatriculaRequests.obterListaDeMatriculas();
                setMatriculas(lista ?? []);
            } catch (error) {
                console.error(`Erro ao buscar matrículas. ${error}`);
                alert("Erro ao carregar as matrículas.");
            }
        };

        buscarMatriculas();
    }, []);

    return (
        <main className="bg-gray-200 h-[76vh]">
            <div className="w-8/10 flex m-auto p-12">
                <h1 className="w-9/10 text-3xl text-center">Matrículas</h1>
                <a
                    href="#"
                    className="w-1/10 p-3 text-md bg-orange-500 rounded-md text-center text-white font-bold flex items-center justify-center hover:bg-orange-600"
                >
                    Nova Matrícula
                </a>
            </div>

            <div className="w-8/10 max-w-[80%] max-h-7/10 overflow-auto m-auto border border-slate-800">
                <table className="table-auto w-full border-collapse text-sm">
                    <thead className="bg-orange-500 sticky top-0 z-10">
                        <tr>
                            <th className="border border-slate-600 text-white">ID</th>
                            <th className="border border-slate-600 text-white p-4">Aluno</th>
                            <th className="border border-slate-600 text-white">Plano</th>
                            <th className="border border-slate-600 text-white">Data Início</th>
                            <th className="border border-slate-600 text-white">Data Fim</th>
                            <th className="border border-slate-600 text-white">Status</th>
                            <th className="border border-slate-600 text-white">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matriculas.map((matricula) => (
                            <tr
                                key={matricula.id_matricula}
                                className="border-b-2 text-center odd:bg-slate-300 even:bg-slate-100 hover:bg-orange-500 hover:text-white"
                            >
                                <td>{matricula.id_matricula}</td>
                                <td className="p-3">
                                    {matricula.aluno.nome ?? ""} {matricula.aluno.sobrenome ?? ""}
                                </td>
                                <td>{matricula.plano.nome ?? ""}</td>
                                <td>{new Date(matricula.data_inicio).toLocaleDateString()}</td>
                                <td>{matricula.data_fim ? new Date(matricula.data_fim).toLocaleDateString() : "-"}</td>
                                <td>{matricula.status_matricula ?? (matricula.ativo ? "Ativa" : "Inativa")}</td>
                                <td>
                                    <a className="inline-block bg-blue-500 p-2 m-1 rounded-md text-white">
                                        Detalhes
                                    </a>
                                    <a className="inline-block bg-green-500 p-2 m-1 rounded-md text-white">
                                        Atualizar
                                    </a>
                                    <a className="inline-block bg-red-500 p-2 m-1 rounded-md text-white">
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

export default ListagemMatriculas;
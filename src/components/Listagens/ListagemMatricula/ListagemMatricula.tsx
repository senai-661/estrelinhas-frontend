import { type JSX, useEffect, useState } from "react";
import MatriculaRequests from "../../../fetch/MatriculaRequests";
import type MatriculaDTO from "../../../dto/MatriculaDTO";

function ListagemMatriculas(): JSX.Element {
    const [matriculas, setMatriculas] = useState<MatriculaDTO[]>([]);

    useEffect(() => {
        const buscarMatriculas = async () => {
            try {
                const lista = await MatriculaRequests.obterListaDeMatriculas();
                setMatriculas(lista);
            } catch (error) {
                console.error(`Erro ao buscar matrículas. ${error}`);
                alert("Erro ao carregar matrículas.");
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
                    className="w-1/10 text-md bg-slate-700 rounded-md text-center text-white font-bold flex items-center justify-center hover:cursor-pointer"
                >
                    Nova Matrícula
                </a>
            </div>

            <div className="w-8/10 max-w-[80%] max-h-7/10 overflow-auto m-auto border border-slate-800">
                <table className="table-auto w-full border-collapse text-sm">
                    <thead className="bg-slate-700 sticky top-0 z-10">
                        <tr>
                            <th className="border text-white">ID</th>
                            <th className="border text-white p-4">Código</th>
                            <th className="border text-white">Aluno</th>
                            <th className="border text-white">Plano</th>
                            <th className="border text-white">Início</th>
                            <th className="border text-white">Fim</th>
                            <th className="border text-white">Status</th>
                            <th className="border text-white">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {matriculas.map((matricula) => (
                            <tr
                                key={matricula.id_matricula}
                                className="border-b-2 text-center odd:bg-slate-300 even:bg-slate-100 hover:bg-slate-600 hover:text-white"
                            >
                                <td>{matricula.id_matricula}</td>

                                <td className="p-3">
                                    {matricula.cod_matricula}
                                </td>

                    
                                <td>
                                    {matricula.aluno?.nome || "N/A"}
                                </td>

                        
                                <td>
                                    {matricula.plano?.tipo_plano || "N/A"}
                                </td>

                    
                                <td>
                                    {new Date(matricula.data_inicio).toLocaleDateString()}
                                </td>

                                <td>
                                    {new Date(matricula.data_fim).toLocaleDateString()}
                                </td>

                                <td>
                                    {matricula.status_matricula}
                                </td>

                                <td>
                                    <a
                                        href="#"
                                        className="inline-block bg-sky-600 p-2 m-1 rounded-md text-sm text-white"
                                    >
                                        Detalhes
                                    </a>

                                    <a
                                        href="#"
                                        className="inline-block bg-emerald-700 p-2 m-1 rounded-md text-sm text-white"
                                    >
                                        Atualizar
                                    </a>

                                    <a
                                        href="#"
                                        className="inline-block bg-red-600 p-2 m-1 rounded-md text-sm text-white"
                                    >
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
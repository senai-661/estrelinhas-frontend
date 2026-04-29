import { type JSX } from "react";

function ListagemPlanos(): JSX.Element {
    return (
        <main className="bg-gray-200 h-[76vh]">
            <div className="w-8/10 flex m-auto p-12">
                <h1 className="w-9/10 text-3xl text-center">Planos</h1>
                <a
                    href="#"
                    className="w-1/10 text-md bg-slate-700 rounded-md text-center text-white font-bold flex items-center justify-center hover:cursor-pointer"
                >
                    Novo Plano
                </a>
            </div>

            <div className="w-8/10 max-w-[80%] max-h-7/10 overflow-auto overscroll-none m-auto border border-slate-800">
                <table className="table-auto w-full border-collapse text-sm">
                    <thead className="bg-slate-700 sticky top-0 z-10">
                        <tr>
                            <th className="border border-slate-600 text-white">ID</th>
                            <th className="border border-slate-600 text-white p-4">Nome</th>
                            <th className="border border-slate-600 text-white">Descrição</th>
                            <th className="border border-slate-600 text-white">Valor</th>
                            <th className="border border-slate-600 text-white">Duração</th>
                            <th className="border border-slate-600 text-white">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="border-b-2 text-center odd:bg-slate-300 even:bg-slate-100 hover:bg-slate-600 hover:text-white hover:cursor-pointer">
                            <td>1</td>
                            <td className="p-3">Plano Mensal</td>
                            <td>Acesso completo à academia por 30 dias</td>
                            <td>R$ 99,90</td>
                            <td>30 dias</td>
                            <td>
                                <a className="inline-block bg-sky-600 p-2 m-2 w-1/5 rounded-md text-sm text-white text-center">
                                    Detalhes
                                </a>
                                <a className="inline-block bg-emerald-700 p-2 m-2 w-1/5 rounded-md text-sm text-white">
                                    Atualizar
                                </a>
                                <a className="inline-block bg-red-600 p-2 m-2 w-1/5 rounded-md text-sm text-white">
                                    Deletar
                                </a>
                            </td>
                        </tr>

                        <tr className="border-b-2 text-center odd:bg-slate-300 even:bg-slate-100 hover:bg-slate-600 hover:text-white hover:cursor-pointer">
                            <td>2</td>
                            <td>Plano Trimestral</td>
                            <td>Acesso completo com desconto</td>
                            <td>R$ 269,90</td>
                            <td>90 dias</td>
                            <td>
                                <a className="inline-block bg-sky-600 p-2 m-2 w-1/5 rounded-md text-sm text-white text-center">
                                    Detalhes
                                </a>
                                <a className="inline-block bg-emerald-700 p-2 m-2 w-1/5 rounded-md text-sm text-white">
                                    Atualizar
                                </a>
                                <a className="inline-block bg-red-600 p-2 m-2 w-1/5 rounded-md text-sm text-white">
                                    Deletar
                                </a>
                            </td>
                        </tr>

                        <tr className="border-b-2 text-center odd:bg-slate-300 even:bg-slate-100 hover:bg-slate-600 hover:text-white hover:cursor-pointer">
                            <td>3</td>
                            <td>Plano Anual</td>
                            <td>Melhor custo-benefício com acesso ilimitado</td>
                            <td>R$ 899,90</td>
                            <td>365 dias</td>
                            <td>
                                <a className="inline-block bg-sky-600 p-2 m-2 w-1/5 rounded-md text-sm text-white text-center">
                                    Detalhes
                                </a>
                                <a className="inline-block bg-emerald-700 p-2 m-2 w-1/5 rounded-md text-sm text-white">
                                    Atualizar
                                </a>
                                <a className="inline-block bg-red-600 p-2 m-2 w-1/5 rounded-md text-sm text-white">
                                    Deletar
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default ListagemPlanos;
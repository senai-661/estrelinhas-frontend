import { type JSX, useState, useEffect } from "react";
import PlanoRequests from "../../fetch/PlanoRequests";
import AuthRequests from "../../fetch/AuthRequests";
import { useNavigate } from "react-router-dom";

function ListagemPlanos(): JSX.Element {
    const [planos, setPlanos] = useState<any[]>([]);
    const [pagina, setPagina] = useState(1);
    const itensPorPagina = 6;
    const navigate = useNavigate();

    useEffect(() => {
        const buscarPlanos = async () => {
            try {
                const token = localStorage.getItem("token");
                const isAuth = localStorage.getItem("isAuth");
                if (!token || !isAuth || !AuthRequests.checkTokenExpiry()) {
                    navigate("/login");
                    return;
                }
                const listaDePlanos = await PlanoRequests.obterListaDePlanos();
                setPlanos(Array.isArray(listaDePlanos) ? listaDePlanos : []);
            } catch (error) {
                console.error("Erro ao buscar planos:", error);
                alert(`Erro ao carregar planos: ${error}`);
                setPlanos([]);
            }
        };
        buscarPlanos();
    }, [navigate]);

    const totalPaginas = Math.ceil(planos.length / itensPorPagina);
    const planosPagina = planos.slice(
        (pagina - 1) * itensPorPagina,
        pagina * itensPorPagina
    );

    return (
        <main className="page-main">

            <div className="page-actions" style={{ justifyContent: "space-between" }}>
                <h1 className="page-title">PLANOS</h1>
                <button className="btn-primary">+ Novo Plano</button>
            </div>

            <div className="table-wrapper">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Cód. Plano</th>
                            <th>Tipo</th>
                            <th>Valor</th>
                            <th>Status</th>
                            <th className="center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {planosPagina.length > 0 ? (
                            planosPagina.map((plano, index) => {
                                const planoId =
                                    plano.id_plano ?? plano.idPlano ?? plano.id ??
                                    plano.cod_plano ?? plano.codPlano ?? plano.codigo;
                                return (
                                    <tr key={planoId ?? index}>
                                        <td>{plano.codPlano}</td>
                                        <td>{plano.tipoPlano}</td>
                                        <td className="bold">
                                            R$ {Number(plano.valor).toFixed(2)}
                                        </td>
                                        <td>
                                            <span className={`badge ${plano.statusPlano === "ATIVO" ? "badge-active" : "badge-inactive"}`}>
                                                {plano.statusPlano}
                                            </span>
                                        </td>
                                        <td className="center">
                                            <div className="action-group">
                                                <button
                                                    className="btn-details"
                                                    onClick={() => {
                                                        if (!planoId) {
                                                            alert("ID do plano não encontrado.");
                                                            return;
                                                        }
                                                        navigate(`/detalhes/plano/${planoId}`);
                                                    }}
                                                >
                                                    Detalhes
                                                </button>
                                                <button className="btn-update">Atualizar</button>
                                                <button className="btn-delete">Deletar</button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={5} className="table-empty">
                                    Nenhum plano encontrado
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="pagination-wrapper-end">
                <button
                    className="page-btn"
                    onClick={() => setPagina((p) => Math.max(1, p - 1))}
                    disabled={pagina === 1}
                >
                    {"<"}
                </button>

                {Array.from({ length: totalPaginas }, (_, i) => (
                    <button
                        key={i + 1}
                        className={`page-btn ${pagina === i + 1 ? "active" : ""}`}
                        onClick={() => setPagina(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    className="page-btn"
                    onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
                    disabled={pagina === totalPaginas || totalPaginas === 0}
                >
                    {">"}
                </button>
            </div>

        </main>
    );
}

export default ListagemPlanos;
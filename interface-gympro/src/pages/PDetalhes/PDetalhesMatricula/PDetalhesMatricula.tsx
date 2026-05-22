import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import DetalhesMatricula from "../../../components/Listagens/DetalhesMatricula/DetalhesMatricula";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams, useNavigate } from "react-router-dom";

function PDetalhesMatricula(): JSX.Element {
    const { id_matricula } = useParams();
    const navigate = useNavigate();

    const idNumerico = Number(id_matricula);

    if (!id_matricula || isNaN(idNumerico) || idNumerico <= 0) {
        return (
            <>
                <Navegacao />
                <main className="page-main">
                    <div className="page-empty-state">
                        <p>ID de matrícula inválido na URL.</p>
                        <button className="btn btn-outline" onClick={() => navigate('/lista/matriculas')}>Voltar</button>
                    </div>
                </main>
                <Rodape />
            </>
        );
    }

    return (
        <>
            <Navegacao />
            <main className="page-main">
                <DetalhesMatricula id_matricula={idNumerico} />
            </main>
            <Rodape />
        </>
    );
}

export default PDetalhesMatricula;

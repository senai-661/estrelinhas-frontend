import { type JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import DetalhesMatricula from "../../components/Listagens/DetalhesMatricula/DetalhesMatricula";
import Rodape from "../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";

function PDetalhesMatricula(): JSX.Element {
    const { idMatricula } = useParams();

    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <DetalhesMatricula idMatricula={Number(idMatricula)} />
            <Rodape />
        </div>
    );
}

export default PDetalhesMatricula;


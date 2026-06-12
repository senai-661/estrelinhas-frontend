import { type JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import DetalhesPlano from "../../components/Listagens/DetalhesPlanos/DetalhesPlanos";
import Rodape from "../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";

function PDetalhesPlano(): JSX.Element {
    const { id_plano } = useParams();

    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <DetalhesPlano cod_plano={id_plano ?? ""} />
            <Rodape />
        </div>
    );
}

export default PDetalhesPlano;


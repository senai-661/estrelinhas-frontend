import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import DetalhesPlano from "../../../components/Listagens/DetalhesPlano/DetalhesPlano";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";

function PDetalhesPlano(): JSX.Element {
    const { id_plano } = useParams<{ id_plano: string }>();
    return (
        <>
            <Navegacao />
            <main>
                <DetalhesPlano id_plano={id_plano ?? ""} />
            </main>
            <Rodape />
        </>
    );
}

export default PDetalhesPlano;
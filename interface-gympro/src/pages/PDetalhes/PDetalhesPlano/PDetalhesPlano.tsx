import { type JSX } from "react";
<<<<<<< HEAD
import Navegacao from "../../../components/Navegacao/Navegacao";
import DetalhesPlano from "../../../components/Listagens/DetalhesPlano/DetalhesPlano";
=======
import DetalhesPlano from "../../../components/Listagens/DetalhesPlanos/DetalhesPlanos";
>>>>>>> origin/lais-zanqueta
import Rodape from "../../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";

function PDetalhesPlano(): JSX.Element {
<<<<<<< HEAD
    const { id_plano } = useParams<{ id_plano: string }>();
    return (
        <>
            <Navegacao />
            <main>
                <DetalhesPlano id_plano={id_plano ?? ""} />
            </main>
            <Rodape />
        </>
=======
    const { id_plano } = useParams();

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <DetalhesPlano cod_plano={id_plano as string} />
            <Rodape />
        </div>
>>>>>>> origin/lais-zanqueta
    );
}

export default PDetalhesPlano;
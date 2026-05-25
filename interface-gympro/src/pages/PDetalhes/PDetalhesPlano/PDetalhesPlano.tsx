import { type JSX } from "react";
import DetalhesPlano from "../../../components/Listagens/DetalhesPlanos/DetalhesPlanos";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";

/**
 * Página de detalhes de um plano da academia GymPro.
 * Somente acessível por usuários autenticados (proteger via PrivateRoute no router).
 */
function PDetalhesPlano(): JSX.Element {
    const { cod_plano } = useParams(); // Recebe o código do plano pela URL

    return (
        <div className="min-h-screen flex flex-col">
      
            <DetalhesPlano cod_plano={cod_plano as string} /> {/* Envia o código para o componente */}
            <Rodape />
        </div>
    );
}

export default PDetalhesPlano;
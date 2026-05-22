import { type JSX } from "react";

import DetalhesMatricula from "../../../components/Listagens/DetalhesMatricula/DetalhesMatricula";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";

/**
 * Página de detalhes de uma matrícula da academia GymPro.
 * Somente acessível por usuários autenticados (proteger via PrivateRoute no router).
 */
function PDetalhesMatricula(): JSX.Element {
    const { id_matricula } = useParams(); // Recebe o código da matrícula pela URL

    return (
        <div className="min-h-screen flex flex-col">
        
            <DetalhesMatricula cod_matricula={id_matricula as string} /> {/* Envia o código para o componente */}
            <Rodape />
        </div>
    );
}

export default PDetalhesMatricula;
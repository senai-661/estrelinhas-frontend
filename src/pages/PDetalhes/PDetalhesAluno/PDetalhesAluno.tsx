import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import DetalhesAluno from "../../../components/Listagens/DetalhesAluno/DetalhesAluno";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";

function PDetalhesAluno(): JSX.Element {
    const { id_aluno } = useParams();  // Recebe o ID do registro acessado

    return (
        <>
            <Navegacao />

            <main>
                <DetalhesAluno id_aluno={Number(id_aluno)} />  {/* Envia o ID para o componente */}
            </main>

            <Rodape />
        </>
    );
}

export default PDetalhesAluno;
import { type JSX } from "react";
import Navegacao from "../../components/Navegacao/Navegacao";
import DetalhesAluno from "../../components/Listagens/DetalhesAlunos/DetalhesAlunos";
import Rodape from "../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";

function PDetalhesAluno(): JSX.Element {
    const { id_aluno } = useParams();  

    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <DetalhesAluno id_aluno={Number(id_aluno)} />  {/* Envia o ID para o componente */}
            <Rodape />
        </div>
    );
}

export default PDetalhesAluno;
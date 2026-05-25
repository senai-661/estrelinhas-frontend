import { type JSX } from "react";

import DetalhesAluno from "../../../components/Listagens/DetalhesAlunos/DetalhesAlunos";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";

function PDetalhesAluno(): JSX.Element {

   const { id_aluno} = useParams();

    return (
        <div className="min-h-screen flex flex-col">

            <DetalhesAluno id_aluno={Number(id_aluno)} />

            <Rodape />
        </div>
    );
}

export default PDetalhesAluno;
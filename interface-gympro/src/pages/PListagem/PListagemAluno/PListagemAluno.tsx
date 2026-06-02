import { type JSX } from "react";
import ListagemAlunos from "../../../components/Listagens/ListagemAluno/ListagemAluno";
import Rodape from "../../../components/Rodape/Rodape";
import Navegacao from "../../../components/Navegacao/Navegacao";

function PListagemAluno(): JSX.Element {
    return (
        <>
            <Navegacao />
            <ListagemAlunos />
            <Rodape />
        </>
    );
}

export default PListagemAluno;
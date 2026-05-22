import { type JSX } from "react";
import ListagemAluno from "../../../components/Listagens/ListagemAluno/ListagemAluno";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";


function PListagemAluno(): JSX.Element {
    return (
        <div className="h-full">
             <Navegacao />
            <ListagemAluno />
            <Rodape />
        </div>
    );
}

export default PListagemAluno;
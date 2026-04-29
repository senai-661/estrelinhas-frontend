import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import ListagemMatricula from "../../../components/Listagens/ListagemMatricula/ListagemMatricula";
import Rodape from "../../../components/Rodape/Rodape";

function PListagemMatricula(): JSX.Element {
    return (
        <>
            <Navegacao />
            <ListagemMatricula />
            <Rodape />
        </>
    );
}

export default PListagemMatricula;
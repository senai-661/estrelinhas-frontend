import { type JSX } from "react";
import ListagemPlano from "../../../components/Listagens/ListagemPlano/ListagemPlano";
import Rodape from "../../../components/Rodape/Rodape";
import Navegacao from "../../../components/Navegacao/Navegacao";

function PListagemPlano(): JSX.Element {
    return (
        <>

            <Navegacao />
            <ListagemPlano />
            <Rodape />
        </>
    );
}

export default PListagemPlano;
import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import ListagemPlanos from "../../../components/Listagens/ListagemPlano/ListagemPlano";
import Rodape from "../../../components/Rodape/Rodape";

function PListagemPlano(): JSX.Element {
    return (
        <>
            <Navegacao />
            <ListagemPlanos />
            <Rodape />
        </>
    );
}

export default PListagemPlano;
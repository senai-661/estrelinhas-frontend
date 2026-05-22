import { type JSX } from "react";

import Navegacao from "../../../components/Navegacao/Navegacao";
import ListagemPlano from "../../../components/Listagens/ListagemPlano/ListagemPlano";
import Rodape from "../../../components/Rodape/Rodape";

function PListagemPlano(): JSX.Element {
    return (
        <>
            <Navegacao />

            <main className="page-main">
                <ListagemPlano />
            </main>

            <Rodape />
        </>
    );
}

export default PListagemPlano;

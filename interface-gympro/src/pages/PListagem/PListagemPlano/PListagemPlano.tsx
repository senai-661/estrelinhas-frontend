import { type JSX } from "react";

import ListagemPlano from "../../../components/Listagens/ListagemPlano/ListagemPlano";
import Rodape from "../../../components/Rodape/Rodape";

function PListagemPlano(): JSX.Element {
    return (
        <>

            <main>
                <ListagemPlano />
            </main>

            <Rodape />
        </>
    );
}

export default PListagemPlano;
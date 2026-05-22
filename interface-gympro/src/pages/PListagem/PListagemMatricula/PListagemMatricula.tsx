import { type JSX } from "react";

import Navegacao from "../../../components/Navegacao/Navegacao";
import ListagemMatricula from "../../../components/Listagens/ListagemMatricula/ListagemMatricula";
import Rodape from "../../../components/Rodape/Rodape";

function PListagemMatricula(): JSX.Element {
    return (
        <>
            <Navegacao />

            <main className="page-main">
                <ListagemMatricula />
            </main>

            <Rodape />
        </>
    );
}

export default PListagemMatricula;

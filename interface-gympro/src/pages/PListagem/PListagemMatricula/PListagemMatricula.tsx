import { type JSX } from "react";


import ListagemMatricula from "../../../components/Listagens/ListagemMatricula/ListagemMatricula";
import Rodape from "../../../components/Rodape/Rodape";

function PListagemMatricula(): JSX.Element {
    return (
        <>

            <main>
                <ListagemMatricula />
            </main>

            <Rodape />
        </>
    );
}

export default PListagemMatricula;
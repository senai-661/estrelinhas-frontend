import { type JSX } from "react";

import Navegacao from "../../../components/Navegacao/Navegacao";
import ListagemAlunos from "../../../components/Listagens/ListagemAlunos/ListagemAlunos";
import Rodape from "../../../components/Rodape/Rodape";

function PListagemAluno(): JSX.Element {
    return (
        <>
            <Navegacao />

            <main>
                <ListagemAlunos />
            </main>

            <Rodape />
        </>
    );
}

export default PListagemAluno;
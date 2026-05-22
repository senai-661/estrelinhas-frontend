import { type JSX } from "react";

import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";
import ListagemAlunos from "../../../components/Listagens/ListagemAlunos/ListagemAlunos";

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
import { type JSX } from "react";


import ListagemAlunos from "../../../components/Listagens/ListagemAluno/ListagemAluno";
import Rodape from "../../../components/Rodape/Rodape";

function PListagemAluno(): JSX.Element {
    return (
        <>
    
            <main>
                <ListagemAlunos />
            </main>

            <Rodape />
        </>
    );
}

export default PListagemAluno;
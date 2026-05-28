import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import DetalhesMatricula from "../../../components/Listagens/DetalhesMatricula/DetalhesMatricula";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams, useNavigate } from "react-router-dom";

function PDetalhesMatricula(): JSX.Element {
    const { id_matricula } = useParams();
    const navigate = useNavigate();

    const idNumerico = Number(id_matricula);

    // Se vier undefined ou NaN, mostra erro antes de renderizar o componente filho
    if (!id_matricula || isNaN(idNumerico) || idNumerico <= 0) {
        return (
            <>
                <Navegacao />
                <main style={{ padding: '40px' }}>
                    <p>ID de matrícula inválido na URL.</p>
                    <button onClick={() => navigate('/lista/matriculas')}>Voltar</button>
                </main>
                <Rodape />
            </>
        );
    }

    return (
        <>
            <Navegacao />
            <main>
                <DetalhesMatricula id_matricula={idNumerico} />
            </main>
            <Rodape />
        </>
    );
}

export default PDetalhesMatricula;
import type { JSX } from "react";
import BoasVindas from "../../components/BoasVindas/BoasVindas";
import Rodape from "../../components/Rodape/Rodape";
import Navegacao from "../../components/Navegacao/Navegacao";
 
function PHome(): JSX.Element {
    return (
        <>
            <Navegacao />
            <BoasVindas />
            <Rodape />
        </>
    );
}

export default PHome;
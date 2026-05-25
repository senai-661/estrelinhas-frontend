import type { JSX } from "react";
import BoasVindas from "../../components/BoasVindas/BoasVindas";
import Rodape from "../../components/Rodape/Rodape";
 
function PHome(): JSX.Element {
    return (
        <>
            <BoasVindas />
            <Rodape />
        </>
    );
}

export default PHome;
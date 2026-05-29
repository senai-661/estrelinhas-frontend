import type { JSX } from "react";
<<<<<<< HEAD

import BoasVindas from "../../components/BoasVindas/BoasVindas";
import Navegacao from "../../components/Navegacao/Navegacao";
import Rodape from "../../components/Rodape/Rodape";

function PHome(): JSX.Element {
    return (
        <>
            <Navegacao />

            
            <BoasVindas />

=======
import BoasVindas from "../../components/BoasVindas/BoasVindas";
import Rodape from "../../components/Rodape/Rodape";
 
function PHome(): JSX.Element {
    return (
        <>
            <BoasVindas />
>>>>>>> origin/lais-zanqueta
            <Rodape />
        </>
    );
}

export default PHome;
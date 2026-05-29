import { type JSX } from "react";
<<<<<<< HEAD

// Componentes
import Navegacao from "../../components/Navegacao/Navegacao";
import LoginForm from "../../components/FormLogin/FormLogin";

// Página de login
function PLogin(): JSX.Element {
    return (
        <>
            <Navegacao />

            <main className="page-login">
                <LoginForm />
            </main>
        </>
=======
import LoginForm from "../../components/FormLogin/FormLogin";
import Rodape from "../../components/Rodape/Rodape";

function PLogin(): JSX.Element {
    return (
        <main className="pagina-grid">
            <LoginForm />
            <Rodape />
        </main>
>>>>>>> origin/lais-zanqueta
    );
}

export default PLogin;
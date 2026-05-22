import { type JSX } from "react";

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
    );
}

export default PLogin;
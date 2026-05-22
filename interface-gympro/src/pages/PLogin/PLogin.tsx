import { type JSX } from "react";

// Componentes
import Navegacao from "../../components/Navegacao/Navegacao";
import LoginForm from "../../components/FormLogin/FormLogin";

// Página de login
function PLogin(): JSX.Element {
    return (
        <>
            <Navegacao />

            <main className="pagina-grid">
                <LoginForm />
            </main>
        </>
    );
}

export default PLogin;
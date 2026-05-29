import { type JSX } from "react";
import LoginForm from "../../components/FormLogin/FormLogin";
import Rodape from "../../components/Rodape/Rodape";

function PLogin(): JSX.Element {
    return (
        <main className="pagina-grid">
            <LoginForm />
            <Rodape />
        </main>
    );
}

export default PLogin;
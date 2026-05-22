import { type JSX } from "react";
import LoginForm from "../../components/FormLogin/FormLogin";

function PLogin(): JSX.Element {
    return (
        <main className="pagina-grid">
            <LoginForm />
        </main>
    );
}

export default PLogin;
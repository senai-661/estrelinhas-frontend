import { type JSX } from "react";
import LoginForm from "../../components/FormLogin/FormLogin";

function PLogin(): JSX.Element {
    return (
        <div className="h-full">
            <div className="pagina-grid">
                <LoginForm />
            </div>
        </div>
    );
}

export default PLogin;
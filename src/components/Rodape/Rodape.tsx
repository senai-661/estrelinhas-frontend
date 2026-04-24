import type { JSX } from "react";

function Rodape(): JSX.Element {
    return (
        <footer className="bg-slate-700 h-[12vh] flex items-center justify-around">
            <p className="text-white text-xl">GymPro © 2026 - Todos os direitos reservados</p>
            <p className="text-white text-xl">[ Isabelle Santos ]</p>
        </footer>
    );
}

export default Rodape;
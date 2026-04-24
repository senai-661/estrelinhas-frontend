import type { JSX } from "react";

function Rodape(): JSX.Element {
    return (
        <footer className="bg-black h-[12vh] flex items-center justify-between px-12 border-t-4 border-orange-500">
            <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-orange-500 rounded-full"></div>
                <p className="text-white text-lg font-light">GymPro © 2026 - Todos os direitos reservados</p>
            </div>
            <p className="text-orange-400 text-lg font-semibold">[ Isabelle Santos ]</p>
        </footer>
    );
}

export default Rodape;
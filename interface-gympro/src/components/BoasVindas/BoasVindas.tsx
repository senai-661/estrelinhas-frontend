import { type JSX } from "react";
import { useNavigate } from "react-router-dom";

function BoasVindas(): JSX.Element {
    const navigate = useNavigate();

    return (
        <main className="hero-section">
            <section className="hero-card">
                <h1 className="hero-title">
                    TRANSFORME SEU <span className="hero-highlight">CORPO</span> E <span className="hero-highlight">MENTE</span>
                </h1>
                <p className="hero-copy">
                    A melhor academia da cidade está esperando por você. Equipamentos de última geração, professores qualificados e um ambiente motivador para você alcançar resultados reais.
                </p>
                <button type="button" className="hero-cta" onClick={() => navigate('/login')}>
                    Comece agora
                </button>
            </section>
        </main>
    );
}

export default BoasVindas;                                                                                                                                                                                                                                                              
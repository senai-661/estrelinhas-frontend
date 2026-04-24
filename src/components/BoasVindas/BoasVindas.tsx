import { type JSX } from "react";

function BoasVindas(): JSX.Element {
    return (
        <main className="home-hero">
            <div className="home-content">
                <h1 className="home-title">
                    <span className="home-title-text">Gym</span> Pro
                </h1>

                <p className="home-description">
                    Bem-vindo à nossa academia! Estamos aqui para ajudar você a alcançar seus objetivos fitness e bem-estar.
                    Nossa equipe de profissionais oferece suporte e motivação em cada etapa da sua jornada.
                </p>

                <div className="feature-grid">
                    <article className="feature-card">
                        <div className="feature-card-icon"></div>
                        <h3>Equipamentos</h3>
                        <p>Academia moderna com aparelhos de alta performance.</p>
                    </article>
                    <article className="feature-card">
                        <div className="feature-card-icon"></div>
                        <h3>Profissionais</h3>
                        <p>Instrutores experientes para treinos mais seguros e eficientes.</p>
                    </article>
                    <article className="feature-card">
                        <div className="feature-card-icon"></div>
                        <h3>Resultados</h3>
                        <p>Planos criados para transformar seu objetivo em conquista.</p>
                    </article>
                </div>

                <p className="home-note">
                    Descubra um ambiente acolhedor e completo, com aulas variadas e um atendimento focado em você.
                    <span> Vamos juntos transformar seus objetivos em realidade!</span>
                </p>
            </div>
        </main>
    );
}

export default BoasVindas;
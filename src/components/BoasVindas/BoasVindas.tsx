import { type JSX } from "react";

function BoasVindas(): JSX.Element {
    return (
        <main className="bg-gray-200 h-[76vh]">
            <h1 className="text-[3rem] pt-20" style={{ textAlign: 'center' }}>Gym Pro</h1>

            <p className="text-[1.2rem] mt-10" style={{ textAlign: 'center' }}>
                Seja bem-vindo a nossa academia! Estamos aqui para ajudar você a alcançar seus objetivos fitness e bem-estar. 
                Nossa equipe de profissionais está pronta para oferecer suporte, orientação e motivação em cada etapa da sua jornada. 
                Junte-se a nós e descubra um ambiente acolhedor, equipamentos de última geração 
                e uma variedade de aulas para atender às suas necessidades. Vamos juntos transformar seus sonhos em realidade!
            </p>
        </main>
    );
}

export default BoasVindas;
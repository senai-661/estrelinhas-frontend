import { type JSX } from "react";

function BoasVindas(): JSX.Element {
    return (
        <main className="bg-gradient-to-b from-white via-orange-50 to-white h-[76vh] flex flex-col justify-center items-center px-6">
            <div className="max-w-4xl text-center">
                <h1 className="text-6xl font-bold text-black mb-6" style={{ letterSpacing: '-0.02em' }}>
                    <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Gym</span>
                    <span className="text-black"> Pro</span>
                </h1>

                <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mx-auto mb-8"></div>

                <p className="text-lg text-gray-700 leading-relaxed font-light">
                    Bem-vindo a nossa academia! Estamos aqui para ajudar você a alcançar seus objetivos fitness e bem-estar.
                </p>

                <div className="grid grid-cols-3 gap-6 mt-12 py-8">
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-4xl mb-3">💪</div>
                        <h3 className="text-black font-semibold mb-2">Equipamentos</h3>
                        <p className="text-sm text-gray-600">Última geração</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-4xl mb-3">👨‍🏫</div>
                        <h3 className="text-black font-semibold mb-2">Profissionais</h3>
                        <p className="text-sm text-gray-600">Suporte e motivação</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-4xl mb-3">🎯</div>
                        <h3 className="text-black font-semibold mb-2">Resultados</h3>
                        <p className="text-sm text-gray-600">Sonhos em realidade</p>
                    </div>
                </div>

                <p className="text-gray-600 mt-12 text-base leading-relaxed">
                    Nossa equipe está pronta para oferecer suporte, orientação e motivação em cada etapa da sua jornada. 
                    Descubra um ambiente acolhedor e uma variedade de aulas para atender às suas necessidades. 
                    <span className="block mt-4 font-semibold text-orange-600">Vamos juntos transformar seus objetivos em realidade!</span>
                </p>
            </div>
        </main>
    );
}

export default BoasVindas;
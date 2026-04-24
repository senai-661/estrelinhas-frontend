import { type JSX } from "react";

function BoasVindas(): JSX.Element {
    return (
        <main className="bg-gray-200  h-[76vh]">
            <h1 className="text-[3rem] pt-20" style={{ textAlign: 'center' }}>GymPro</h1>

            <p className="text-[1.2rem] mt-10" style={{ textAlign: 'center' }}>
                A GymPro é uma academia focada no seu desempenho e bem-estar. 
                Aqui você encontra treinos personalizados, acompanhamento profissional e uma estrutura pensada para te ajudar 
                a alcançar seus objetivos de forma prática e eficiente.
                Seja para ganhar massa, emagrecer ou melhorar sua saúde, a GymPro está com você em cada etapa.
            </p>
        </main>
    );
}

export default BoasVindas;
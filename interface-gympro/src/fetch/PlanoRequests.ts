import type { PlanoDTO } from "../dto/PlanoDTO";

const BASE_URL = "http://localhost:3333";
const ENDPOINT = "/api/planos";

const PlanoRequests = {
    obterListaDePlanos: async (): Promise<PlanoDTO[]> => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}${ENDPOINT}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": `${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar planos: ${response.statusText}`);
        }

        return response.json();
    },

   obterPlanoPorId: async (cod_plano: string): Promise<any | null> => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}${ENDPOINT}/${cod_plano}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": `${token}`,
        },
    });

    if (response.status === 404) return null;

    if (!response.ok) {
        throw new Error(`Erro ao buscar plano: ${response.statusText}`);
    }

    return response.json();
},
};

export default PlanoRequests;
import type { MatriculaDTO } from "../dto/MatriculaDTO";

const BASE_URL = "http://localhost:3333";
const ENDPOINT = "/api/matriculas";

const MatriculaRequests = {
    obterListaDeMatriculas: async (): Promise<MatriculaDTO[]> => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}${ENDPOINT}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": `${token}`,  
            },
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar matrículas: ${response.statusText}`);
        }

        return response.json();
    },

    obterMatriculaPorCodigo: async (cod_matricula: string): Promise<MatriculaDTO | null> => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}${ENDPOINT}/${cod_matricula}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": `${token}`, 
            },
        });

        if (response.status === 404) return null;

        if (!response.ok) {
            throw new Error(`Erro ao buscar matrícula: ${response.statusText}`);
        }

        return response.json();
    },
};

export default MatriculaRequests;
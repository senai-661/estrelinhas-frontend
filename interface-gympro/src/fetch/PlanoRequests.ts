import type { PlanoDTO } from "../dto/PlanoDTO";

class PlanoRequests {
    private serverURL;
    private endpointPlano;

    constructor() {
        this.serverURL = `http://localhost:3333`;
        this.endpointPlano = `/api/planos`;
    }

    async obterListaDePlanos(): Promise<PlanoDTO[]> {
        const token = localStorage.getItem('token');
        const respostaAPI = await fetch(`${this.serverURL}${this.endpointPlano}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `${token}`
            }
        });

        if (!respostaAPI.ok) throw new Error(`Erro ao buscar planos: ${respostaAPI.statusText}`);

        return respostaAPI.json();
    }

    async obterPlanoPorId(cod_plano: string): Promise<PlanoDTO | null> {
        const token = localStorage.getItem('token');
        const respostaAPI = await fetch(`${this.serverURL}${this.endpointPlano}/${cod_plano}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `${token}`
            }
        });

        if (respostaAPI.status === 404) return null;
        if (!respostaAPI.ok) throw new Error(`Erro ao buscar plano: ${respostaAPI.statusText}`);

        return respostaAPI.json();
    }

    async enviarFormularioPlano(formPlano: PlanoDTO): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointPlano}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(formPlano)
            });

            if (!respostaAPI.ok) throw new Error(`Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);

            console.info(`${respostaAPI.status}: ${respostaAPI.statusText}`);
            return true;
        } catch (error) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            return false;
        }
    }
}

export default new PlanoRequests;
import PlanoDTO from "../dto/PlanoDTO";

class PlanoRequests {
    private serverURL;
    private endpointPlano;

    constructor() {
        this.serverURL = `http://localhost:3333`;
        this.endpointPlano = `/api/planos`;
    }

    async obterListaDePlanos(): Promise<PlanoDTO[] | undefined> {
        try {
            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(`${this.serverURL}${this.endpointPlano}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const listaDePlanos: PlanoDTO[] = await respostaAPI.json();
                return listaDePlanos;
            } else {
                throw new Error("Não foi possível listar os planos.");
            }
        } catch (error) {
            console.error(`Erro ao buscar planos. ${error}`);
            return;
        }
    }
}

export default new PlanoRequests();
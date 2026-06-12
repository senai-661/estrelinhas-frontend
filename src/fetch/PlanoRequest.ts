class PlanoRequests {
    private serverURL: string;
    private endpointPlano: string;

    constructor() {
        this.serverURL = "http://localhost:3333";
        this.endpointPlano = "/api/planos";
    }

    async obterListaDePlanos() {
        try {
            const token = localStorage.getItem("token");
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointPlano}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": `${token}`
                }
            });
            if (respostaAPI.ok) {
                return await respostaAPI.json();
            } else {
                throw new Error("Não foi possível listar os planos.");
            }
        } catch (error) {
            console.error("Erro ao buscar planos:", error);
            return [];
        }
    }

    async obterPlanoPorId(idPlano: number) {
        try {
            const token = localStorage.getItem("token");
            console.log("URL chamada:", `${this.serverURL}${this.endpointPlano}/${idPlano}`);
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointPlano}/${idPlano}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": `${token}`
                }
            });
            if (respostaAPI.ok) {
                return await respostaAPI.json();
            } else {
                throw new Error("Plano não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao buscar plano:", error);
            throw error;
        }
    }
}

export default new PlanoRequests();
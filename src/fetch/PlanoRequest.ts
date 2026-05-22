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
}

export default new PlanoRequests(); 
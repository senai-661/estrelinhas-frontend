import MatriculaDTO from "../dto/MatriculaDTO";

class MatriculaRequests {
    private serverURL;
    private endpointMatricula;

    constructor() {
        this.serverURL = `http://localhost:3333`;
        this.endpointMatricula = `/api/matriculas`;
    }

    async obterListaDeMatriculas(): Promise<MatriculaDTO[] | undefined> {
        try {
            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(`${this.serverURL}${this.endpointMatricula}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const listaDeMatriculas: MatriculaDTO[] = await respostaAPI.json();
                return listaDeMatriculas;
            } else {
                throw new Error("Não foi possível listar as matrículas.");
            }
        } catch (error) {
            console.error(`Erro ao buscar matrículas. ${error}`);
            return;
        }
    }
}

export default new MatriculaRequests();
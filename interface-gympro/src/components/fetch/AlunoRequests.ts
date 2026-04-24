import AlunoDTO from "../dto/AlunoDTO";

class AlunoRequests {
    private serverURL: string;
    private endpointAluno: string;

    constructor() {
        this.serverURL = 'http://localhost:3333';
        this.endpointAluno = '/api/alunos';
    }


    async obterListaDeAlunos(): Promise<AlunoDTO[] | undefined> {
        try {
            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(`${this.serverURL}${this.endpointAluno}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const lista: AlunoDTO[] = await respostaAPI.json();
                return lista;
            } else {
                throw new Error("Não foi possível listar os alunos.");
            }
        } catch (error) {
            console.error(`Erro ao buscar alunos: ${error}`);
        }
    }


    async cadastrarAluno(aluno: AlunoDTO): Promise<AlunoDTO | undefined> {
        try {
            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(`${this.serverURL}${this.endpointAluno}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(aluno)
            });

            if (respostaAPI.ok) {
                const novoAluno: AlunoDTO = await respostaAPI.json();
                return novoAluno;
            } else {
                throw new Error("Erro ao cadastrar aluno.");
            }
        } catch (error) {
            console.error(`Erro ao cadastrar aluno: ${error}`);
        }
    }
}

export default AlunoRequests;
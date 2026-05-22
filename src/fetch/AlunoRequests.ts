import type AlunoDTO from "../dto/AlunoDTO";

// Normaliza o objeto retornado pela API para garantir que os campos batem com o DTO
// Caso a API retorne "id" em vez de "id_aluno", por exemplo, isso corrige automaticamente
function normalizarAluno(raw: any): AlunoDTO {
    return {
        id_aluno:        raw.idAluno         ?? raw.id_aluno    ?? raw.id          ?? undefined,
        cod_aluno:       raw.codAluno        ?? raw.cod_aluno   ?? raw.ra          ?? undefined,
        nome:            raw.nome            ?? "",
        sobrenome:       raw.sobrenome       ?? "",
        cpf:             raw.cpf             ?? "",
        data_nascimento: raw.dataNascimento  ?? raw.data_nascimento ?? new Date(),
        endereco:        raw.endereco        ?? "",
        email:           raw.email           ?? "",
        celular:         raw.celular         ?? raw.telefone    ?? undefined,
        senha:           raw.senha           ?? undefined,
        status_aluno:    raw.statusAluno     ?? raw.status_aluno ?? raw.status ?? undefined,
    };
}

class AlunoRequests {
    private serverURL: string;
    private endpointAluno: string;

    constructor() {
        this.serverURL    = `http://localhost:3333`;
        this.endpointAluno = `/api/alunos`;
    }

    async obterListaDeAlunos(): Promise<AlunoDTO[]> {
        try {
            const token = localStorage.getItem("token");

            const respostaAPI = await fetch(`${this.serverURL}${this.endpointAluno}`, {
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": `${token}`,
                },
            });

            if (respostaAPI.ok) {
                const raw = await respostaAPI.json();

                // A API pode retornar o array direto ou dentro de uma chave (ex: { alunos: [] })
                const lista = Array.isArray(raw)
                    ? raw
                    : raw.alunos ?? raw.data ?? raw.resultado ?? [];

                // Log para debug — remova após confirmar que está funcionando
                if (lista.length > 0) {
                    console.log("🔍 Exemplo de aluno retornado pela API:", lista[0]);
                }

                return lista.map(normalizarAluno);
            } else {
                throw new Error("Não foi possível listar os alunos.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de alunos. ${error}`);
            return [];
        }
    }

    async obterAlunoPorId(id_aluno: number): Promise<AlunoDTO | undefined> {
        try {
            const token = localStorage.getItem("token");

            const respostaAPI = await fetch(
                `${this.serverURL}${this.endpointAluno}/${id_aluno}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": `${token}`,
                    },
                }
            );

            if (respostaAPI.ok) {
                const raw = await respostaAPI.json();

                // Log para debug — remova após confirmar que está funcionando
                console.log("🔍 Aluno por ID retornado pela API:", raw);

                return normalizarAluno(raw);
            } else {
                throw new Error("Não foi possível buscar o aluno.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de aluno por ID. ${error}`);
            return undefined;
        }
    }
}

export default new AlunoRequests();
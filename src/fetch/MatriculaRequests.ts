import type MatriculaDTO from "../dto/MatriculaDTO";

function normalizarAluno(raw: any) {
    return {
        id_aluno: raw.id_aluno ?? raw.idAluno ?? raw.id ?? undefined,
        cod_aluno: raw.cod_aluno ?? raw.codAluno ?? raw.ra ?? undefined,
        nome: raw.nome ?? raw.firstName ?? raw.first_name ?? raw.nome_aluno ?? raw.first_name ?? "",
        sobrenome: raw.sobrenome ?? raw.lastName ?? raw.last_name ?? raw.sobrenome_aluno ?? "",
        cpf: raw.cpf ?? "",
        data_nascimento: raw.data_nascimento ?? raw.dataNascimento ?? new Date(),
        endereco: raw.endereco ?? "",
        email: raw.email ?? "",
        celular: raw.celular ?? raw.telefone ?? undefined,
        senha: raw.senha ?? undefined,
        status_aluno: raw.status_aluno ?? raw.statusAluno ?? raw.status ?? undefined,
    };
}

function normalizarPlano(raw: any) {
    return {
        id_plano: raw.id_plano ?? raw.idPlano ?? raw.id ?? undefined,
        cod_plano: raw.cod_plano ?? raw.codPlano ?? raw.codigo ?? undefined,
        tipo_plano: raw.tipo_plano ?? raw.tipoPlano ?? raw.tipo ?? undefined,
        duracao_dias: raw.duracao_dias ?? raw.duracaoDias ?? raw.duracao ?? undefined,
        valor: raw.valor ?? raw.preco ?? raw.valor_plano ?? undefined,
        descricao: raw.descricao ?? raw.description ?? "",
        status_plano: raw.status_plano ?? raw.statusPlano ?? raw.status ?? undefined,
    };
}

function normalizarMatricula(raw: any): MatriculaDTO {
    const alunoRaw = raw.aluno ?? raw.student ?? raw.alunoMatricula ?? raw.aluno_matricula ?? raw.alunoDados ?? raw.aluno_dados ?? raw;
    const planoRaw = raw.plano ?? raw.planoMatricula ?? raw.plano_matricula ?? raw.planoDados ?? raw.plano_dados ?? raw;

    return {
        id_matricula: raw.id_matricula ?? raw.idMatricula ?? raw.id ?? undefined,
        cod_matricula: raw.cod_matricula ?? raw.codMatricula ?? raw.cod ?? undefined,
        aluno: normalizarAluno(alunoRaw),
        plano: normalizarPlano(planoRaw),
        data_inicio: new Date(raw.data_inicio ?? raw.dataInicio ?? raw.dataMatricula ?? raw.data_matricula ?? raw.data_inicio ?? raw.inicio ?? raw.data ?? Date.now()),
        data_fim: new Date(raw.data_fim ?? raw.dataFim ?? raw.dataVencimento ?? raw.data_vencimento ?? raw.data_fim ?? raw.fim ?? raw.data_final ?? Date.now()),
        status_matricula: raw.status_matricula ?? raw.statusMatricula ?? raw.status ?? undefined,
        forma_pagamento: raw.forma_pagamento ?? raw.formaPagamento ?? raw.forma_pgto ?? raw.pagamento ?? undefined,
        valor_final: raw.valor_final ?? raw.valorFinal ?? raw.valorPago ?? raw.valor_pago ?? raw.valor ?? undefined,
    };
}

class MatriculaRequests {

    private serverUrl: string;
    private endpoint: string;

    constructor() {
        this.serverUrl = 'http://localhost:3333';
        this.endpoint = '/api/matriculas';
    }

    async getAll(): Promise<MatriculaDTO[]> {
        try {
            const response = await fetch(`${this.serverUrl}${this.endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar matrículas');
            }

            const raw = await response.json();
            const lista = Array.isArray(raw) ? raw : raw.matriculas ?? raw.data ?? raw.resultado ?? raw.result ?? raw.items ?? [];

            if (lista.length > 0) {
                console.log('🔍 Exemplo de matrícula retornado pela API:', lista[0]);
            }

            return lista.map(normalizarMatricula);

        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async getById(id: number) {
        try {
            const response = await fetch(`${this.serverUrl}${this.endpoint}/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Matrícula não encontrada');
            }

            const raw = await response.json();
            const matriculaRaw = raw.matricula ?? raw.data ?? raw.resultado ?? raw.result ?? raw;
            return normalizarMatricula(matriculaRaw);

        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async create(matricula: {
        id_aluno: number,
        id_plano: number,
        data_inicio: string,
        data_fim: string,
        status_matricula: string,
        forma_pagamento: string,
        valor_final: number
    }) {
        try {
            const response = await fetch(`${this.serverUrl}${this.endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify(matricula)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao criar matrícula');
            }

            return await response.json();

        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async update(id: number, matricula: any) {
        try {
            const response = await fetch(`${this.serverUrl}${this.endpoint}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify(matricula)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao atualizar matrícula');
            }

            return await response.json();

        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async delete(id: number) {
        try {
            const response = await fetch(`${this.serverUrl}${this.endpoint}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar matrícula');
            }

            return true;

        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async obterListaDeMatriculas() {
        return this.getAll();
    }

    async obterMatriculaPorId(id_matricula: number): Promise<MatriculaDTO | undefined> {
        try {
            return await this.getById(id_matricula);
        } catch (error) {
            console.error(`Erro ao fazer a consulta da matricula por ID. ${error}`);
            return;
        }
    }
}

export default new MatriculaRequests();
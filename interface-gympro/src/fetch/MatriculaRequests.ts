class MatriculaRequests {

    private serverUrl: string;
    private endpoint: string;

    constructor() {
        this.serverUrl = 'http://localhost:3333';
        this.endpoint = '/api/matriculas';
    }

    async getAll() {
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

            return await response.json();

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

            return await response.json();

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
}

export default new MatriculaRequests();
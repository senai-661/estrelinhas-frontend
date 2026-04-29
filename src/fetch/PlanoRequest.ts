class PlanoRequests {

    private serverUrl: string;
    private endpoint: string;

    constructor() {
        this.serverUrl = 'http://localhost:3333';
        this.endpoint = '/api/planos';
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
                throw new Error('Erro ao buscar planos');
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
                throw new Error('Plano não encontrado');
            }

            return await response.json();

        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async create(plano: {
        tipo_plano: string,
        duracao_dias: number,
        valor: number,
        descricao?: string,
        status_plano?: string
    }) {
        try {
            const response = await fetch(`${this.serverUrl}${this.endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify(plano)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao criar plano');
            }

            return await response.json();

        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async update(id: number, plano: any) {
        try {
            const response = await fetch(`${this.serverUrl}${this.endpoint}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${localStorage.getItem('token')}`
                },
                body: JSON.stringify(plano)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao atualizar plano');
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
                throw new Error('Erro ao deletar plano');
            }

            return true;

        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async obterListaDePlanos() {
        return this.getAll();
    }
}

export default new PlanoRequests();
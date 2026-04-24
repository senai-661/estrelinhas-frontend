/**
 * Classe para lidar com requisições de Plano
 */
class PlanoRequests {

    private serverUrl: string;
    private endpoint: string;

    constructor() {
        this.serverUrl = 'http://localhost:3333';
        this.endpoint = '/api/planos';
    }

    /**
     * Lista todos os planos
     */
    async getAll() {
        try {
            const response = await fetch(`${this.serverUrl}${this.endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
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

    /**
     * Busca plano por ID
     */
    async getById(id: number) {
        try {
            const response = await fetch(`${this.serverUrl}${this.endpoint}/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
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

    /**
     * Cria um novo plano
     */
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
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
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

    /**
     * Atualiza um plano
     */
    async update(id: number, plano: any) {
        try {
            const response = await fetch(`${this.serverUrl}${this.endpoint}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
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

    /**
     * Remove um plano
     */
    async delete(id: number) {
        try {
            const response = await fetch(`${this.serverUrl}${this.endpoint}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
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
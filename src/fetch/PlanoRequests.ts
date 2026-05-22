import PlanoDTO from "../dto/PlanoDTO";

class PlanoRequests {

    private serverUrl: string;
    private endpoint: string;

    constructor() {
        this.serverUrl = 'http://localhost:3333';
        this.endpoint = '/api/planos';
    }

    private normalizePlano(raw: any): PlanoDTO & Record<string, any> {
        return {
            id_plano: raw?.id_plano ?? raw?.idPlano ?? raw?.id ?? raw?.cod_plano ?? raw?.codPlano ?? raw?.codigo,
            cod_plano: raw?.cod_plano ?? raw?.codPlano ?? raw?.codigo ?? raw?.code,
            tipo_plano: raw?.tipo_plano ?? raw?.tipoPlano ?? raw?.tipo ?? raw?.name,
            duracao_dias: raw?.duracao_dias ?? raw?.duracaoDias ?? raw?.duracao ?? raw?.duracaoPlano ?? raw?.duration ?? raw?.days,
            valor: raw?.valor ?? raw?.valor_plano ?? raw?.price ?? raw?.preco,
            descricao: raw?.descricao ?? raw?.description ?? raw?.descriptionPlano ?? raw?.descricaoPlano ?? raw?.descricao_plano ?? "",
            status_plano: raw?.status_plano ?? raw?.statusPlano ?? raw?.status ?? "",
            ...raw
        };
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

            const data = await response.json();
            if (Array.isArray(data)) {
                return data.map(item => this.normalizePlano(item));
            }
            return data;

        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async getById(id: string | number) {
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

            const data = await response.json();
            return this.normalizePlano(data);

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

    async obterPlanoPorId(id_plano: number): Promise<PlanoDTO | undefined> {
    try {
        const token = localStorage.getItem('token');
        const respostaAPI = await fetch(`${this.serverUrl}${this.endpoint}/${id_plano}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `${token}`
            }
        });
        if (respostaAPI.ok) {
            const plano: PlanoDTO = await respostaAPI.json();
            return plano;
        } else {
            throw new Error("Não foi possível buscar o plano.");
        }
    } catch (error) {
        console.error(`Erro ao fazer a consulta de plano por ID. ${error}`);
        return;
    }
}
}

export default new PlanoRequests();
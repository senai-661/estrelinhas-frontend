class MatriculaRequests {
    private serverURL;
    private endpointMatricula;

    constructor() {
        this.serverURL = `http://localhost:3333`;
        this.endpointMatricula = `/api/matriculas`;
    }

    async obterListaDeMatriculas() {
        try {
            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(`${this.serverURL}${this.endpointMatricula}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const dados = await respostaAPI.json();

            
                return dados.map((item: any) => ({
                    cod_matricula: item.idMatricula,
                    id_aluno: item.codAluno,
                    id_plano: item.codPlano,
                    data_inicio: item.dataMatricula,
                    data_fim: item.dataVencimento,
                    status_matricula: item.statusMatricula,
                    forma_pagamento: item.formaPagamento,
                    valor_final: Number(item.valorPago)
                }));
            } else {
                throw new Error("Não foi possível listar as matrículas.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de matrículas. ${error}`);
            return [];
        }
    }
}

export default new MatriculaRequests;
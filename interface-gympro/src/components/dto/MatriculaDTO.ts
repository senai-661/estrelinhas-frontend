export default interface MatriculaDTO {
    id_matricula?: number,
    cod_matricula?: string,
    aluno: {
        id_aluno: number,
        cod_aluno?: string,
        nome?: string,
        sobrenome?: string,
        cpf?: string,
        data_nascimento?: Date,
        endereco?: string,
        email?: string,
        celular?: string,
        status_aluno?: string
    },
    plano: {
        id_plano: number,
        cod_plano?: string,
        tipo_plano?: string,
        duracao_dias?: number,
        valor?: number,
        descricao?: string,
        status_plano?: string
    },
    data_inicio: Date,
    data_fim: Date,
    status_matricula?: string,
    forma_pagamento?: string,
    valor_final?: string
}
export default interface MatriculaDTO {
    id_matricula: number,

    aluno: {
        id_aluno: number,
        nome?: string,
        sobrenome?: string,
        data_nascimento?: Date,
        endereco?: string,
        email?: string,
        celular?: string,
        status_aluno?: boolean
    },

    plano: {
        id_plano: number,
        nome?: string,
        descricao?: string,
        duracao_dias?: number,
        valor?: number,
        ativo?: boolean
    },

    data_inicio: Date,
    data_fim?: Date,
    status_matricula?: string,
    ativo?: boolean
}
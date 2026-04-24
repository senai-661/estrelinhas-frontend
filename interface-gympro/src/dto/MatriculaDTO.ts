export default interface MatriculaDTO {
    id_matricula?: number,
    cod_matricula: string,
    id_aluno: number,
    id_plano: number,
    data_inicio: Date,
    data_fim: Date,
    status_matricula: string,
    forma_pagamento?: string,
    valor_final?: number
}
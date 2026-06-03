export interface MatriculaDTO {
    idMatricula: number;
    codAluno: number;
    codPlano: number;
    dataMatricula: string | Date;
    dataVencimento: string | Date;
    valorPago: string | number;
    formaPagamento?: string;
    statusMatricula: string;
}
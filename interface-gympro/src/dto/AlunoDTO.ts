export default interface AlunoDTO {
    idAluno?: number,
    cod_aluno?: string,
    nome: string,
    sobrenome: string,
    cpf: string,
    dataNascimento: Date,
    endereco: string,
    email: string,
    celular?: string,
    senha?: string,
    statusAluno?: string
}
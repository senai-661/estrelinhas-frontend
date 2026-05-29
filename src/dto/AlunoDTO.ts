export default interface AlunoDTO {
    id_aluno?: number,
    cod_aluno?: string,
    nome: string,
    sobrenome: string,
    cpf: string,
    data_nascimento: Date,
    endereco: string,
    email: string,
    celular?: string,
    senha?: string,
    status_aluno?: string
}
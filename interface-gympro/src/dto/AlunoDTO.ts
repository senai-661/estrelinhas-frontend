export default interface AlunoDTO {
    id_aluno?: number,
    nome: string,
    sobrenome: string,
    data_nascimento: Date,
    endereco: string,
    email: string,
    celular?: string
    status_aluno?: boolean
}
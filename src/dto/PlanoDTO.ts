export default interface PlanoDTO {
    id_plano: number,
    nome: string,
    descricao?: string,
    duracao_dias: number,
    valor: number,
    acesso_total?: boolean, // acesso a todas as áreas
    horario_inicio?: string, // ex: "06:00"
    horario_fim?: string,    // ex: "22:00"
    limite_alunos?: number,
    status_plano?: string, // ex: "ativo", "inativo"
    ativo?: boolean
}
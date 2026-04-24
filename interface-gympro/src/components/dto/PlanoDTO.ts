export default interface PlanoDTO {
    id_plano?: number,
    cod_plano: string,
    tipo_plano: string,
    duracao_dias: number,
    valor: number,
    descricao?: string,
    status_plano?: string
}
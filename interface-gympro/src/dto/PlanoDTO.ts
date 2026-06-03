export interface PlanoDTO {
    codPlano: number;
    tipoPlano: string;
    duracaoDias: number;
    valor: number;
    descricao?: string;
    statusPlano?: string;
}
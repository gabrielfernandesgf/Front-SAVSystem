export interface Aluguel {
  id?: number;
  cliente: { id: number } | null;
  veiculo: { id: number }| null;
  dataInicio: string;
  dataFim: string;
}

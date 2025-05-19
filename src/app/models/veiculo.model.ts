export enum TipoVeiculo {
  CARRO = 'CARRO',
  MOTO = 'MOTO'
}

export interface Veiculo {
  id?: number;
  modelo: string;
  placa: string;
  tipoVeiculo: TipoVeiculo;
  disponivel: boolean;
}

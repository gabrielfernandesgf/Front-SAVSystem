import {Component, OnInit} from '@angular/core';
import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {Panel} from 'primeng/panel';
import {Aluguel} from '../../models/aluguel.model';
import {AluguelService} from '../../services/aluguel.service';
import {ClienteService} from '../../services/cliente.service';
import {VeiculoService} from '../../services/veiculo.service';
import {ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Router} from '@angular/router';

@Component({
  selector: 'app-alugueis',
  imports: [
    TableModule,
    FormsModule,
    DropdownModule,
    Panel,
    ButtonDirective,
    InputText
  ],
  templateUrl: './alugueis.component.html',
  styleUrl: './alugueis.component.css'
})
export class AlugueisComponent implements OnInit {

  aluguel: Aluguel = {
    cliente: { id: 0 },
    veiculo: { id: 0 },
    dataInicio: '',
    dataFim: ''
  };

  clientes: any[] = [];
  veiculosDisponiveis: any[] = [];
  alugueis: any[] = [];

  constructor(
    private aluguelService: AluguelService,
    private clienteService: ClienteService,
    private veiculoService: VeiculoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscarClientes();
    this.buscarVeiculosDisponiveis();
    this.buscarAlugueis();
  }

  buscarClientes() {
    this.clienteService.listarTodos().subscribe(data => {
      this.clientes = data
    });
  }

  buscarVeiculosDisponiveis() {
    this.veiculoService.listarTodos().subscribe(data => {
      this.veiculosDisponiveis = data.filter(v => v.disponivel === true);
    });
  }

  buscarAlugueis() {
    this.aluguelService.listarTodos().subscribe(data => {
      this.alugueis = data
    });
  }

  registrarAluguel() {
    if (!this.aluguel.cliente || !this.aluguel.veiculo || !this.aluguel.dataInicio || !this.aluguel.dataFim) {
      alert('Preencha todos os campos!');
      return;
    }

    this.aluguelService.salvar(this.aluguel).subscribe({
      next: () => {
        alert('Aluguel registrado com sucesso!');
        this.buscarAlugueis();
        this.buscarVeiculosDisponiveis();
        this.aluguel = { cliente: null, veiculo: null, dataInicio: '', dataFim: '' };
      },
      error: () => {
        alert('Erro ao registrar aluguel.');
      }
    });
  }

  irParaCadastroCliente(): void {
    this.router.navigate(['/clientes']);
  }

  irParaCadastroVeiculo(): void {
    this.router.navigate(['/veiculos']);
  }


}

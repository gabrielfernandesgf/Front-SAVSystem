import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Panel} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {Checkbox} from 'primeng/checkbox';
import {TableModule} from 'primeng/table';
import {NgIf} from '@angular/common';
import {Tag} from 'primeng/tag';
import {TipoVeiculo, Veiculo} from '../../models/veiculo.model';
import {VeiculoService} from '../../services/veiculo.service';
import {ButtonDirective} from 'primeng/button';
import { Router } from '@angular/router';



@Component({
  selector: 'app-veiculos',
  imports: [
    FormsModule,
    Panel,
    DropdownModule,
    Checkbox,
    TableModule,
    NgIf,
    Tag,
    ButtonDirective
  ],
  templateUrl: './veiculos.component.html',
  styleUrl: './veiculos.component.css'
})
export class VeiculosComponent implements OnInit {

  veiculo: Veiculo = {
    modelo: '',
    placa: '',
    tipoVeiculo: TipoVeiculo.CARRO,
    disponivel: true
  };


  veiculos: Veiculo[] = [];

  tiposVeiculo = [
    { label: 'Carro', value: TipoVeiculo.CARRO },
    { label: 'Moto', value: TipoVeiculo.MOTO }
  ];

  constructor(private veiculoService: VeiculoService, private router: Router) {}

  ngOnInit(): void {
    this.listarVeiculos();
  }

  salvarVeiculo(){
    this.veiculoService.salvar(this.veiculo).subscribe(() => {
      this.veiculo = {id: 0, placa: '', modelo: '', tipoVeiculo: TipoVeiculo.CARRO, disponivel: true };
      this.listarVeiculos();
    });
  }

  listarVeiculos() {
    this.veiculoService.listarTodos().subscribe((data) => {
      this.veiculos = data;
    });
  }

  deletarVeiculo(id: number): void {
    if (confirm('Tem certeza que deseja excluir este veiculo?')) {
      this.veiculoService.deletar(id).subscribe(() => {
        this.listarVeiculos();
      });
    }
  }

  voltar(): void {
    this.router.navigate(['/alugueis']);
  }

}

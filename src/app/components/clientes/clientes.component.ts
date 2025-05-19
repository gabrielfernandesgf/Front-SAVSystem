import {Component, OnInit} from '@angular/core';
import {Panel} from 'primeng/panel';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {ClienteService} from '../../services/cliente.service';
import {Router} from '@angular/router';
import {ButtonDirective} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {NgIf} from '@angular/common';
import { Cliente } from '../../models/cliente.model';


@Component({
  selector: 'app-clientes',
  imports: [
    Panel,
    InputText,
    FormsModule,
    ButtonDirective,
    TableModule,
    NgIf
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {

  cliente: Cliente = {
    nome: '',
    cpf: ''
  };
  clientes: any[] = [];

  constructor(private clienteService: ClienteService, private router: Router) {  }

  ngOnInit(): void {
    this.buscarClientes();
  }

  buscarClientes() {
    this.clienteService.listarTodos().subscribe((data: any[])=> {
      this.clientes = data;
    });
  }

  salvarCliente() {
    if (!this.cliente.nome || !this.cliente.cpf) {
      alert('Preencha todos os campos!');
      return;
    }
    if (this.cliente.id) {
      this.clienteService.atualizar(this.cliente).subscribe(() => {
        alert('Cliente atualizado com sucesso!');
        this.cliente = { nome: '', cpf: '' };
        this.buscarClientes();
      });
    } else {
      this.clienteService.salvar(this.cliente).subscribe(() => {
        alert('Cliente cadastrado com sucesso!');
        this.cliente = { nome: '', cpf: '' };
        this.buscarClientes();
      });
    }
  }

  voltar(): void {
    this.router.navigate(['/alugueis']);
  }

  editarCliente(cliente: any) {
    this.cliente = { ...cliente };
  }

  excluirCliente(id: number) {
    if (confirm('Deseja Realmente excluir este cliente?')) {
      this.clienteService.excluir(id).subscribe(() => {
        alert('Cliente excluido com sucesso!');
        this.buscarClientes();
      }, () => {
        alert('Nao foi possivel excluir o cliente')
      });
    }
  }


}

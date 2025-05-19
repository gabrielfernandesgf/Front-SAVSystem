import { Routes } from '@angular/router';
import {ClientesComponent} from './components/clientes/clientes.component';
import {VeiculosComponent} from './components/veiculos/veiculos.component';
import {AlugueisComponent} from './components/alugueis/alugueis.component';

export const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: 'veiculos', component: VeiculosComponent },
  { path: 'alugueis', component: AlugueisComponent },
  { path: '', redirectTo: 'alugueis', pathMatch: 'full' }
];

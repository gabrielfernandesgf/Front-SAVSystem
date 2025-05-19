import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Aluguel} from '../models/aluguel.model';

@Injectable({
  providedIn: 'root'
})
export class AluguelService {
  private apiUrl = 'http://localhost:8080/api/aluguel';

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Aluguel[]> {
    return this.http.get<Aluguel[]>(this.apiUrl);
  }

  salvar(aluguel: Aluguel): Observable<Aluguel> {
    return this.http.post<Aluguel>(this.apiUrl, aluguel);
  }
}

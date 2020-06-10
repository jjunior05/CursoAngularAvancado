import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filme } from '../shared/models/filme';
import { ConfigPrams } from '../shared/models/config-prams';
import { ConfigParamsService } from './config-params.service';

const url = 'http://localhost:3000/filmes/';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  // Criado um modelo / interface Filme para modelar os campos necessários para a API de Filme. Nosso serviço exigirá sempre este modelo.

  constructor(private http: HttpClient,
    private configService: ConfigParamsService) { }

  salvar(filme: Filme): Observable<Filme> {
    return this.http.post<Filme>(url, filme);
  }

  editar(filme: Filme): Observable<Filme> {
    return this.http.put<Filme>(url + filme.id, filme);
  }

  //Criada uma interface de parâmetros para receber os valores.
  listar(config: ConfigPrams): Observable<Filme[]> {
    const configPrams = this.configService.configurarParametros(config);
    return this.http.get<Filme[]>(url, { params: configPrams });
  }

  visualizar(id: number): Observable<Filme> {
    return this.http.get<Filme>(url + id); //no método GET do http, ele já reconhece que a URL é do tipo string e vai concatenar com o ID passado por parâmetro
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }
}

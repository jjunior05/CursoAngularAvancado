import { Injectable } from "@angular/core";
import { TransitionCheckState } from '@angular/material/checkbox';

@Injectable({
  providedIn: "root"
})
export class OpcaoFilmesService {
  constructor() { }

  retornarOpcao(): string[] {
    let opcao: string[];
    return opcao = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção cientifica', 'Comédia', 'Aventura', 'Drama'];
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';
import { ConfigPrams } from 'src/app/shared/models/config-prams';
import { OpcaoFilmesService } from '../../core/opcoes.service';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {
  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';

  config: ConfigPrams = {
    pagina: 0,
    limite: 4
  };
  filmes: Filme[] = [];
  filtrosListagem: FormGroup;
  generos: Array<string>;

  constructor(private filmesService: FilmesService,
    private opcaoService: OpcaoFilmesService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.filtrosListagem = this.fb.group({
      texto: [''],
      genero: ['']
    });

    // Criado uma interface de configuração 'config-params', preenchendo este tipo com os valores do formGroup 'filtrosListagem'
    this.filtrosListagem.get('texto').valueChanges
      .pipe(debounceTime(400)) //garante que a requiseção será realizada após um determinado tempo
      .subscribe((val: string) => {
        this.config.pesquisa = val;
        this.resetarConsulta();
      });

    this.filtrosListagem.get('genero').valueChanges.subscribe((val: string) => {
      this.config.campo = { tipo: 'genero', valor: val };
      this.resetarConsulta();
    });



    this.listarFilmes();
    this.generos = this.opcaoService.retornarOpcao();
  }

  onScroll(): void {
    this.listarFilmes();
  }

  abrir(id: number): void {
    this.router.navigateByUrl('/filmes/' + id);
  }

  private listarFilmes(): void {
    this.config.pagina++;
    this.filmesService.listar(this.config)
      .subscribe((filmes: Filme[]) => this.filmes.push(...filmes)); // '...' serve para o typescript entender que estamos dando um merger num array passando uma lista
  }

  private resetarConsulta(): void {
    this.config.pagina = 0;
    this.filmes = [];
    this.listarFilmes();
  }
}

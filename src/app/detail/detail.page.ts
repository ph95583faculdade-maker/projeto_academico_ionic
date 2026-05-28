// RESPONSÁVEL: GUILHERME — Req 7 (lê parâmetro da rota)
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonSpinner, IonText,
  IonBadge, IonButton,
} from '@ionic/angular/standalone';
import { BooksService, Book } from '../services/books.service';
import { HighlightDirective } from '../directives/highlight.directive';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [
    UpperCasePipe,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonCard, IonCardHeader,
    IonCardTitle, IonCardContent, IonSpinner, IonText,
    IonBadge, IonButton,
    HighlightDirective,
  ],
})
export class DetailPage {
  // Dados do cache (da busca) — aparecem imediatamente, sem loading
  cachedBook: Book | null = null;
  // Dados extras da API (descrição, assuntos) — carregados separadamente
  bookDetail: any = null;
  isLoadingExtra = false;
  extraError = '';
  bookKey = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private booksService: BooksService
  ) {}

  // ionViewWillEnter é o hook correto no Ionic:
  // é chamado TODA VEZ que a página aparece na tela, inclusive ao voltar e entrar de novo.
  // ngOnInit só é chamado na primeira vez — por isso o bug de "não entrar novamente".
  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookKey = decodeURIComponent(id);

      // Mostra os dados do cache imediatamente (sem nenhum loading na tela)
      this.cachedBook = this.booksService.selectedBook;

      // Reseta os extras para não mostrar dados de um livro anterior
      this.bookDetail = null;
      this.extraError = '';

      // Tenta carregar os extras (descrição, assuntos) em segundo plano
      this.loadExtras();
    }
  }

  loadExtras() {
    this.isLoadingExtra = true;
    this.booksService.getBookDetail(this.bookKey).subscribe({
      next: (data) => {
        this.bookDetail = data;
        this.isLoadingExtra = false;
      },
      error: () => {
        // Erro silencioso: os dados do cache já estão na tela, então não assusta o usuário
        this.extraError = 'Detalhes extras não disponíveis para este livro.';
        this.isLoadingExtra = false;
      },
    });
  }

  getDescription(): string {
    if (!this.bookDetail?.description) return 'Sem descrição disponível.';
    if (typeof this.bookDetail.description === 'string') return this.bookDetail.description;
    return this.bookDetail.description?.value ?? 'Sem descrição disponível.';
  }

  getCoverUrl(): string {
    return this.cachedBook?.cover_i
      ? this.booksService.getCoverUrl(this.cachedBook.cover_i, 'L')
      : 'https://placehold.co/200x280?text=Sem+Capa';
  }

  goBack() { this.router.navigate(['/home']); }
}

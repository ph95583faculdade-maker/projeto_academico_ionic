// RESPONSÁVEL: GUILHERME (páginas/navegação) + PEDRO (service) + LUCAS (@if/@for no HTML)
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonSearchbar, IonCard, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonCardContent, IonBadge,
  IonSpinner, IonText, IonFooter,
} from '@ionic/angular/standalone';
import { BooksService, Book } from '../services/books.service';
import { BookPagesPipe } from '../pipes/book-pages.pipe';
import { HighlightDirective } from '../directives/highlight.directive';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    UpperCasePipe,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonSearchbar, IonCard, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonCardContent, IonBadge,
    IonSpinner, IonText, IonFooter,
    BookPagesPipe, HighlightDirective,
  ],
})
export class HomePage implements OnInit {
  books: Book[] = [];
  searchTerm = 'tolkien';
  isLoading = false;
  errorMessage = '';

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit() { this.search(); }

  // captura o valor direto do evento do Ionic (necessário com debounce)
  onSearch(event: any) {
    this.searchTerm = event.detail.value ?? '';
    this.search();
  }

  search() {
    if (!this.searchTerm.trim()) return;
    this.isLoading = true;
    this.errorMessage = '';
    this.books = [];
    this.booksService.searchBooks(this.searchTerm).subscribe({
      next: (data) => { this.books = data; this.isLoading = false; },
      error: () => { this.errorMessage = 'Erro ao buscar livros.'; this.isLoading = false; },
    });
  }

  // GUILHERME — Req 7: passa o ID do livro por rota
  goToDetail(book: Book) {
    // Salva o livro no cache do service para exibir imediatamente na tela de detalhe
    this.booksService.selectedBook = book;
    this.router.navigate(['/detail', encodeURIComponent(book.key)]);
  }

  getCoverUrl(book: Book): string {
    return book.cover_i
      ? this.booksService.getCoverUrl(book.cover_i, 'M')
      : 'https://placehold.co/80x110?text=Sem+Capa';
  }
}

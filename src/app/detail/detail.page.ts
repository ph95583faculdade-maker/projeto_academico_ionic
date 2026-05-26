// RESPONSÁVEL: GUILHERME — Req 7 (lê parâmetro da rota)
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonSpinner, IonText,
  IonBadge, IonButton,
} from '@ionic/angular/standalone';
import { BooksService } from '../services/books.service';
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
export class DetailPage implements OnInit {
  bookDetail: any = null;
  isLoading = false;
  errorMessage = '';
  bookKey = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private booksService: BooksService
  ) {}

  ngOnInit() {
    // GUILHERME — lê o parâmetro 'id' que veio da Home
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookKey = decodeURIComponent(id);
      this.loadDetail();
    }
  }

  loadDetail() {
    this.isLoading = true;
    this.booksService.getBookDetail(this.bookKey).subscribe({
      next: (data) => { this.bookDetail = data; this.isLoading = false; },
      error: () => { this.errorMessage = 'Não foi possível carregar os detalhes.'; this.isLoading = false; },
    });
  }

  getDescription(): string {
    if (!this.bookDetail?.description) return 'Sem descrição disponível.';
    if (typeof this.bookDetail.description === 'string') return this.bookDetail.description;
    return this.bookDetail.description?.value ?? 'Sem descrição disponível.';
  }

  goBack() { this.router.navigate(['/home']); }
}

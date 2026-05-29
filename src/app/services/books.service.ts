// =========================================================
// RESPONSÁVEL: PEDRO — Req 2 (HttpClient), 3 (API GET), 5 (Service)
// =========================================================
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, timeout } from 'rxjs';

export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  number_of_pages_median?: number;
  cover_i?: number;
}
//service =,home,detail 
@Injectable({ providedIn: 'root' })
export class BooksService {
  private readonly API_URL = 'https://openlibrary.org/search.json';

  // Cache do livro clicado — usado para mostrar dados imediatamente na tela de detalhe
  // sem precisar esperar a chamada extra da API (corrige o loading infinito)
  selectedBook: Book | null = null;

  constructor(private http: HttpClient) {}
//api com metodo get
  searchBooks(query: string): Observable<Book[]> {
    const url = `${this.API_URL}?q=${encodeURIComponent(query)}&limit=20&fields=key,title,author_name,first_publish_year,number_of_pages_median,cover_i`;
    return this.http.get<any>(url).pipe(map(r => r.docs));
  }

  getBookDetail(workId: string): Observable<any> {
    // timeout de 8 segundos — sem isso, a requisição fica pendurada para sempre
    return this.http.get<any>(`https://openlibrary.org${workId}.json`).pipe(
      timeout(8000)
    );
  }

  getCoverUrl(coverId: number, size: 'S' | 'M' | 'L' = 'M'): string {
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
  }
}

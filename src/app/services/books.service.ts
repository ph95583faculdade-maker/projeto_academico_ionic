// =========================================================
// RESPONSÁVEL: PEDRO — Req 2 (HttpClient), 3 (API GET), 5 (Service)
// =========================================================
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  number_of_pages_median?: number;
  cover_i?: number;
}

@Injectable({ providedIn: 'root' })
export class BooksService {
  private readonly API_URL = 'https://openlibrary.org/search.json';

  constructor(private http: HttpClient) {}

  searchBooks(query: string): Observable<Book[]> {
    const url = `${this.API_URL}?q=${encodeURIComponent(query)}&limit=20&fields=key,title,author_name,first_publish_year,number_of_pages_median,cover_i`;
    return this.http.get<any>(url).pipe(map(r => r.docs));
  }

  getBookDetail(workId: string): Observable<any> {
    return this.http.get<any>(`https://openlibrary.org${workId}.json`);
  }

  getCoverUrl(coverId: number, size: 'S'|'M'|'L' = 'M'): string {
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
  }
}

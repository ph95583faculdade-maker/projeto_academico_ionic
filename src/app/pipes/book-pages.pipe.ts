// =========================================================
// RESPONSÁVEL: VITOR — Req 4 Parte 1 (Pipe Personalizado)
// Uso: {{ book.number_of_pages_median | bookPages }}
// =========================================================
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'bookPages', standalone: true })
export class BookPagesPipe implements PipeTransform {
  transform(pages: number | undefined): string {
    if (!pages || pages <= 0) return 'N/A páginas';
    return `${pages} páginas`;
  }
}

// =========================================================
// RESPONSÁVEL: LETÍCIA — Req 6 Parte 1 (Diretiva Personalizada)
// Uso: <ion-card appHighlight>
// =========================================================
import { Directive, Input, HostBinding, HostListener, ElementRef } from '@angular/core';

@Directive({ selector: '[appHighlight]', standalone: true })
export class HighlightDirective {
  @Input() highlightColor: string = '#4f8ef7';

  constructor(private el: ElementRef) {}

  @HostBinding('style.transition') transition = 'all 0.25s ease';

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.boxShadow = `0 0 0 2px ${this.highlightColor}`;
    this.el.nativeElement.style.transform = 'scale(1.02)';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.boxShadow = 'none';
    this.el.nativeElement.style.transform = 'scale(1)';
  }
}

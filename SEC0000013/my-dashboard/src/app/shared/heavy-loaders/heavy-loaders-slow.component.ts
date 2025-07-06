import {Component, input} from '@angular/core';
import {NgClass} from '@angular/common';

/**
 * Simula un componente que tarda mucho en crearse.
 * (Bloqueante)
 */
@Component({
  selector: 'heavy-loaders-slow',
  imports: [
    NgClass
  ],
  template: `
    <section [ngClass]="['w-full h-[600px]',cssClass() ]">
    <h1>Heavy Loader Slow</h1>
    </section>
  `,
  styles: ``
})
export class HeavyLoadersSlowComponent {
  public cssClass = input.required<string>();

  constructor() {
    console.log('Heavy Loaders Slow Componente. Cargando....');

    // simula bloqueo
    const start = Date.now();
    while( Date.now() - start < 3000 ){}
    console.log('Heavy Loaders Slow Componente. Cargadp');

  }
}

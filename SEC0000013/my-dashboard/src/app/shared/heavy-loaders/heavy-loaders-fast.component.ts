import {Component, input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'heavy-loaders-fast',
  imports: [
    NgClass
  ],
  template: `
    <section [ngClass]="['w-full', cssClass()]">
      <!-- muestro lo que se ponga dentro de <heavy-loaders-fast [cssClass]="'...'"> </heavy-loaders-fast>-->
      <ng-content />
    </section>`,
  styles: ``
})
export class HeavyLoadersFastComponent {
    public cssClass = input.required<string>();

  constructor() {
    console.log('HeavyLoader Fast creado');
  }

}

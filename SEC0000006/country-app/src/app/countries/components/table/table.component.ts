import {Component, effect, input, InputSignal} from '@angular/core';
import {TitleCasePipe} from '@angular/common';
import {RestCountry} from '../../interfaces/rest-countries.interface';

@Component({
  selector: 'app-shared-table',
  imports: [
    TitleCasePipe
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  standalone: true
})
export class TableComponent {
  readonly headTable : InputSignal<string[]>  = input.required<string[]>()
  readonly bodyTable : InputSignal<RestCountry[]> = input.required<RestCountry[]>();

  constructor() {
    effect(() => {
      console.log('Head:', this.headTable());
      console.log('Body:', this.bodyTable());
    });
  }
}

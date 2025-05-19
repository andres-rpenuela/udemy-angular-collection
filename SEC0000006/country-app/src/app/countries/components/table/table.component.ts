import {Component, effect, input, InputSignal} from '@angular/core';
import {DecimalPipe, TitleCasePipe} from '@angular/common';
import {RestCountry} from '../../interfaces/rest-countries.interface';
import {Country} from '../../interfaces/country.interface';

@Component({
  selector: 'app-shared-table',
  imports: [
    TitleCasePipe,
    DecimalPipe
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  standalone: true
})
export class TableComponent {
  readonly headTable : InputSignal<string[]>  = input.required<string[]>()
  readonly bodyTable : InputSignal<Country[]> = input.required<Country[]>();

  constructor() {
    effect(() => {
      console.log('Head:', this.headTable());
      console.log('Body:', this.bodyTable());
    });
  }
}

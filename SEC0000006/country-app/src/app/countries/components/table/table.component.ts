import {Component, effect, input, InputSignal} from '@angular/core';
import {DecimalPipe, TitleCasePipe} from '@angular/common';
import {RestCountry} from '../../interfaces/rest-countries.interface';
import {Country} from '../../interfaces/country.interface';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-shared-table',
  imports: [
    TitleCasePipe,
    DecimalPipe,
    RouterLink
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  standalone: true
})
export class TableComponent {
  readonly headTable : InputSignal<string[]>  = input.required<string[]>()
  readonly bodyTable : InputSignal<Country[]> = input.required<Country[]>();

  readonly messageError = input<string | unknown | null |undefined >(null);
  readonly isEmpty = input<boolean>(false);
  readonly isLoading = input<boolean>(false);

  constructor() {
    effect(() => {
      console.log('Head:', this.headTable());
      console.log('Body:', this.bodyTable());
    });
  }
}

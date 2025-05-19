import {Component, signal, WritableSignal} from '@angular/core';
import {NgIf} from '@angular/common';
import {SearchComponent} from '../../../shared/components/search/search.component';
import {TableComponent} from '../table/table.component';
import type {Country} from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-by-country',
  imports: [
    NgIf,
    SearchComponent,
    TableComponent
  ],
  templateUrl: './by-country.component.html',
  styleUrl: './by-country.component.css',
  standalone: true
})
export class ByCountryComponent {
  readonly countrySignal =signal<string>('');
  readonly placeholderSearch : string = 'Buscar por pais';

  readonly headTable : string[] = ['#','Icono','Bandera','Nombre','Capital','Poblacion'];
  readonly bodyTable : WritableSignal<Country[]> = signal<Country[]>([]);

  valueSearch(value: string) {
      this.countrySignal.set(value);
  }
}

import {Component, inject, resource, signal, WritableSignal} from '@angular/core';
import {NgIf} from '@angular/common';
import {SearchComponent} from '../../../shared/components/search/search.component';
import {TableComponent} from '../table/table.component';
import type {Country} from '../../interfaces/country.interface';
import {CountryService} from '../../services/country.service';
import {firstValueFrom} from 'rxjs';

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
export class ByCountryComponent {// https://restcountries.com/v3.1/name/{name}
  readonly countrySignal =signal<string>('');
  readonly placeholderSearch : string = 'Buscar por pais';

  readonly headTable : string[] = ['#','Icono','Bandera','Nombre','Capital','Poblacion'];
  readonly bodyTable : WritableSignal<Country[]> = signal<Country[]>([]);

  public countryService: CountryService = inject(CountryService);
  public countryResource = resource({
    request: () => ( { query : this.countrySignal() } ),
    loader: async ({request}) => {
      if( !this.countrySignal()?.trim()) return []; // si no hay valor, se devuelve un valor vacio

      return await firstValueFrom(  this.countryService.searchHByCountry( request.query ));
    }
  });

}

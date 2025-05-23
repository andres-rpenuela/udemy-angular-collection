import {Component, inject, signal, WritableSignal} from '@angular/core';
import {NgIf} from '@angular/common';
import {TableComponent} from '../table/table.component';
import type {Country} from '../../interfaces/country.interface';
import {Region} from '@interface/country/region.type';
import {MenuTopComponent} from './menu-top/menu-top.component';
import {CountryService} from '../../services/country.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';

@Component({
  selector: 'app-country-by-region',
  imports: [
    NgIf,
    TableComponent,
    MenuTopComponent
  ],
  templateUrl: './by-region.component.html',
  styleUrl: './by-region.component.css',
  standalone: true
})
export class ByRegionComponent {
  readonly headTable : string[] = ['#','Icono','Bandera','Nombre','Capital','Poblacion'];
  readonly regionSng = signal<Region|undefined>(undefined);

  readonly countryService = inject(CountryService);

  public searchRegion(region:Region){
    console.log('Buscar '+region);
    this.regionSng.set(region);
  }

  public regionResource = rxResource({
    request: () => ( { query : this.regionSng() } ),
    loader: ({request}) => {
      if( !request.query?.trim()) return of([]); // si no hay valor, se devuelve un valor vacio

      return  this.countryService.searchByRegion( request.query );
    }
  })
}

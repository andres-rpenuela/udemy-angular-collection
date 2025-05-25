import {Component, inject, linkedSignal, signal, WritableSignal} from '@angular/core';
import {NgIf} from '@angular/common';
import {TableComponent} from '../table/table.component';
import type {Country} from '../../interfaces/country.interface';
import {Region} from '@interface/country/region.type';
import {MenuTopComponent} from './menu-top/menu-top.component';
import {CountryService} from '../../services/country.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

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

  // routas dinamicas
  readonly activeRouter = inject(ActivatedRoute);
  readonly router = inject(Router);

  // linkedSignal, esto protege de cambios por efectos en la aplicacion
  // ademas, de  mantener sincronizado un parámetro de query (region) con una señal reactiva,
  // y haces una validación antes de castear.
  readonly queryParam: WritableSignal<Region | null> = linkedSignal(() => {
    // se valida antes de hacer cast, porque los query params son siempre strings (o null si no existen)
    const regionStr: string  = this.activeRouter.snapshot.queryParamMap.get('query') ?? '';
    return this.isRegion(regionStr) ? (regionStr as Region) : null;
  });

  private readonly regions:Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  public searchRegion(region:Region){
    console.log('Buscar '+region);
    this.regionSng.set(region);
  }

  public regionResource = rxResource({
    request: () => ( { query : this.regionSng() } ),
    loader: ({request}) => {
      if( !request.query?.trim()) return of([]); // si no hay valor, se devuelve un valor vacio

      this.router.navigate(['/country/by-region'],{queryParams: {query:request.query} });

      return  this.countryService.searchByRegion( request.query );
    }
  });


  public isRegion(value: string | null): value is Region {
    console.log('validando:', value);
    return this.regions.includes(value as Region);
  }
}

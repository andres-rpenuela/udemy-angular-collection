import {Component, DestroyRef, effect, inject, resource, signal, WritableSignal} from '@angular/core';
import {SearchComponent} from '../../../shared/components/search/search.component';
import {TableComponent} from '../table/table.component';
import {NgIf} from '@angular/common';
import {CountryService} from '../../services/country.service';
import {catchError, delay, firstValueFrom, of} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import type {Country} from '../../interfaces/country.interface'; // importando solo la información de tip

@Component({
  selector: 'app-country-by-capital',
  imports: [
    SearchComponent,
    TableComponent,
    NgIf
  ],
  templateUrl: './by-capital.component.html',
  styleUrl: './by-capital.component.css',
  standalone: true
})
export class ByCapitalComponent {
  readonly capitalSng =signal<string>('');

  readonly headTable : string[] = ['#','Icono','Bandera','Nombre','Capital','Poblacion'];
  //readonly bodyTable : WritableSignal<Country[]> = signal<Country[]>([]);

  readonly placeholderSearch : string = 'Buscar por capital';

  private countryService = inject(CountryService);
  //private destroyRef = inject(DestroyRef);

  // readonly isLoading = signal(false)
  // readonly hasError = signal<string|null>(null);
  //
  // constructor() {
  //   effect( () => {
  //     console.log(`Value received: ${this.capitalSng()}` );
  //   });
  //
  // }
  //
  // public valueSearch(value: string): void{
  //   console.log("hola")
  //   if( this.isLoading()) return;
  //
  //   this.capitalSng.set(value);
  //
  //   const param = this.capitalSng().trim();
  //
  //   if (!param) {
  //     this.bodyTable.set([]);
  //     return;
  //   }
  //
  //   // empieza la busqueda y limpia los valores
  //   this.isLoading.set(true);
  //   // this.hasError.set( null );
  //   // this.bodyTable.set( [] ); // opcional, si quremos que apareza "Buscando"
  //
  //   this.countryService.searchByCapital( this.capitalSng() )
  //     .pipe(
  //       takeUntilDestroyed(this.destroyRef),// cancela automáticamente la suscripción al destruir el componente.
  //       // catchError(err => {
  //       //   console.error('Error al buscar países:', err);
  //       //   this.hasError.set(`Error al buscar países: CODE:  ${err.error.code},MESSAGE: ${err.error.message}`);
  //       //   this.bodyTable.set([]);
  //       //   return of([]);
  //       // }),
  //       delay(100)
  //     )
  //     .subscribe( {
  //       next: countries => {
  //
  //         if( countries.length > 0 && this.hasError() != null ){
  //           this.hasError.set( null );
  //         }
  //
  //         console.log(countries)
  //         this.bodyTable.set( countries );
  //         this.isLoading.set(false);
  //       },
  //       error: ( err ) => {
  //         //console.error('Error al buscar países:', err);
  //         this.hasError.set(`${err}`);
  //         this.bodyTable.set([]);
  //         this.isLoading.set(false);
  //       }
  //     } );
  // }

  // Simplicando con resources (Angular 19+, experimental)
  public countryResource = resource({
    request: () => ({  query: this.capitalSng() }),
    loader: async( { request, previous, abortSignal} ) => {
      if( !this.capitalSng()?.trim()) return []; // si no hay valor, se devuelve un valor vacio

      //return this.countryService.searchByCapital(request.query) // esto devuelve un observable
      // convertimos el observable en una promesa con `firstValueFrom`, que espera a que el observable emita un valor
      // y esta se resuelve con el primer valor emitido con "await" o si ocurre un error
      // alternativa al await, se puede suar then y cath de firstValueFrom( obsrrvable )
      return await firstValueFrom( this.countryService.searchByCapital(request.query) );
    }
  })

  public valueSearch(value: string): void{
    // actualiza el valor respectivo
    // Se puede poner en el input como (valueEmmit)="this.capital.set($event)" en vez de (valueEmmit)="valueSearch($event)"
      this.capitalSng.set(value);
  }
}

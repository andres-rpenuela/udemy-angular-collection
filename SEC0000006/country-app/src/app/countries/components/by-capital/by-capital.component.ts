import {Component, DestroyRef, effect, inject, signal, WritableSignal} from '@angular/core';
import {SearchComponent} from '../../../shared/components/search/search.component';
import {TableComponent} from '../table/table.component';
import {NgIf} from '@angular/common';
import {CountryService} from '../../services/country.service';
import {catchError, delay, of} from 'rxjs';
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
  readonly bodyTable : WritableSignal<Country[]> = signal<Country[]>([]);

  readonly placeholderSearch : string = 'Buscar por capital';

  private countryService = inject(CountryService);
  private destroyRef = inject(DestroyRef);

  readonly isLoading = signal(false)
  readonly hasError = signal<string|null>(null);

  constructor() {
    effect( () => {
      console.log(`Value received: ${this.capitalSng()}` );
    });

  }

  public valueSearch(value: string): void{
    console.log("hola")
    if( this.isLoading()) return;

    this.capitalSng.set(value);

    const param = this.capitalSng().trim();

    if (!param) {
      this.bodyTable.set([]);
      return;
    }

    // empieza la busqueda y limpia los valores
    this.isLoading.set(true);
    // this.hasError.set( null );
    // this.bodyTable.set( [] ); // opcional, si quremos que apareza "Buscando"

    this.countryService.searchByCapital( this.capitalSng() )
      .pipe(
        takeUntilDestroyed(this.destroyRef),// cancela automáticamente la suscripción al destruir el componente.
        // catchError(err => {
        //   console.error('Error al buscar países:', err);
        //   this.hasError.set(`Error al buscar países: CODE:  ${err.error.code},MESSAGE: ${err.error.message}`);
        //   this.bodyTable.set([]);
        //   return of([]);
        // }),
        delay(100)
      )
      .subscribe( {
        next: countries => {

          if( countries.length > 0 && this.hasError() != null ){
            this.hasError.set( null );
          }

          console.log(countries)
          this.bodyTable.set( countries );
          this.isLoading.set(false);
        },
        error: ( err ) => {
          //console.error('Error al buscar países:', err);
          this.hasError.set(`${err}`);
          this.bodyTable.set([]);
          this.isLoading.set(false);
        }
      } );
  }
}

import {Component, DestroyRef, effect, inject, signal, WritableSignal} from '@angular/core';
import {SearchComponent} from '../../../shared/components/search/search.component';
import {TableComponent} from '../../../shared/components/table/table.component';
import {NgIf} from '@angular/common';
import {CountryService} from '../../services/country.service';
import {catchError, of} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

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
  readonly bodyTable : WritableSignal<string[][]> = signal<string[][]>([]);

  readonly placeholderSearch : string = 'Buscar por capital';

  private countryService = inject(CountryService);
  private destroyRef = inject(DestroyRef);


  constructor() {
    effect( () => {
      console.log(`Value received: ${this.capitalSng()}` );
      const param = this.capitalSng().trim();

      if (!param) {
        this.bodyTable.set([]);
        return;
      }


      this.countryService.searchByCapital( this.capitalSng() )
        .pipe(
          takeUntilDestroyed(this.destroyRef),// cancela automáticamente la suscripción al destruir el componente.
          catchError(err => {
            console.error('Error al buscar países:', err);
            this.bodyTable.set([]);
            return of([]);
          })
        )
        .subscribe( data => console.log(data) );
    });
  }

  public valueSearch(value: string): void{
    console.log("hola")
    this.capitalSng.set(value);
  }
}

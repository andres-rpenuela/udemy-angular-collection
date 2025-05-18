import {Component, effect, signal, WritableSignal} from '@angular/core';
import {SearchComponent} from '../../../shared/components/search/search.component';
import {TableComponent} from '../../../shared/components/table/table.component';
import {NgIf} from '@angular/common';

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
export class ByCapitalComponent{
    readonly capitalSng =signal<string>('');

    readonly headTable : string[] = ['#','Icono','Bandera','Nombre','Capital','Poblacion'];
    readonly bodyTable : WritableSignal<string[][]> = signal<string[][]>([]);

    readonly placeholderSearch : string = 'Buscar por capital';

    constructor() {
      effect( () => {
        console.log(`Value received: ${this.capitalSng()}` )
      });
    }

    public valueSearch(value: string): void{
      console.log("hola")
      this.capitalSng.set(value);
    }
}

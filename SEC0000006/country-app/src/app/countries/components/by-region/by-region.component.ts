import {Component, signal, WritableSignal} from '@angular/core';
import {NgIf} from '@angular/common';
import {SearchComponent} from '../../../shared/components/search/search.component';
import {TableComponent} from '../../../shared/components/table/table.component';

@Component({
  selector: 'app-country-by-region',
  imports: [
    NgIf,
    SearchComponent,
    TableComponent
  ],
  templateUrl: './by-region.component.html',
  styleUrl: './by-region.component.css',
  standalone: true
})
export class ByRegionComponent {
  readonly headTable : string[] = ['#','Icono','Bandera','Nombre','Capital','Poblacion'];
  readonly bodyTable : WritableSignal<string[][]> = signal<string[][]>([]);

}

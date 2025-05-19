import {Component, signal, WritableSignal} from '@angular/core';
import {NgIf} from '@angular/common';
import {TableComponent} from '../table/table.component';
import type {Country} from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-by-region',
  imports: [
    NgIf,
    TableComponent
  ],
  templateUrl: './by-region.component.html',
  styleUrl: './by-region.component.css',
  standalone: true
})
export class ByRegionComponent {
  readonly headTable : string[] = ['#','Icono','Bandera','Nombre','Capital','Poblacion'];
  readonly bodyTable : WritableSignal<Country[]> = signal<Country[]>([]);

}

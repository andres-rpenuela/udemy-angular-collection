import {Component, effect, input, InputSignal} from '@angular/core';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-shared-table',
  imports: [
    TitleCasePipe
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  standalone: true
})
export class TableComponent {
  readonly headTable : InputSignal<string[]>  = input.required<string[]>()
  readonly bodyTable : InputSignal<string[][]> = input.required<string[][]>();

  constructor() {
    effect(() => {
      console.log('Head:', this.headTable());
      console.log('Body:', this.bodyTable());
    });
  }
}

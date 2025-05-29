import {Component, signal} from '@angular/core';
import {CurrencyPipe, DecimalPipe, LowerCasePipe, PercentPipe, TitleCasePipe, UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-numbers-page',
  imports: [
    LowerCasePipe,
    TitleCasePipe,
    UpperCasePipe,
    DecimalPipe,
    PercentPipe,
    CurrencyPipe
  ],
  templateUrl: './numbers-page.component.html',
  styleUrl: './numbers-page.component.css',
  standalone: true
})
export default class NumbersPageComponent {

  totalSells = signal(2_433_232.5567);
  percent = signal(0.4856);
}

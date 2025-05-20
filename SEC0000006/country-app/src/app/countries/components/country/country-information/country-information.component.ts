import {Component, input} from '@angular/core';
import {Country} from '@interface/country/country.interface';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-country-information',
  imports: [
    DecimalPipe
  ],
  templateUrl: './country-information.component.html',
  styleUrl: './country-information.component.css',
  standalone: true
})
export class CountryInformationComponent {
    countryData = input.required<Country>({});
}

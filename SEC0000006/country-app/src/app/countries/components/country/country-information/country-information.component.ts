import {Component, computed, input} from '@angular/core';
import {Country} from '@interface/country/country.interface';
import {DecimalPipe, UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-country-information',
  imports: [
    DecimalPipe,
    UpperCasePipe
  ],
  templateUrl: './country-information.component.html',
  styleUrl: './country-information.component.css',
  standalone: true
})
export class CountryInformationComponent {
    countryData = input.required<Country>({});

    currentYear = computed( () => {
      return new Date().getFullYear();
    })

}

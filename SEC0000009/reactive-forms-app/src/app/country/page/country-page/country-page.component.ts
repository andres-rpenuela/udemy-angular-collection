import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {CountryService} from '../../services/country.service';
import {Country} from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css',
  standalone: true
})
export class CountryPageComponent {

  private formBuilder = inject(FormBuilder);
  private countryService = inject(CountryService);

  regions = signal( this.countryService.regions );
  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  public myForm : FormGroup = this.formBuilder.group({
    region:['', Validators.required],
    country:['', Validators.required],
    border:['', Validators.required]
  })
}

import {Component, effect, inject, OnDestroy, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {CountryService} from '../../services/country.service';
import {Country} from '../../interfaces/country';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css',
  standalone: true
})
export class CountryPageComponent implements OnDestroy{

  private formBuilder = inject(FormBuilder);
  private countryService = inject(CountryService);

  regions = signal( this.countryService.regions );
  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  // Es un Subject<void> que actúa como notificador de destrucción para todas las suscripciones.
  private destroy$ = new Subject<void>();

  public myForm : FormGroup = this.formBuilder.group({
    region:['', Validators.required],
    country:['', Validators.required],
    border:['', Validators.required]
  })

  // opcion A: Con subcripción (Requiere destrucción
  public formRegionChanged = this.myForm.get('region')!.valueChanges
    .pipe(takeUntil(this.destroy$)) // se cancela o desuscribe automáticamente esa suscripción.
    .subscribe(value =>{
      console.log('Opciona A: '+value);
    });

  // Opcion B: Con señales + efectos (no hace falta usar OnDestroy
  onFormChanged = effect( ( onCleanup ) =>{
    // similiar a la opción A
    const formRegionChanged = this.myForm.get('region')!.valueChanges
      .subscribe(value =>{
        console.log('Opcion B:'+value);
      });

    // Se llama cuando el efecto es destruido
    onCleanup( ()=>{
        formRegionChanged.unsubscribe();
        console.log('Limpiando')
    });
  })

  ngOnDestroy() {
    //  patrón común en Angular para cancelar suscripciones automáticamente cuando el componente se destruye
    this.destroy$.next();     // dispara cancelaciones
    this.destroy$.complete(); // cierra el subject
  }
}

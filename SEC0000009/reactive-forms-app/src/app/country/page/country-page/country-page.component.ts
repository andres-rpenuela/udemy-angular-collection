import {Component, effect, inject, OnDestroy, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {CountryService, REGION} from '../../services/country.service';
import {Country} from '../../interfaces/country';
import {Subject, Subscription, switchMap, takeUntil, tap} from 'rxjs';

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
  // se lanza cuando cambia + cuando se monta
  onFormChanged = effect( ( onCleanup ) =>{
    // similiar a la opción A
    // const formRegionChanged = this.myForm.get('region')!.valueChanges
    //   .subscribe(value =>{
    //     console.log('Opcion B:'+value);
    //   });
    const regionSubscription = this.onRegionChanged();

    // Se llama cuando el efecto es destruido
    onCleanup( ()=>{
        //formRegionChanged.unsubscribe();
      regionSubscription.unsubscribe()
        console.log('Limpiando');
    });
  })

  ngOnDestroy() {
    //  patrón común en Angular para cancelar suscripciones automáticamente cuando el componente se destruye
    this.destroy$.next();     // dispara cancelaciones
    this.destroy$.complete(); // cierra el subject
  }

  private onRegionChanged() : Subscription {

    return this.myForm.get('region')!.valueChanges
      .pipe(
        tap( (region ) => console.log(region) ),
        tap( () => this.myForm.get('country')!.setValue('') ) ,// limpiar el valor
        tap( () => this.myForm.get('border')!.setValue('') ), // limpiar el valor
        tap( () => {
          this.countriesByRegion.set([]);
          this.borders.set([]);
        }),
        // concatena otro observable
        switchMap( region => this.countryService.getCountry(region!))
      )
      .subscribe( (countries: Country[]) => {
          console.log(countries);
          this.countriesByRegion.set(countries);
      })
      // .subscribe(region =>{
      //   // valida la region
      //   const isValidRegion = this.regions().includes(region as REGION);
      //
      //   if (!isValidRegion) {
      //     console.warn('Región inválida:', region);
      //     this.clearCountries();
      //     return;
      //   }
      //
      //   // region ahora se puede usar como REGION
      //   const validRegion = region as REGION;
      //   console.log('Región válida:', validRegion);
      //
      //   // get los paises por region
      //   this.countryService.getCountry(validRegion).subscribe( coutries => console.log(coutries));
      // });
  }

  private clearCountries(){
    this.countriesByRegion.set([]);
    this.borders.set([]);

    this.myForm.patchValue({
      country: '',
      border: ''
    });

  }
}

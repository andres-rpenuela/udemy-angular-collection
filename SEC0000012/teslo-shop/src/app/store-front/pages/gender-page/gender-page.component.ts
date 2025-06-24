import {Component, computed, inject, linkedSignal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs';
import {Gender} from '@products/interfaces/product.interface';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-gender-page',
  imports: [],
  templateUrl: './gender-page.component.html',
  styleUrl: './gender-page.component.css'
})
export default class GenderPageComponent {

  private activatedRoute = inject(ActivatedRoute);

  // read param `gender' of path as signal
  //public gender = toSignal( this.activatedRoute.params.pipe( map( ( { gender }) => gender )) );

  // Convert paramMap observable to signal
  private paramMapSignal = toSignal(this.activatedRoute.paramMap);

  // Create a signal for gender, porque el componente no se destruye, si no el parametro cambia
  public gender = computed(() => this.paramMapSignal()?.get('gender') ??  Gender.Men);

  // Si el valor del parámetro no va a cambiar mientras el componente esté activo
  //public gender = this.activatedRoute.snapshot.params['gender'];

}

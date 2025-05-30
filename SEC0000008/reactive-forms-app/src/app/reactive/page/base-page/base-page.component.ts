import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-base-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './base-page.component.html',
  styleUrl: './base-page.component.css',
  standalone: true
})
export default class BasePageComponent {

  // formulario basico
  // myForm = new FormGroup({
  //   name: new FormControl<string>(''),
  //   price: new FormControl<number>(0),
  //   inStorage: new FormGroup<number>(0)
  // });

  // formBuilder (Servicio)
  private formBuilder = inject(FormBuilder);

  myForm = this.formBuilder.group({
    //name: [''],
    name: ['', /** validaodres sincornos **/, /** validaodres asincronos **/],
    price: [0],
    inStorage: [0]
  });
}

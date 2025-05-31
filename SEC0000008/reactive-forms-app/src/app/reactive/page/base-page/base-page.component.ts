import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormUtils} from '../../../utils/form-utils';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-base-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    TranslatePipe
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

  myForm :FormGroup = this.formBuilder.group({
    //name: [''],
    //name: ['', /** validaodres sincornos **/, /** validaodres asincronos **/],
    name: ['', [Validators.required, Validators.minLength(3)] ],
    price: [0, [Validators.required, Validators.min(10) ] ],
    inStorage: [0, [ Validators.required,Validators.min(0) ] ]
  });

  // migrado a FormUtils.ts
  // public isValidField( fieldName: string):boolean | null {
  //   // requerido usar myForm :FormGorup
  //   // esto obliga pasar de his.myForm.controls.name a his.myForm.controls[ 'name' ]
  //   // ademas no se peude usar [formControl]="myForm.controls.name" ni {{myForm.controls.name.value}}
  //   // si no formControlName="name" y {{myForm.controls['name'].value}}
  //   // y se puede usar lo siguiente:
  //   return ( this.myForm.controls[ fieldName ].errors && this.myForm.controls[ fieldName ].touched );
  // }

  // migrado a FormUtils.ts
  // public getFieldError( fieldName: string ): string | null {
  //   const control = this.myForm.get(fieldName);
  //
  //   // si no existe, es null
  //   if (!control || !control.errors ) return null;
  //
  //   const errors = control.errors;
  //
  //   for( const keyError of Object.keys( errors ) ) {
  //     switch(keyError){
  //       case 'required':
  //         return 'Este campo es requerido';
  //       case 'minlength':
  //         return `Minimo de ${ errors[ 'minlength' ].requiredLength } caracteres`;
  //       case 'min':
  //         return `Minimo de ${ errors[keyError].min} caracteres`;
  //     }
  //   }
  //
  //   return null;
  // }

  public onSave(){

    // si se guarda, y los campos son invalidas
    if( this.myForm.invalid){
      // toca tods los campos para cargar sus errores
      this.myForm.markAllAsTouched();
      // no se envía
      return
    }

    // simula que se envia los datos
    console.table(this.myForm.value);

    // resete el formulario
    // console.log(this.myForm.reset());
    console.log(this.myForm.reset({
      // valoresp or defecto (opcional)
      price: 100,
      inStorage: 50
    }));
  }

  protected readonly FormUtils = FormUtils;
}

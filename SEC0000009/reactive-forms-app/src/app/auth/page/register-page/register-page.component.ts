import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormUtils} from '../../../utils/form-utils';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-register-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    TranslatePipe
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
  standalone: true
})
export class RegisterPageComponent {
  //! Tarea: Crear un formulario y enlanzarlo con el html
  /**
   * name -> obligatorio
   * email -> obligatorio y email
   * username -> obligatorio y min 6 caracteres
   * password -> obligatorio y min 6 caracteres
   * password2 -> obligatorio (confirmPassword, sería un mejor nombre)
   */

  private formBuilder = inject(FormBuilder);


  public myForm :FormGroup = this.formBuilder.group({
    name: ['', [Validators.required,Validators.pattern( FormUtils.namePattern )]],
    email: ['', [Validators.required, Validators.pattern( FormUtils.emailPattern )],[FormUtils.checkingServerResponse]],
    username: ['', [Validators.required,Validators.minLength(6),Validators.pattern( FormUtils.notOnlySpacesPattern )]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
  },
    // validadres sincronos: Opción A, no valida, porque es un array de validaodres no un bojeto de array de validdores
    //[ this.equalStringFields('password','password2') ]
    // validadres sincronos: Opción B, valida, porque el segundo argumento se pasa correctamente como objeto que reconoce angular
    {
      validators: [ FormUtils.equalStringFields('password','password2')],
    }
  );

  public onSubmit(){
    console.log(this.myForm);

    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    throw new Error('Method not implemented.');
  }

  protected readonly FormUtils = FormUtils;

  // validador, return una funcion
  // public equalStringFields(fieldOne :string, fieldTwo :string){
  //   return ( formGroup : AbstractControl ) => {
  //     const source = formGroup.get(fieldOne)?.value;
  //     const target = formGroup.get(fieldTwo)?.value;
  //
  //     if( source == target){
  //       return null;
  //     }
  //
  //     return {
  //       equalStringFields : {
  //          fieldsEquals: false,
  //          targetField : fieldTwo,
  //          sourceField : fieldOne,
  //       }
  //     };
  //
  //   }
  // }
}

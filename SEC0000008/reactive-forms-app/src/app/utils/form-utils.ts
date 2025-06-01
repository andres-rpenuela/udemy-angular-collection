import {FormArray, FormGroup} from '@angular/forms';

export class FormUtils {

  /**
   * Verifica si un campo de formulario es válido.
   *
   * Condiciones:
   * 1. El control existe.
   * 2. El control no ha sido tocado (False si no ha sido tocado, true si lo ha sido)
   * 3. El control es válido (no tiene errores).
   *
   * @param form - Formulario reactivo (FormGroup)
   * @param fieldName - Nombre del campo a evaluar
   * @returns `true` si el campo es válido y aún no ha sido tocado, de lo contrario `false`
   */
  public static isValidField(form: FormGroup, fieldName: string): boolean {
    console.log('Validando el campo: ',fieldName)
    const control = form.get(fieldName);

    return !!control && control.touched && control.valid;
  }

  public static isNonValidField(form: FormGroup, fieldName: string){
    console.log('Validando el campo: ',fieldName)
    const control = form.get(fieldName);

    return !!control && control.touched && control.invalid;
  }

  public static isValidFieldArray(form: FormArray, index: number){
    return !form.controls[index].errors && form.controls[index].touched;
  }

  public static isNonValidFieldArray(form: FormArray, index: number){
    return form.controls[index].errors && form.controls[index].touched;
  }

  public static getFieldError(form: FormGroup, fieldName: string): [string, any?] | null  {
    console.log('Obteniendo el error del campo: ',fieldName)
    const control =  form.get(fieldName);

    // con !control devuelve "true" si control es null, undefiend, false, 0, o Nan o '', valor de control si existe
    // con !!control devuelve true o false, no el valor original
    if( !control || !control.errors ){// el control no existe o no tiene errores
      return null;
    }

    const errors = control.errors;

    for( const keyError of Object.keys( errors ) ) {
      switch(keyError){
        case 'required':
          return ['form.errors.required'];

        case 'minlength':
          return ['form.errors.minlength', { requiredLength: errors['minlength'].requiredLength }];

        case 'maxlength':
          return ['form.errors.maxlength', { requiredLength: errors['maxlength'].requiredLength }];

        case 'min':
          return ['form.errors.min', { min: errors['min'].min }];

        case 'max':
          return ['form.errors.max', { max: errors['max'].max }];

        case 'email':
          return ['form.errors.email'];
      }
    }
    // for( const keyError of Object.keys( errors ) ) {
    //   switch(keyError){
    //     case 'required':
    //       return ['error.required']
    //      // return [`${fieldName}.required`];
    //     case 'minlength':
    //       return [`${fieldName}.minlength`,errors[ 'minlength' ].requiredLength];
    //       //return `Minimo de ${ errors[ 'minlength' ].requiredLength } caracteres`;
    //     case 'min':
    //       return [`${fieldName}.min`,errors[ keyError ].min];
    //       // return `Minimo de ${ errors[keyError].min} caracteres`;
    //   }
    // }

    return null;

  }


  public static getFieldErrorArray( form: FormArray, index: number ): [string, any?] | null {
    const control =  form.controls[index];

    if( !control || !control.errors ){ return null;}

    const errors = control.errors;

    for( const keyError of Object.keys( errors ) ) {
      switch(keyError){
        case 'required':
          return ['form.errors.required'];

        case 'minlength':
          return ['form.errors.minlength', { requiredLength: errors['minlength'].requiredLength }];

        case 'maxlength':
          return ['form.errors.maxlength', { requiredLength: errors['maxlength'].requiredLength }];

        case 'min':
          return ['form.errors.min', { min: errors['min'].min }];

        case 'max':
          return ['form.errors.max', { max: errors['max'].max }];

        case 'email':
          return ['form.errors.email'];
      }
    }

    return null;
  }
}

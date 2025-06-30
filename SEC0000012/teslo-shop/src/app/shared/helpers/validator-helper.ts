import {AbstractControl, FormGroup} from '@angular/forms';

export type ERRORS_KEY  = 'required' | 'email' | 'minlength' | 'maxlength' | 'pattern';
export enum ERRORS_KEY_ENUM {'required', 'email', 'minlength', 'maxlength', 'pattern'};

export class ValidatorHelper {

  public static isValidForm(formGroup : FormGroup): boolean {
    console.log(`isValidForm...}`);

    return  formGroup.invalid
  }

  public static isValidFieldForm(formGroup : FormGroup, fieldName : string ): boolean {
    console.log(`isValidFieldForm... ${fieldName} }`);
    const control: AbstractControl<any,any> | null = formGroup.get(fieldName);

    // !!control -> Convierte null o undefined a false, y cualquier otro valor a true
    return !!control && control.touched && control.valid;
  }

  public static isNonValidFieldForm(form: FormGroup, fieldName: string){
    console.log('Validando el campo: ',fieldName)
    const control = form.get(fieldName);

    return !!control && control.touched && control.invalid;
  }

  public static getFirstMessagesError(formGroup: FormGroup, fieldName: string) : string | null {
    console.log(`getMessageError... ${fieldName} }`);
    const control: AbstractControl<any, any> | null = formGroup.get(fieldName);

    // Si el control no tiene errores, no hay mensaje de error
    if (!control || !control.errors) {
      return null;
    }

    const keys = Object.keys(control.errors) as (keyof typeof control.errors)[];

    const err : string =  Object.keys(control.errors)[0] ;
    return this.getMessage(err, control);

  }

  public static getMessagesError(formGroup: FormGroup, fieldName: string) : string[] | null {
    console.log(`getMessageError... ${fieldName} }`);
    const control: AbstractControl<any, any> | null = formGroup.get(fieldName);

    // Si el control no tiene errores, no hay mensaje de error
    if (!control || !control.errors) {
      return null;
    }

    const keys = Object.keys(control.errors) as (keyof typeof control.errors)[];
    return keys.map(key => {
      //const err = control.errors![key];
      return this.getMessage(key, control);
    });
  }

  private static getMessage(key: string | number, control: AbstractControl<any, any>) {
    switch (key) {
      case 'required':
        return 'Este campo es obligatorio.';
      case 'email':
        return 'Formato de email inválido.';
      case 'minlength': {
        // const e = err as { requiredLength: number; actualLength: number };
        const e = control.errors![key] as { requiredLength: number; actualLength: number };

        return `Mínimo ${e.requiredLength} caracteres (tienes ${e.actualLength}).`;
      }
      case 'maxlength': {
        // const e = err as { requiredLength: number; actualLength: number };
        const e = control.errors![key] as { requiredLength: number; actualLength: number };

        return `Máximo ${e.requiredLength} caracteres (tienes ${e.actualLength}).`;
      }
      case 'pattern':
        return 'No cumple el patrón requerido.';
      case 'forbiddenName':
        //console.log(control.errors!['forbiddenName'])
        return `${control.errors!['forbiddenName'].actualValue} no permitido.`;
      default:
        return `Error de validación: ${key}`;
    }
  }
}

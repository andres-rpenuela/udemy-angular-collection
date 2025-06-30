
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function onlyLettersValidator(): ValidatorFn {
  const regex = /^[a-zA-Z]+$/;
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value ?? '';
    const valid = regex.test(value);
    return valid ? null : { onlyLetters: { actualValue: value, message: 'Solo se permiten letras A‑Z' } };
  };
}

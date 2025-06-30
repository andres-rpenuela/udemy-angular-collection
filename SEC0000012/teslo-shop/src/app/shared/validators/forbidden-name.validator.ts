import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function forbiddenNameValidator(forbiddenNames: string[]): ValidatorFn {
  if (!Array.isArray(forbiddenNames) || forbiddenNames.length === 0) {
    throw new Error('El array de nombres prohibidos no puede estar vacío');
  }

  // Escapa cada nombre para que no rompa la expresión regular
  const escapedNames = forbiddenNames.map(name =>
    name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );

  // Crea un regex que busque cualquiera de los nombres (con coincidencia exacta)
  const nameRe = new RegExp(`^(${escapedNames.join('|')})$`, 'i');

  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value?.toString().trim() ?? '';
    if (value === '') return null; // no validamos cadenas vacías

    const forbidden = nameRe.test(value);
    return forbidden
      ? {
        forbiddenName: {
          actualValue: value,
          forbiddenNames
        }
      }
      : null;
  };
}

import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const pass = group.get('password')?.value;
  const confirm = group.get('password2')?.value;
  return pass && confirm && pass !== confirm
    ? { passwordsMismatch: true }
    : null;
}

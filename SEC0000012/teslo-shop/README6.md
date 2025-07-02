# Validadores

## índice
1. [Validadores](#validadores)
   1. [Validadores síncronos a nivel de FormControl](#validadores-síncronos-a-nivel-de-form-control)
      1. [Básico](#básico)
      2. [Con parámetros el validador](#con-parámetros-el-validador)
   3. [Validador síncrono a nivel de FormGroup](#validador-síncrono-a-nivel-de-formulario-form-group)
   3. [Validadores asíncronos a nivel de FormControl](#validadores-asíncronos-a-nivel-de-form-control)
2. [Mostrar errores de validación](#mostrar-errores-de-validaci%C3%B3n)

---


### Validadores síncronos a nivel de FormControl

#### Básico
```typescript
// src/app/validators/only-letters.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function onlyLettersValidator(): ValidatorFn {
  const regex = /^[a-zA-Z]+$/;
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value ?? '';
    const valid = regex.test(value);
    return valid
      ? null
      : { onlyLetters: { actualValue: value, message: 'Solo se permiten letras A‑Z' } };
  };
}
```
#### Con pámetros el validador
```typescript
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function forbiddenNameValidator(forbiddenNames: string[]): ValidatorFn {
  if (!Array.isArray(forbiddenNames) || forbiddenNames.length === 0) {
    throw new Error('El array de nombres prohibidos no puede estar vacío');
  }

  // Escapa cada nombre para que no rompa la expresión regular
  const escapedNames = forbiddenNames.map(name =>
    name.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')
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
```

```typescript
this.form = this.fb.group({
  username: [
    '',
    [
      Validators.required,
      forbiddenNameValidator(['admin', 'superuser', 'root'])
    ]
  ]
});
```

### Validador síncrono a nivel de formulario (FormGroup)

```typescript
// src/app/validators/password-match.validator.ts
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const pass = group.get('password')?.value;
  const confirm = group.get('password2')?.value;
  return pass && confirm && pass !== confirm
    ? { passwordsMismatch: true }
    : null;
}
```

```typescript
this.registerForm = this.fb.group({
  password: ['', [Validators.required]],
  confirmPassword: ['', [Validators.required]]
}, { validators: passwordMatchValidator });
```

### Validadores asíncronos a nivel de FormControl

```typescript
// src/app/validators/unique-username.validator.ts
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { map, catchError, of, timer, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * Servicio para la comprobación de usuario.
 */
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  /** Llama al backend y devuelve true si ya existe el username */
  checkUsernameExists(username: string) {
    return this.http
      .get<{ exists: boolean }>(`/api/users/exists/${username}`)
      .pipe(map(resp => resp.exists));
  }
}

/**
 * AsyncValidatorFn que comprueba unicidad de username con debounce.
 */
export function uniqueUsernameValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const username = control.value?.toString().trim();
    if (!username) {
      // Si está vacío, no lanzamos error de unicidad
      return of(null);
    }

    // Esperamos 500ms de “debounce” antes de llamar al servidor
    return timer(500).pipe(
      switchMap(() =>
        userService.checkUsernameExists(username).pipe(
          map(exists => (exists ? { usernameTaken: true } : null)),
          catchError(() => of(null)) // en caso de fallo de red, no bloqueamos al usuario
        )
      )
    );
  };
}
```

Uso del validador en un formulario:

```typescript
// en tu componente…
import { FormBuilder, Validators } from '@angular/forms';
import { uniqueUsernameValidator, UserService } from './validators/unique-username.validator';

@Component({ /* … */ })
export class RegisterComponent {
  registerForm = this.fb.group({
    username: [
      '',
      {
        validators: [Validators.required, Validators.minLength(4)],
        asyncValidators: [uniqueUsernameValidator(this.userService)],
        updateOn: 'blur'   // comprueba al perder el foco
      }
    ],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, private userService: UserService) {}
}
```

## Comprobar errores + mensajes

```typescript
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
```
## Mostrar errores de validación

```html
<form class="space-y-4 w-full max-w-md mx-auto mt-10" [formGroup]="registerForm" (ngSubmit)="onSubmit()">

  <!-- Nombre de usuario -->
  <div class="mt-1 space-y-1">
    <label class="input input-bordered flex items-center gap-2">
      <svg class="h-[1em] w-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none"
           viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5.121 17.804A9.001 9.001 0 0112 15c2.21 0 4.22.805 5.879 2.137M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <input type="text" placeholder="Username" class="grow" required formControlName="name"/>
      @if( registerForm.get('name')?.invalid && registerForm.get('name')?.touched) {
      <small class="text-red-500">Username is required</small>
      }
    </label>
    <!--  @if(  !validatorHelper.isValidFieldForm(registerForm,'name') && !registerForm.untouched ) {-->
    @if(  validatorHelper.isNonValidFieldForm(registerForm,'name') ) {
    <div class="alert alert-error flex flex-col space-y-1 items-right gap-1">
      @for (msg of validatorHelper.getMessagesError(registerForm,'name'); track $index) {
      <p class="text-black-500 block" > {{ msg }} </p>
      }
    </div>
    }
  </div>
  <!-- Email -->
  <label class="input input-bordered flex items-center gap-2">
    <svg class="h-[1em] w-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M16 12l-4-4-4 4m0 0l4 4m-4-4h8" />
    </svg>
    <input type="email" placeholder="Email" class="grow" required formControlName="email"/>
    @if( registerForm.get('email')?.invalid && registerForm.get('email')?.touched) {
    <small class="text-red-500"> {{ validatorHelper.getFirstMessagesError(registerForm,'email') }} </small>
    <!--      <small class="text-red-500"> {{ registerForm.get('email')?.errors?.['email'] }} </small>-->
    }
  </label>


  <!-- Contraseña -->
  <label class="input input-bordered flex items-center gap-2">
    <svg class="h-[1em] w-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 15v2m0 4h.01M17 8a5 5 0 00-10 0v4H5a2 2 0 002 2h10a2 2 0 002-2h-2V8z" />
    </svg>
    <input type="password" placeholder="Password" class="grow" required formControlName="password"/>
    @if( registerForm.get('password')?.invalid && registerForm.get('password')?.touched) {
    <small class="text-red-500"> {{ validatorHelper.getFirstMessagesError(registerForm,'password') }} </small>
    <!--      <small class="text-red-500"> {{ registerForm.get('email')?.errors?.['email'] }} </small>-->
    }
  </label>

  <!-- Confirmar Contraseña -->
  <label class="input input-bordered flex items-center gap-2">
    <svg class="h-[1em] w-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 15v2m0 4h.01M17 8a5 5 0 00-10 0v4H5a2 2 0 002 2h10a2 2 0 002-2h-2V8z" />
    </svg>
    <input type="password" placeholder="Confirm Password" class="grow" required formControlName="password2"/>
    @if( registerForm.get('password2')?.invalid && registerForm.get('password2')?.touched) {
    <small class="text-red-500"> {{ validatorHelper.getFirstMessagesError(registerForm,'password2') }} </small>
    <!--      <small class="text-red-500"> {{ registerForm.get('email')?.errors?.['email'] }} </small>-->
    }
  </label>
  <small class="text-red-500">{{ registerForm.errors?.['passwordsNotMatch'] }}</small>

  <!-- After the two password inputs -->
  @if(registerForm.errors?.['passwordsMismatch']
  && (registerForm.touched || registerForm.dirty)) {
  <div class="text-red-500 mt-1">
    Las contraseñas no coinciden.
  </div>
  }


  <!-- Botón -->
  <button type="submit" class="btn btn-primary w-full"
          [ngClass]="{'opacity-50 pointer-events-none cursor-not-allowed': registerForm.invalid }"
  >
    Create Account
  </button>

  <!-- Link alternativo -->
  <div class="text-center text-sm text-gray-500 mt-2">
    Already have an account? <a routerLink="/auth" class="link">Login</a>
  </div>
</form>
{{ registerForm }}

```

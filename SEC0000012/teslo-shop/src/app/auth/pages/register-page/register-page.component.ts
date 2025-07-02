import {Component, inject, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {onlyLettersValidator} from '@shared/validators/only-letters.validator';
import {passwordMatchValidator} from '@shared/validators/password-match.validator';
import {forbiddenNameValidator} from '@shared/validators/forbidden-name.validator';
import {AuthService} from '@auth/services/auth.service';
import {ValidatorHelper} from '@shared/helpers/validator-helper';
import {NgClass, NgIf} from '@angular/common';
import {take} from 'rxjs';

@Component({
  selector: 'app-register-page',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {


  private fm = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  protected validatorHelper : typeof ValidatorHelper = ValidatorHelper
  protected hasError = signal(false);

  protected registerForm = this.fm.group({
    name: ['',[Validators.required, Validators.minLength(3), onlyLettersValidator(), forbiddenNameValidator(['admin', 'superuser', 'root']) ] ],
    email: ['',[Validators.required, Validators.email]],
    //   La contraseña debe tener al menos una mayúscula, una minúscula y un número.
    password: ['',[Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)] ],
    password2: ['',[Validators.required, Validators.minLength(6)]]
  }, { validators: passwordMatchValidator });

  protected onSubmit(): void {
    console.log('Form submitted', this.registerForm.value);

    const user = this.buildUserAndRegister();

    this.authService.register( user )
      .pipe(
        take(1)
      )
      .subscribe(
        resp => {
          console.log("Respuesta registro: "+resp);
          if( resp ){
            this.router.navigateByUrl('/', { replaceUrl: true });

            return;
          }

          this.hasError.set(true);
          // muestra un error durante un tiempo
          setTimeout(() =>{
            this.hasError.set(false);
          },2000);
        },
        err => {
          console.error("Error en el registro: "+err);
          // Manejo de errores, si es necesario
          return false;
        }
      )
  }

  public getEmailError(nameField : string): string | null {
    const errors = this.registerForm.get(nameField)?.errors;
    if (!errors) return null;

    if (errors['required']) return 'El email es obligatorio.';
    if (errors['email'])    return 'Formato de email inválido.';

    return 'Email no válido';
  }

  private buildUserAndRegister() {
    const {name ='', email='', password=''} = this.registerForm.value;

    return {
      fullName: name!.trim(),
      email: email!.trim(),
      password: password!.trim()
    };
  }
}

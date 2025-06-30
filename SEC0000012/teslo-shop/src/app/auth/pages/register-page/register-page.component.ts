import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {onlyLettersValidator} from '@shared/validators/only-letters.validator';
import {passwordMatchValidator} from '@shared/validators/password-match.validator';
import {forbiddenNameValidator} from '@shared/validators/forbidden-name.validator';
import {AuthService} from '@auth/services/auth.service';
import {ValidatorHelper} from '@shared/helpers/validator-helper';
import {NgClass, NgIf} from '@angular/common';

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
  protected validatorHelper : typeof ValidatorHelper = ValidatorHelper

  protected registerForm = this.fm.group({
    name: ['',[Validators.required, Validators.minLength(3), onlyLettersValidator(), forbiddenNameValidator(['admin', 'superuser', 'root']) ] ],
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(6)] ],
    password2: ['',[Validators.required, Validators.minLength(6)]]
  }, { validators: passwordMatchValidator });

  protected onSubmit(): void {
    console.log('Form submitted', this.registerForm.value);
  }

  public getEmailError(nameField : string): string | null {
    const errors = this.registerForm.get(nameField)?.errors;
    if (!errors) return null;

    if (errors['required']) return 'El email es obligatorio.';
    if (errors['email'])    return 'Formato de email inválido.';

    return 'Email no válido';
  }
}

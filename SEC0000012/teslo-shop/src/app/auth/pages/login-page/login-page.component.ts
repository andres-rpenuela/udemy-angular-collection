import {Component, inject, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private fb = inject(FormBuilder);
  public hasError = signal(false);
  public isPosting = signal(false);

  public loginForm = this.fb.group({
    email: ['',[ Validators.required, Validators.email ] ],
    password: ['',[ Validators.required, Validators.minLength(6) ]]
  });

  public onSubmit(){
    console.log('onSubmit')
    if( this.loginForm.invalid){
      this.hasError.set(true);
      // muestra un error durante un tiempo
      setTimeout(() =>{
        this.hasError.set(false)
      },2000);
      return;
    }

    const {email = '', password= ''} = this.loginForm.value;
    console.log(this.loginForm.value);
    console.log({email, password});
  }
}

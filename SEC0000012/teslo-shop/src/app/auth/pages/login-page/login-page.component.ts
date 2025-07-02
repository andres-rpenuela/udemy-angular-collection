import {Component, inject, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '@auth/services/auth.service';
import {UserLogin} from '@auth/interfaces/user-request.interface';
import {delay, finalize, take} from 'rxjs';

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
  private router = inject(Router);

  public hasError = signal(false);
  public isPosting = signal(false);

  public isLoading = signal(false);

  private authService = inject(AuthService);

  public loginForm = this.fb.group({
    email: ['',[ Validators.required, Validators.email ] ],
    password: ['',[ Validators.required, Validators.minLength(6) ]]
  });

  public onSubmit(){
    console.log('onSubmit');
    this.isLoading.set(true);

    if( this.loginForm.invalid ){
      this.hasError.set(true);
      // muestra un error durante un tiempo
      setTimeout(() =>{
        this.hasError.set(false);
        this.isLoading.set(false);
      },2000);
      return;
    }

    const {email = '', password= ''} = this.loginForm.value;
    console.log(this.loginForm.value);
    console.log({email, password});

    const userLogin: UserLogin= {email:email!, password:password!}
    this.authService.login(userLogin)
      .pipe(
        delay(500),
        finalize(() => this.isLoading.set(false) ),
        take(1))    // se desuscribe tras el primer «next»
      .subscribe({
        next: resp => {
          console.log("Respuesta subcripcion: "+resp);
          if( resp ){
            this.router.navigateByUrl('/');

            // redirecciona si el login es correcto y elimina el historal (opcion reomendad, si no hay guards)
            //this.router.navigateByUrl('/',{ replaceUrl:true });

            return;
          }

          this.hasError.set(true);
          // muestra un error durante un tiempo
          setTimeout(() =>{
            this.hasError.set(false);
          },2000);

        },
        error: err => {
          console.log("Respuesta error subcripcion: "+err);
        }
      });
  }
}

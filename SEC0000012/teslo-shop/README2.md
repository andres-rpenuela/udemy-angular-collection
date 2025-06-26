# Autenticacion + Autorización

>_Nota_: El Layout, es un componente basico que va a contener el `roter-outlet`, paara mostrar las rutas (paginas) hijas.

## Rutas y paginas de autenticacion

Rutas de `auth.routes.ts`:

```typescript
import {Routes} from '@angular/router';
import {AuthLayoutComponent} from '@auth/layout/auth-layout/auth-layout.component';


export const authRoutes:Routes = [
  {
    path: '',
    title: 'Authentication Layou',
    component: AuthLayoutComponent,
    children: [ // Load lazy
      {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./pages/login-page/login-page.component').then(m => m.LoginPageComponent)
      },
      {
        path: 'register',
        title: 'Register',
        loadComponent: () => import('./pages/register-page/register-page.component').then(m => m.RegisterPageComponent)
      },
      {
        path:'**',
        redirectTo:'login'
      }
    ]
  }
];
// facilita su importacion como rutas hijas
export default authRoutes;
```

Cargar rutas en `app.roters.ts`

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // Carga perezosa, de routas hijas
    path: 'auth',
    title: 'Auth',
    loadChildren: () => import('./auth/auth.router')
    // TODO Guards
  },
  {
    // Carga perezosa, de routas hijas
    path: '',
    title: 'Store',
    loadChildren: () => import('./store-front/store-front.routes')
  }
];
```
## Formulario reactivo de authenticacion

```typescript
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
```

```angular181html
<form class="space-y-4 w-full max-w-sm mx-auto mt-10" [formGroup]="loginForm" (ngSubmit)="onSubmit()">

  <!-- Username or Email -->
  <label class="input input-bordered flex items-center gap-2">
    <input type="text" class="grow" placeholder="Username or email" required
           formControlName="email"/>
  </label>

  <!-- Password -->
  <label class="input input-bordered flex items-center gap-2">
    <input type="password" class="grow" placeholder="Password" required
           formControlName="password"/>
  </label>

  <!-- Submit button -->
  <button class="btn btn-primary w-full" type="submit">
    Login
  </button>

  @if(this.hasError()){
    <div role="alert" class="alert alert-error animate-wiggle fixed bottom-5 right-5 w-52">
      <span>Por favor, revise la información.</span>
    </div>
  }
  <!-- Links -->
  <div class="text-center text-sm text-gray-500 mt-2">
    <a href="#" class="link">Forgot password?</a> · <a routerLink="/auth/register" class="link">Sign up</a>
  </div>
</form>
```
## Servicio de autenticacion

### Menjo de excepciones

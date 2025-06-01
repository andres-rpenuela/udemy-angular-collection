# ReactiveFormsApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

--


## Rutas angualar 19+

```typescript
// auth.routes.ts
export const authRoutes : Routes = [
  {
    path: '',
    children: [
      {
        path: 'sign-up',
        component: RegisterPageComponent
      },
      {
        path: '**',
        redirectTo: 'sign-up'
      }
    ]
  }
];

export default authRoutes;
```

```typescript
// country.routes.ts
export const countryRoutes : Routes = [
  {
    path: '',
    component: CountryPageComponent
  }
]
```

```typescript
// reactyve.routes.ts
export const reactiveRoutes : Routes = [
  {
    path: '',
    children: [ // load lazy
      { // component as default
        path: 'basic',
        title: 'Básicos',
        loadComponent: () => import('./page/base-page/base-page.component')
      },
      { // component as NON default
        path: 'dinamyc',
        title: 'Dinámicos',
        loadComponent: () => import('./page/dinamyc-page/dinamyc-page.component').then(m => m.DinamycPageComponent)
      },
      { // component as default
        path: 'swith',
        title: 'Swithes',
        loadComponent: () => import('./page/switches-page/switches-page.component')
      },
      { // si no es ninguna de la anterior, redirecciona
        path: '**',
        redirectTo: 'basic'
      }
    ]
  }
]
```


```typescript
// app.routes.ts

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      { // load lazy of routes, about default routes
        path: 'auth',
        loadChildren: () => import('./auth/auth.router')
      },
      { // load lazy of routes, about not default rotues
        path: 'reactive',
        loadChildren: () => import('./reactive/reactive.router').then( (module) => module.reactiveRoutes)
      },
      { // load lazy of routes, about not default rotues
        path: 'country',
        loadChildren: () => import('./country/country.router').then( (module) => module.countryRoutes)
      },
      {
        path:'**',
        redirectTo: 'reactive'
      }
    ]
  },
  {
    path:'**',
    redirectTo: 'reactive/basic'
  }
];
```

```typescript
// app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideRouter(routes)
  ]
};
```

---

# Generar link de las rutas

```typescript
// menu-intem.interface.ts
export interface MenuItem {
  title: string;
  route: string;
}
```

```typescript
// routes.data.ts
import {reactiveRoutes} from '../../reactive/reactive.router';
import {Routes} from '@angular/router';

export const reactiveItems : Routes = reactiveRoutes[0].children ?? [];
```

```typescript
// side-menu.component.ts
import {Component} from '@angular/core';
import {MenuItem} from '../../interfaces/menu-item.interface';
import {reactiveItems} from '../../data/routes.data';
import {RouterLink, RouterLinkActive} from '@angular/router';


@Component({
  selector: 'app-side-menu',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
  standalone: true
})
export class SideMenuComponent {
  // se genera el menu de items de reactive
  reactiveMenuItems: MenuItem[] = reactiveItems
    .filter( item => !item.path?.includes('**'))
    .map(item => ({
        title:`${item.title}`,
        route:`reactive/${item.path}`
      })
    );

  countryMenuItems: MenuItem[] = [
    {
      title: 'Country',
      route: `./country`
    }
  ];
}
```

```angular181html
<!-- side-menu.component.html -->
<h2>Páginas</h2>
<hr>

<h3 class="mt-3">Reactive Forms</h3>
<ul class="list-group">
  @for( item of reactiveMenuItems; track item.title){
    <li class="list-group-item"
        [routerLink]="item.route"
        routerLinkActive="active">
      {{ item.title }}
    </li>
  }
</ul>

<h3 class="mt-3">Country</h3>
<ul class="list-group">
  @for( item of countryMenuItems; track item.title){
    <li class="list-group-item"
        [routerLink]="item.route"
        routerLinkActive="active">
      {{ item.title }}
    </li>
  }
</ul>
```

--

# Traducir mensajes con Translate (Pipe transalte) y Http-Loader  + Cambio de idoma de la Aplicacion 

Objetivo:
```angular181html
<!-- traduccir mensajes -->
{{ 'WELCOME_MESSAGE' | translate }}
```

>**Nota**;
> 1. Para ver los efectos del cambio de idoma de la aplicacion es requerido hacer recarga de la pagina 
> 2. Para ver los efectos de "translate", no hace falta aplicar recarga de la pagina, es una peticio http+loader
> 3. No confundir con I18nSelectPipe e i18nPluralPipe.

Instalar:
```shell
npm install @ngx-translate/core @ngx-translate/http-loader
```

Archivos de traducción
```json
// public/i18n/en.json
{
  "WELCOME_MESSAGE": "Welcome",
  "THANK_YOU": "Thank you for using our app."
}
```

```json
// public/i18n/es.json
{
  "WELCOME_MESSAGE": "Bienvenido",
  "THANK_YOU": "Gracias por usar nuestra aplicación."
}
```
Carga de la configuracion
```typescript
import { routes } from './app.routes';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// registrar idiomas
import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import localeEn from '@angular/common/locales/en';
import {LocaleService} from './shared/services/locale.service';

registerLocaleData(localeEs, 'es' );
registerLocaleData(localeFr, 'fr' );
registerLocaleData(localeEn, 'en' );

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideRouter(routes),
    // traducto con pipe
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => new TranslateHttpLoader(http, 'i18n/', '.json'),
          deps: [HttpClient]
        }
      })
    ),
    // selecionar idoma por defecto, por fecto es el ingles
    {
      provide: LOCALE_ID,
      //useValue: 'es'
      deps: [LocaleService],
      useFactory: (localService : LocaleService) => localService.getLocale()
    }
  ]
};
```

Se defien un tipado de idiomas

```typescript
export type Locale = 'ES' | 'FR' | 'EN';

export const LOCALE_ES: Locale = 'ES';
export const LOCALE_FR: Locale = 'FR';
export const LOCALE_EN: Locale = 'EN';

export const LOCALES: Locale[] = ['ES', 'FR', 'EN'];

export function getValidLocale(localeStr: string | null ): Locale | null {
  if (LOCALES.includes(localeStr as Locale)) {
    return localeStr as Locale;
  }
  return null;
}
```


Servicio para cambiar el idoma (cambio de iodma de la aplicaicon + uso del serivcio translate instalado)

```typescript
import {effect, Injectable, signal} from '@angular/core';
import {getValidLocale, Locale, LOCALE_EN, LOCALE_ES} from '../types/locale.type';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  private readonly currentLocaleSng = signal<Locale>(LOCALE_ES);

  constructor(private translate: TranslateService) {
    // get locale
    const localeMaybe: string | null = localStorage.getItem('locale');
    const validLocale = getValidLocale(localeMaybe) ?? LOCALE_ES;
    this.currentLocaleSng.set( validLocale );

    // uso del tranlate instalado
    this.translate.addLangs([LOCALE_EN.toString().toLowerCase(), LOCALE_ES.toString().toLowerCase()]);
    this.translate.setDefaultLang(validLocale.toString().toLowerCase() );

    effect(() => { // cada vez que cambie el idioma cambia
      this.translate.use(this.currentLocaleSng().toString().toLowerCase());
    });

  }

  public getLocale(): Locale {
    return this.currentLocaleSng();
  }

  public changeLocale(locale: Locale): void {
    // set locale + updated
    localStorage.setItem('locale',locale);
    this.currentLocaleSng.set(locale); // invoca al effecto

    // reload (para que carge el nuevo idomoa, opcional)
    (window as Window).location.reload();
  }
}
```

En el app.component.html, se usa el pipe 'translate'
```angular181html
<div class="row mt-5">
  <hr>
  <h1>{{ 'WELCOME_MESSAGE' | translate }}</h1>
  <p>{{ 'THANK_YOU' | translate }}</p>
  <p>{{ 90999999.29 | number }}</p>
  <hr>
  <div class="col">
    <router-outlet></router-outlet>
  </div>

  <div class="col-12 col-sm-4">
    <app-side-menu></app-side-menu>

  </div>
</div>
```

En el side-menu, se agregan los botntes para cambiar los idiomas

```angular181html
<hr>

<button (click)="switchLang(LOCALE_EN)">English</button>
<button (click)="switchLang(LOCALE_ES)">Español</button>
```

```typescript
private localeService = inject(LocaleService);

switchLang(locale:Locale){
  this.localeService.changeLocale(locale);
}
```

---

# Formulario reactivo básico

En normal, sin usar formulario reactivo, se puede usar ChildView o referencia aun elemento html

```angular181html
<!-- ejemplo de acceder al valor en Angular de un input, sin formulario reactivo -->
<input type="text"
       class="form-control"
       placeholder="Nombre del producto"
       #inputName>

<p>Valor introducido: {{inputName.value()}}</p>
```
Crear un formulario en el controlador

```typescript
@Component({
  selector: 'app-base-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './base-page.component.html',
  styleUrl: './base-page.component.css',
  standalone: true
})
export default class BasePageComponent {

  // formulario basico
  myForm = new FormGroup({
    name: new FormControl<string>(''),
    price: new FormControl<number>(0),
    inStorage: new FormGroup<boolean>(false)
  });
}
```

Enlazar los valores
* [formGroup]
* [formControl] o formControlName

```angular181html
 <form autocomplete="off" [formGroup]="myForm">

  <!-- Campo de producto -->
  <div class="mb-3 row">
    <label class="col-sm-3 col-form-label">Producto</label>
    <div class="col-sm-9">

      <input type="text"
             class="form-control"
             placeholder="Nombre del producto"
             [formControl]="myForm.controls.name">
    </div>
  </div>

  <!-- Campo de producto -->
  <div class="mb-3 row">
    <label class="col-sm-3 col-form-label">Precio</label>
    <div class="col-sm-9">
      <input type="number"
             class="form-control"
             placeholder="Precio del producto"
             formControlName="price">
    </div>
  </div>

  <!-- Campo de existencias -->
  <div class="mb-3 row">
    <label class="col-sm-3 col-form-label">Existencias</label>
    <div class="col-sm-9">
      <input type="number"
             class="form-control"
             placeholder="Existencias del producto"
             formControlName="inStorage">
    </div>
  </div>
<!-- ... -->
```

Propieades del formulario reactivo basico útiles:

```angular181html
<!-- true:: si el formulario es valido -->
<span>Valid</span>
<pre>{{ myForm.valid | json }}</pre>

<!-- true:: indica si se ha tocado el formulario desde el momento  que se sirvio al usuario-->
<span>Pristine</span>
<pre>{{ myForm.pristine | json }}</pre>

<!-- true:: indica que el usuario no a tocado el formulario-->
<span>Touched</span>
<pre>{{ myForm.touched | json }}</pre>

<!-- valores de todos los campos del formuario -->
<span>Value</span>
<pre>{{ myForm.value | json }}</pre>

<!-- campos del form -->
<span>Precio</span>
<pre>{{ myForm.controls['price'].value| json }}</pre>

<span>Producto</span>
<pre>{{ myForm.controls.name.value | json }}</pre>

```

-- 
# Form Build 
Simplifica la construccion de objetos FormGroup y FormControl.

*  Form Reactivo basico 
```typescript
// formBuilder (Servicio)
private formBuilder = inject(FormBuilder);

myForm = this.formBuilder.group({
  name: ['', /** validaodres sincornos **/, /** validaodres asincronos **/],
  price: [0],
  inStorage: [0]
});
```
## Validadores

Angular por defecto provee validadores sincronos, que se pueden usar como un array

```typescript
myForm = this.formBuilder.group({
  //name: [''],
  //name: ['', /** validaodres sincornos **/, /** validaodres asincronos **/],
  name: ['', [Validators.required, Validators.minLength(3)] ],
  price: [0, [Validators.required, Validators.min(10) ] ],
  inStorage: [0, [ Validators.required,Validators.min(0) ] ]
});
```
Mostrar los errores:
```angular181html
<!-- errores de los validadores del form -->
<span>Errores (sera nulo)</span>
<pre>{{ myForm.errors | json }}</pre>

<span>Error Name</span>
<pre>{{ myForm.controls.name.errors| json }}</pre>
```

Mostrar un mensaje de error:

```angular181html
<!-- Campo de producto -->
<div class="mb-3 row">
  <label class="col-sm-3 col-form-label">Producto</label>
  <div class="col-sm-9">

    <input type="text"
           class="form-control"
           placeholder="Nombre del producto"
           [formControl]="myForm.controls.name">

    @if(myForm.touched){
      @if( myForm.controls.name.errors?.['required']){
        <span class="form-text text-danger">
                        <!-- Debe de ser de 3 letras -->
                        Este campo debe ser requerido
                    </span>
      }
      @if( myForm.controls.name.errors?.['minlenght']){
        <span class="form-text text-danger">
                        <!-- Debe de ser de 3 letras -->
                        Este campo debe ser mayor que {{ myForm.controls.name.errors?.['minlenght'].min  }} caracteres
                    </span>
      }
    }
  </div>
</div>
```
Simplificando, a costa de añadir logica en el controlador

1. Declarar myForm como FormGroup

```typescript
 myForm :FormGroup = this.formBuilder.group({
  //name: [''],
  //name: ['', /** validaodres sincornos **/, /** validaodres asincronos **/],
  name: ['', [Validators.required, Validators.minLength(3)] ],
  price: [0, [Validators.required, Validators.min(10) ] ],
  inStorage: [0, [ Validators.required,Validators.min(0) ] ]
});
```
> **Nota**: Esto obliga pasar de
> > this.myForm.controls.name a his.myForm.controls[ 'name' ]
>
> Ademas no se peude usar:
> * [formControl]="myForm.controls.name", y
> * {{ myForm.controls.name.value }}
> Si no:
> * formControlName="name", y
> * {{ myForm.controls['name'].value }}

2. Crear un metodo que dado el nombre del campo valide si tiene erroes

```typescript
public isValidField( fieldName: string):boolean | null {
    // requerido usar tipado al declarar myForm :FormGorup
  return ( this.myForm.controls[ fieldName ].errors && this.myForm.controls[ fieldName ].touched );
  }
```

3. Crear un metodo que dado el nombre del camo obtenga un mensaje de error

```typescript
public getFieldError( fieldName: string ): string | null {
    const control = this.myForm.get(fieldName);

    // si no existe, es null
    if (!control || !control.errors ) return null;

    const errors = control.errors;

    for( const keyError of Object.keys( errors ) ) {
      switch(keyError){
        case 'requeried':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo de ${ errors[ 'minlength' ].requiredLength } caracteres`;
        case 'min':
          return `Minimo de ${ errors[keyError].min} caracteres`;
      }
    }

    return null;
  }
```

5. Mostraro en la vista

```angular181html
<div class="mb-3 row">
  <label class="col-sm-3 col-form-label">Producto</label>
  <div class="col-sm-9">
    
    <!-- declarando myForm como myForm:FormGroup = ... -->
    <input type="text"
           class="form-control"
           placeholder="Nombre del producto"
           formControlName="name">
    @if( isValidField('name')){
      <span class="form-text text-danger">
                <!-- Debe de ser de 3 letras -->
        {{ getFieldError('name') }}
            </span>
    }
  </div>
</div>
```

6. Enviar data, con "(ngSubmit)" porque propaga los cambios

```angular181html
<form autocomplete="off" [formGroup]="myForm" (ngSubmit)="onSave()">
<!-- ... -->
</form>
```
  6.1. El método 'onSave()', valida el formulario, si no lo es marca todos los campos y si lo es, envía y resete el form
```typescript
  ublic onSave(){

    // si se guarda, y los campos son invalidas
    if( this.myForm.invalid){
      // toca tods los campos para cargar sus errores
      this.myForm.markAllAsTouched();
      // no se envía
      return
    }

    // simula que se envia los datos
    console.table(this.myForm.value);

    // resete el formulario
    // console.log(this.myForm.reset());
    console.log(this.myForm.reset({
      // valoresp or defecto (opcional)
      price: 100,
      inStorage: 50
    }));
  }
```

---
# Tradudcir en el cliente:

(Configuracion en el paso anterior)
En el fichero json, añadir

```typescript
// public/i18n/es.json
{
  "WELCOME_MESSAGE": "Bienvenido",
  "THANK_YOU": "Gracias por usar nuestra aplicación.",
  "form": {
  "errors": {
    "required": "Este campo es obligatorio",
      "minlength": "Mínimo de {{ requiredLength }} caracteres",
      "maxlength": "Máximo de {{ requiredLength }} caracteres",
      "min": "Valor mínimo permitido: {{ min }}",
      "max": "Valor máximo permitido: {{ max }}",
      "email": "Correo electrónico no válido"
    }
  }
}
```

En la vista

```angular181html
@if( FormUtils.isNonValidField(myForm,'name')){
  <span class="form-text text-danger">
                <!-- Debe de ser de 3 letras -->
    <!--              {{ getFieldError('name') }}-->
    {{ FormUtils.getFieldError(myForm,'name')![0] | translate: FormUtils.getFieldError(myForm,'name')![1] }}
            </span>
}
</div>
```

En la lógica
```typescript
public static isValidField(form: FormGroup, fieldName: string): boolean {
  console.log('Validando el campo: ',fieldName)
  const control = form.get(fieldName);

  return !!control && control.touched && control.valid;
}

public static isNonValidField(form: FormGroup, fieldName: string){
  console.log('Validando el campo: ',fieldName)
  const control = form.get(fieldName);
  
  return !!control && control.touched && control.invalid;
}

public static getFieldError(form: FormGroup, fieldName: string): [string, any?] | null  {
  console.log('Obteniendo el error del campo: ',fieldName)
  const control =  form.get(fieldName);

  if( !control || !control.errors ){
    return null;
  }

  const errors = control.errors;

  for( const keyError of Object.keys( errors ) ) {
    switch(keyError){
      case 'required':
        return ['form.errors.required'];

      case 'minlength':
        return ['form.errors.minlength', { requiredLength: errors['minlength'].requiredLength }];

      case 'maxlength':
        return ['form.errors.maxlength', { requiredLength: errors['maxlength'].requiredLength }];

      case 'min':
        return ['form.errors.min', { min: errors['min'].min }];

      case 'max':
        return ['form.errors.max', { max: errors['max'].max }];

      case 'email':
        return ['form.errors.email'];
    }
  }

  return null;

}
}
```

--

# Formularios dinámicos co narregos

Crear el formulario reactivo con FormBuilder:

```typescript
private formBuilder = inject(FormBuilder);

public myForm :FormGroup = this.formBuilder.group({
  name: ['', [Validators.required, Validators.minLength(3)] ],
  // arreglo, a cada elemento se le puede asociar un validar, y luego al conjunto
  favoritesGames: this.formBuilder.array([
    ['Metal Gear',Validators.required],
    ['Death Stranding',Validators.required]
  ],[Validators.required, Validators.minLength(3)] )
});
```

Cargar en la vista:

```angular181html
<form autocomplete="off" [formGroup]="myForm">

  <!-- Nombre -->
  <div class="mb-3 row">
    <label class="col-sm-3 col-form-label">Nombre</label>
    <div class="col-sm-9">
      
      <input class="form-control"
             placeholder="Nombre de la persona"
             formControlName="name">
      
    </div>
  </div>
</form>
```

Para obtener los elementos del arrray del form, se recomienda crear un metodo, que devuelva un FormArray o Null, y con un for en la vista cargarlos

```typescript
public getFavoritesGames() : FormArray | null {
  return this.myForm.get('favoritesGames') as FormArray;
}
```

Para vincular el form array:
1. En el div que contiente los elmentos del formuario, se vincula con 'formArrayName'
2. Se crea un for, donde se obtiene el indice de cada elemento (paso de iteracion)
3. En cada control, se asocia con la posicion del array que se muestra '[fromControlName]='i'
```angular181html
<!-- Lista de Juegos Favoritos -->
<div class="mb-3 row">
  <label class="col-sm-3 col-form-label">Favoritos</label>
  <div class="col-sm-9">

    <!-- se vincula con el formulario el div -->
    <div class="mb-1" formArrayName="favoritesGames">
      @for( favoriteGame of getFavoritesGames()?.controls; track $index; let i = $index){
        <div class="input-group">
          <!-- se vinula el indice del array con el control -->
          <input class="form-control" [formControlName]="i" >

          <button class="btn btn-outline-danger"
                  type="button">
            Eliminar
          </button>
        </div>
        <span class="form-text text-danger">
                   Este campo es requerido
                </span>

      }
    </div>
    
  </div>
</div>
```
Y cargar los mensajes de errors:

```typescript
// form.utils.ts
public static isValidFieldArray(form: FormArray, index: number){
  return !form.controls[index].errors && form.controls[index].touched;
}

public static isNonValidFieldArray(form: FormArray, index: number){
  return form.controls[index].errors && form.controls[index].touched;
}

public static getFieldErrorArray( form: FormArray, index: number ): [string, any?] | null {
  const control =  form.controls[index];

  if( !control || !control.errors ){ return null;}

  const errors = control.errors;

  for( const keyError of Object.keys( errors ) ) {
    switch(keyError){
      case 'required':
        return ['form.errors.required'];

      case 'minlength':
        return ['form.errors.minlength', { requiredLength: errors['minlength'].requiredLength }];

      case 'maxlength':
        return ['form.errors.maxlength', { requiredLength: errors['maxlength'].requiredLength }];

      case 'min':
        return ['form.errors.min', { min: errors['min'].min }];

      case 'max':
        return ['form.errors.max', { max: errors['max'].max }];

      case 'email':
        return ['form.errors.email'];
    }
  }

  return null;
}
```

En la vista

```angular181html
 <!-- se vincula con el formulario el div -->
<div class="mb-1" formArrayName="favoritesGames">
  @for( favoriteGame of getFavoritesGames()?.controls; track $index; let i = $index){
    <div class="input-group">
      <!-- se vinula el indice del array con el control -->
      <input class="form-control" [formControlName]="i" >

      <button class="btn btn-outline-danger"
              type="button">
        Eliminar
      </button>
    </div>
    @if(FormUtils.isNonValidFieldArray(getFavoritesGames()!,i)){
      <span class="form-text text-danger">
              {{ FormUtils.getFieldErrorArray(getFavoritesGames()!,i)![0] | translate: FormUtils.getFieldErrorArray(getFavoritesGames()!,i)![1] }}
            </span>
    }
  }

</div>
```

Mientras, quer para mostrar el mensaje del control que es un array:

```angular181html
<div class="col-sm-9">

  <!-- se vincula con el formulario el div -->
  <div class="mb-1" formArrayName="favoritesGames">
    <!-- .... -->
  </div>
  @if(FormUtils.isNonValidField(myForm,'favoritesGames')){
    <span class="form-text text-danger">
      {{ FormUtils.getFieldError(myForm,'favoritesGames')![0] | translate: FormUtils.getFieldError(myForm,'favoritesGames')![1] }}
    </span>
  }
</div>
```

## Añadir elementos al formArray dinamicamente

Se crea un control aislado en el comtrolador

```typescript
// control aislado
public newFavorite = new FormControl('', Validators.required);
//public newFavorite = this.formBuilder.control([]);
```

Se asocaido este controaldro como propiedad de un elemento de control, y cuando se pulsa enter se agrege su valor

```angular181html
<!-- Agregar Favorito -->
<div class="mb-3 row">
  <label class="col-sm-3 col-form-label">Agregar</label>
  <div class="col-sm-9">

    <div class="input-group">
      <input class="form-control"
             placeholder="Agregar favorito"
             [formControl]="newFavorite"
             (keydown.enter)="onAddToFavorites()">


      <button class="btn btn-outline-primary"
              type="button">
        Agregar favorito
      </button>
    </div>
  </div>
</div>
```

Y el meotodo para añadir el control

```typescript
// refactor
get favoritesGames() : FormArray | null {
  return this.myForm.get('favoritesGames') as FormArray;
}

public onAddToFavorites(){
  if( this.newFavoriteGame.invalid) return;

  const newGame = this.newFavoriteGame.value;

  // OPCION A. añadir el control
  this.favoritesGames?.push(this.formBuilder.control( newGame, Validators.required) )
}
```

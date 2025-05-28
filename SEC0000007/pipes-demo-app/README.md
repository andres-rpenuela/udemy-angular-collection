# PipesDemoApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.13.

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


# Crear proyecton con Tailwindscss + disay ui

## 01. Create your project
Start by creating a new Angular project if you don’t have one set up already. The most common approach is to use Angular CLI.

>terminal
>```shell
>npm install -g @angular/cli@latest
>ng new my-project --style css
>cd my-project
>```


## 02. Install Tailwind CSS and PostCSS
Install @tailwindcss/postcss, [link](https://tailwindcss.com/docs/installation/framework-guides/angular), and its peer dependencies via npm.


>terminal
>```shell
>npm install tailwindcss @tailwindcss/postcss postcss --force
>```

## 03.Configure PostCSS Plugins
Create a .postcssrc.json file in the root of your project and add the @tailwindcss/postcss plugin to your PostCSS configuration.

>.postcssrc.json
>```json
>{
>  "plugins": {
>     "@tailwindcss/postcss": {}
>   }
>}
>```

## 04 Import Tailwind CSS
Add an @import to ./src/styles.css that imports Tailwind CSS.

>.styles.css
>```css
>@import "tailwindcss";
>```

## 05 Start your build process
Run your build process with ng serve.

>bash
>```css
>ng serve
>```

## 06 Start using Tailwind in your project
Start using Tailwind’s utility classes to style your content.

>app.component.html
>```angular181html
><h1 class="text-3xl font-bold underline">
>  Hello world!
></h1>
>```

## 07. 2. Install and daisyUI as plugin 

[Link](https://daisyui.com/docs/install/angular/) You need Node.js and Tailwind CSS installed.

### 07.01. Install daisyUI as a Node package:
```shell
npm install daisyui@latest --force
```
### 07.02. Add daisyUI to app.css:

```css
@import "tailwindcss";
@plugin "daisyui";
```

---

# Cambiar de idomas

En la clase de configuracion del proyecto, se debe cargar y registrar los idimas deseados, estos idiomas, pueden ser usdaos del ´@angular/common`

```typescript
//... 
// registrar idiomas
import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeEs, 'es' );
registerLocaleData(localeFr, 'fr' );

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // selecionar idoma por defe
    // cto, por fecto es el ingles
    {
      provide: LOCALE_ID,
      useValue: 'es'
    }
  ]
};
```

# Cambiar idoma dinamicamente
Se crea un tipo con los idiomas validos

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
1º Crear el servicio, donde:
1.1. Cuenta con una señal que obtiene el idoma actual de la aplicacion, por defecto se le da un valor
1.1.a. Por defecto, al crear la señal se asinga un valor
1.2.b. Al crear el servicio, se lee el localStore, si hay un valor si no, se asinga un valor por defecto a la señal
1.2. Cuanta con un metodo get para para obtener el valor de la señal (Valor del idoma seleccionado)
1.3. Cuenta con un metod updated para cambiar el idoma al indicado
1.4. Para hacer que se actualice y angular detecte el cambio, se deberá añadir el idoma al "localStore" + refrescar el idoma

```typescript
import {Injectable, signal} from '@angular/core';
import {getValidLocale, Locale, LOCALE_ES} from '../interfaces/locale.type';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  private readonly currentLocaleSng = signal<Locale>(LOCALE_ES);

  constructor() {
    // get locale
    const localeMaybe: string | null = localStorage.getItem('locale');
    const validLocale = getValidLocale(localeMaybe) ?? LOCALE_ES;
    this.currentLocaleSng.set( validLocale );
  }


  public getLocale(): Locale {
    return this.currentLocaleSng();
  }

  public changeLocale(locale: Locale): void {
    // set locale + updated
    localStorage.setItem('locale',locale);
    this.currentLocaleSng.set(locale);

    // reload
    (window as Window).location.reload();
  }
}
```
2º Registar el idioma, donde se indica el dependneica y el metodo que devuelve el idoma seleccionado

```typescript
// registrar idiomas
import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import {LocaleService} from './services/locale.service';

registerLocaleData(localeEs, 'es' );
registerLocaleData(localeFr, 'fr' );

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
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
---

# Content Project

Angular, permite proyectar el contenido que se introduce dentro de un componte hijo


1. En el componente hijo usar `<ng-content>`:
```angular181html
<div class="card w-96 bg-base-100 card-xs shadow-sm">
  <div class="card-body">
    <h2 class="card-title">{{ title() }}</h2>
    <ng-content></ng-content>
  </div>
</div>
```

2. En el componente padre se indica el contenido:
```angular181html
<!-- gap: es para separacion de los elementos internos -->
<section class="grid grid-cols-1 md:grid-cols-2 lx:gird-cols-3 gap-4">
  <app-card [title]="'prueba'">
    <p>Contenido del padre</p>
    <div class="justify-end card-actions">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </app-card>
</section>
```

Esto mostrará un card, con el contenido indicado en el padre.

```angular181html
Pipes No tan comunes
Pipes incluidos en Angular
prueba

Contenido del padre
                   [Buy Now]
```

---

# I18nSelectPipe

Permite insertar un valor dada una condición


```typescript
const client1 = {
  name: 'Andres',
  gender: 'male',
  age: 39,
  address: 'Ottawa, Canadá'
}

const client2 = {
  name: 'Melissa',
  gender: 'female',
  age: 33,
  address: 'Toronto, Canadá'
}

//....

// objecto que contiente los valores a introducir dada una condición { key : value }
// ejemplo de uso I18nSelectPipe
// Nota: ESTO PUEDE SER UNA SEÑAL
invitationMap = {
  male: 'invitarlo',
  female: 'invitarla'
}
```

```angular181html
<!-- uso de invitationMap, que carga el valor que cumpla la condicion  
{{ KEY | i18nSelect:OBJECTO_KEY_VALORES }}
-->
<app-card [title]="'i18nSelectPipe'">
  <p>Saludos a {{client().name}}, es un placer {{ client().gender | i18nSelect:invitationMap }} a nuestro evento</p>
  <div class="justify-end card-actions">
    <button class="btn btn-primary" (click)="changeClient()">Cambiar cliente</button>
  </div>
</app-card>
```


--

# Pipes Personalizadso en angular

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toggleCase', // selector para usar el Pipe
  standalone: true
})
export class ToggleCasePipe implements PipeTransform {

  // este metodo se llama cada vez que camibe la data
  // 'andres' | toggleCase
  // value = 'andres'
  // args => son las opciones del pipe (opcional), puede ser::: ...args: any[] o arg1:type, arg2:type, ...
  // upper:boolean > argumento requerido
  // upper:boolean = true  > argumento opcional,
  transform(value: any, upper:boolean = true): any {
    console.log( value, upper)
    return upper ? value.toUpperCase() : value.toLowerCase();
  }
}
```


En la vista: 

```angular181html
<div class="stat-value">{{ name() | toggleCase  }}</div>
<div class="stat-value">{{ name() | toggleCase : false }}</div>
<div class="stat-value">{{ name() | toggleCase : upperCase() }}</div>
```

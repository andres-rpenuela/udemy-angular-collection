# TesloShop

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.2.

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

# Init project

## Configuration schematic

Ir a `angular.json`, y si la propiedad `schematics` esta vacia poner:

```json
// ...
{
  //...
  "schematics": {
    "@schematics/angular:class": {
      "skipTests": true,
      "type": "class"
    },
    "@schematics/angular:component": {
      "skipTests": true,
      "type": "component"
    },
    "@schematics/angular:directive": {
      "skipTests": true,
      "type": "directive"
    },
    "@schematics/angular:guard": {
      "skipTests": true
    },
    "@schematics/angular:interceptor": {
      "skipTests": true
    },
    "@schematics/angular:pipe": {
      "skipTests": true
    },
    "@schematics/angular:resolver": {
      "skipTests": true
    },
    "@schematics/angular:service": {
      "skipTests": true,
      "type": "service"
    },
    "@schematics/angular:interface": {
      "type": "interface"
    }
  }
  //...
}
// ...
```

## Iniciar el proyecto al compilar + puerto

Ir a `package.json`, y en la propiedad de `start`, modificar por:

```json
{
  "start": "ng serve -o --port 4200"
}
```

## Instalar variables de entorno

> **Nota**: En el git no manejar el control de versión de
> * `.env`, pero si el `.env.template`,
> * Se debe crear el `.env` basado en `.env.template`
> * ni los **enviroments**, pero si el **script**
> 
> /project-root/
>   ├── index.js
>   └── envs/
>      └── .env
>      └── .env.template
>   └── scripts/
>      └── gn-env.js
>   └── src/
>      └── app/
>      └── enviroments/
>      └── index.html
>      └── main.ts
>      └── styles.ts
>   └── angular.js
>   └── angular.js

1. Instalar la dependecia de desarrollo 

```bash
npm install -D dotenv
```
2. Crear Script para generar los environment.ts

```bash
const { writeFileSync, mkdirSync } = require( 'fs');

// reuqeire dotenv to load environment variables from .env file

require( 'dotenv' ).config();
// require('dotenv').config({ path: 'envs/.env' });

const targetPath = './src/environments/environment.ts';
const targetPathDev = './src/environments/environment.development.ts';

// contenido del fichero de entorno
const appName = process.env['APP_NAME'];


if( !appName ) { //if( !process.env['APP_NAME']) {
  throw new Error( 'APP_NAME is not set in .env file' );
}

const envFileContent = `
export const environment = {
  app-name:"${appName}"
};
`;

// se crea el fichero de entorno (si no existe tambien)
mkdirSync('./src/environments', { recursive: true });

// se escribe el fichero de entorno
writeFileSync(targetPath, envFileContent, { encoding: 'utf8' });
writeFileSync(targetPathDev, envFileContent, { encoding: 'utf8' });
```

> **Nota**: Con `const appName = process.env['APP_NAME'];`
> Se puede leer las propiedades de sesion, de sistema o del fichero `.env`
> basta con poner el **key** de la propiedad
> Por tanto: la propiedad `env` del objeto `process` es bastabte útil.
> 

3. Crear comando `ng set-envs`, para generar las variables
```json
"scripts": {
  "set-envs": "node ./scripts/set-envs.js"
}
```
4. Ejecutar el script con el comando:

```bash
npm run set-envs
```

## Instalar Tailwind CSS, PostCSS, and daisyUI

[Link](https://daisyui.com/docs/install/angular/)

1. Instalar las dependencias

```shell
npm install daisyui@latest tailwindcss@latest @tailwindcss/postcss@latest postcss@latest --force
```
3. Añadir el plugin Tailwind CSS para PostCSS, crear el fichero en la raíz del proyecto `.postcssrc.json`, con el contenido
```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```
5. En el fichero CSS princial del proyecto, cargar las depedencias y eliminar los estilos viejos.
```css
/* src/styles.css */
@import "tailwindcss";
/*@plugin "daisyui";*/
@plugin "daisyui" {
  themes: light --default, dark --prefersdark;
}
```

## Tailwindcss - FadeIn (animations)
[Link](https://tailwindcss.com/docs/animation)

Con Tailwindcss instalado y configurado, basta con añadir lo siguiente en `style.css` y luego nombarlo en elemento donde usar la animacion

```css
/* You can add global styles to this file, and also import other style files */
@import "tailwindcss";

@theme {
  --animate-wiggle: wiggle 1s ease-in-out infinite;
  @keyframes wiggle {
    0%,
    100% {
      transform: rotate(-3deg);
    }
    50% {
      transform: rotate(3deg);
    }
  }
}
```

```html
<div class="animate-wiggle">
  <!-- ... -->
</div>
```
## Routas

### Estructura de rutas hijas con carga perezosa

```typescript
import { Routes } from '@angular/router';
import { StoreFrontLayoutComponent } from './layouts/store-front-layout/store-front-layout.component';

export const storeFrontRoutes: Routes = [
  {
    path: '',
    component: StoreFrontLayoutComponent,
    children: [
      {
        path: '',
        title: 'Store - Home',
        loadComponent: () =>
          import('./pages/home-page/home-page.component').then(m => m.HomePageComponent)
      },
      {
        path: 'gender/:gender',
        loadComponent: () =>
          import('./pages/gender-page/gender-page.component').then(m => m.GenderPageComponent)
      },
      {
        path: 'product/:idSlug',
        loadComponent: () =>
          import('./pages/product-page/product-page.component').then(m => m.ProductPageComponent)
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export default storeFrontRoutes;
```

### 📌 Importación en las rutas principales (app.routes.ts)

```typescript
export const routes: Routes = [
  {
    path: '',
    title: 'Store',
    loadChildren: () => import('./store-front/store-front.routes')
  }
];
```

* **loadChildren** permite cargar el archivo de rutas hijas perezosamente (lazy loading).

### 🔍 Parámetros dinámicos en rutas

Ejemplo: _prodcut/:idSlug_
* Define un parámetro de ruta llamado idSlug.
* Permite acceder a productos por ID o slug en la URL.

````typescript
{
  path: 'product/:idSlug',
  loadComponent: () => import('./pages/product-page/product-page.component').then(m => m.ProductPageComponent)
}
````

### Acceso al parámetro en el componente (básico)

```typescript
import { ActivatedRoute } from '@angular/router';

export class ProductPageComponent {
  idSlug = this.route.snapshot.paramMap.get('idSlug');
  
  constructor(private route: ActivatedRoute) {
    console.log('ID del producto:', this.idSlug);
  }
}
```
> **Nota**: También puedes usar this.route.paramMap.subscribe(...) para escuchar cambios si la ruta puede cambiar sin recargar el componente.
### Visualizar el contenido de las rutas

Rendira las rutas princiaples definidias en `app.routes.ts`:
```angular181html
<!-- app.html -->
<!-- Punto de entrada de rutas principales -->
<router-outlet/>

```
Si las rutas que renderiza, tienen rutas anidadas (hijas), entonces, en el template del componente que carga las rutas hijas, debe tener también `<router-outlet></router-outlet>` (_así, sucesivamente_), es decir, para renderizar las rutas hijas anidadas al componente y defindias en `store-front.routes.ts`
```angular181html
<!-- store-front-layout.component.ts -->

<!-- Layout del storefront con navbar, footer, etc. -->
<!-- Sección para renderizar rutas hijas (home, gender, product, etc.) -->
<section>
  <router-outlet/>
</section>
```
#### 🔄 Flujo de carga de rutas

1. Usuario entra a /.
2. Se carga AppComponent → renderiza <router-outlet>.
3. Se resuelve app.routes.ts, carga store-front.routes.ts.
4. Dentro de StoreFrontLayoutComponent, se usa otro <router-outlet>.
5. Ahí se renderiza el componente correspondiente (home, gender, product...).


## 🔗 Angular RouterLink y clases activas

Un ejemplo de como crear un enlace con estiloscuando este activo:

```angular181html
<a [routerLink]="routesNav()[navKey][0].path"
   routerLinkActive="text-secondary"
   [routerLinkActiveOptions]="{ exact: true }">
  {{ routesNav()[navKey][0].title | titlecase }}
</a>
```
> **Nota**: RouterLink con parámetros
> 
> ```angular181html
> <a class="btn btn-primary" [routerLink]="['/product','t-shirt']">
>     Buy Now
> </a>
>```
>
Donde:

* **[routerLink]**:
Enlaza dinámicamente a la ruta especificada.
En este caso, accede a la primera ruta del grupo:
routesNav()[navKey][0].path.
* **routerLinkActive="text-secondary"**:
Aplica la clase "text-secondary" automáticamente cuando la ruta está activa (coincide con la ruta actual del navegador).
* **[routerLinkActiveOptions]="{ exact: true }"**:
Controla cómo se evalúa si la ruta está activa.
  * exact: true → solo aplica la clase si la ruta coincide exactamente con routerLink.
* **{{ routesNav()[navKey][0].title | titlecase }}**:
Muestra el título en formato "Capitalizado" (primera letra mayúscula de cada palabra).

### Ejemplo de comparacion

| Ruta actual | routerLink | `exact: true` | ¿Clase activa? |
| ----------- | ---------- | ------------- | -------------- |
| `/home`     | `/home`    | ✅             | ✅ Aplica clase |
| `/home/1`   | `/home`    | ✅             | ❌ No aplica    |
| `/home`     | `/home`    | ❌ (false)     | ✅ Aplica clase |



---
# Anexo
# Usar Fonts de Google
[Link](https://fonts.google.com/specimen/Montserrat)

## Opción 1: CND

Solo usa angular.json para hojas de estilos locales como styles.css.
Incluir fuentes externas como Google Fonts es más limpio y claro desde index.html.

[Link](https://fonts.google.com/selection/embed)
### Usando el angular.json
1. Agrega el link en angular.json
> Busca la sección "styles" y agrega el enlace a la fuente de Google.
```json
/* esto incluye solo la fuente */
"styles": [
  "src/styles.css",
  "https://fonts.googleapis.com/css2?family=Roboto&display=swap"
]
```

2. En styles.css o styles.scss:
```css
body {
  font-family: 'Roboto', sans-serif;
}
```

### De forma embebida (mas eficiente)
1. Agrega preconnect y la fuente en index.html
> Esto ayuda a que el navegador comience a descargar la fuente más rápido, lo que mejora el tiempo de carga.
> Abre src/index.html y agrega esto dentro del <head>
```html
<!-- Preconexión para mejorar rendimiento -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Fuente Roboto desde Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
```
2. Define la fuente en styles.css o styles.scss
> En src/styles.css:

```css
body {
font-family: 'Roboto', sans-serif;
}
```
Puedes también especificar pesos si los necesitas:
```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
```

## Opción 2: Usar fuentes locales (.woff/.ttf,...)
1. Descargar la fuente que se quiera utilizar.
2. Peger en la carpeta `public/assets/fonts/[fuente]`
3. Declarar la fuente en tu css
```css
@font-face {
  font-family: 'MiFuentePersonalizada';
  src: url('/assets/fonts/MiFuente.woff2') format('woff2'),
       url('/assets/fonts/MiFuente.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

body {
  font-family: 'MiFuentePersonalizada', sans-serif;
}
```

## Opción 3: Importar en SCSS directaemnte
Si se usa `style.scss`, se peude importar directamente:
```scss
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}
```

## Opcion 4: Cargar fonts locales en tailwindcss (Ejemplo)
> Enalces de interés:
> * [Link Tailswindcss - FontFamily](https://tailwindcss.com/docs/font-family)
> * [Link Fonts - Goole](https://fonts.google.com/?preview.layout=grid)

1. Descargar los fonts (_*.ttf_)
2. Pegar en `public/assets/fonts/[fuente-name]/file.ttf` 
3. En el `styles.css`, agregar:
```css
/* You can add global styles to this file, and also import other style files */
@import "tailwindcss";
/*@plugin "daisyui";*/
@plugin "daisyui" {
  themes: light --default, dark --prefersdark;
}

/** carga local de fonts **/
@font-face {
  font-family: 'Montserrat';
  src: url('../public/assets/fonts/montserrat/montserrat-blackItalic.ttf') format('truetype');
  font-style: italic;
}

@font-face {
  font-family: 'Montserrat';
  src: url('../public/assets/fonts/montserrat/Montserrat-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'Montserrat';
  src: url('../public/assets/fonts/montserrat/montserrat-medium.ttf') format('truetype');
  font-style: normal;
}

@font-face {
  font-family: 'Robot';
  src: url('../public/assets/fonts/roboto/Roboto_Condensed-Regular.ttf') format('truetype');
}

/** usar fonts en tailwindcss **/
@theme {
  --font-montserrat: "Montserrat", sans-serif;
  --font-roboto: "Robot", sans-serif;

}

/** definir por defecto un font **/
body {
  font-family: sans-serif, 'Montserrat', "Robot";
}
```
> Nota: 
> * Todos los @font-face comparten el mismo font-family ('Montserrat'), pero se diferencian por font-weight y font-style.
> * Asegúrate de usar rutas absolutas a partir de /assets/, no ../public/, ya que Angular no usa public/, sino src/assets/.

Uso especifico de fuentes en elementos html:

```html
<p class="font-montserrat font-bold">
  Esto usará font-montserrat con font-weight de 700
</p>

<p class="font-montserrat">
  Esto usará Montserrat normal, con font-weight 400 por defecto 
</p>
```

# Record en TypeScript (y Angular)

**Record<K, T>** es un tipo genérico que representa un objeto con claves del tipo K y valores del tipo T.

```typescript
Record<Keys, Type>
```
Donde
* **Keys**: el tipo de las claves (por ejemplo string, 'admin' | 'user', etc.)
* **Type**: el tipo de los valores que almacena cada clave

## Ejemplo práctico

```typescript
interface StoreRoute {
  title: string;
  path: string;
}

const routesNav: Record<string, StoreRoute[]> = {
  general: [
    { title: 'Home', path: '/' }
  ],
  gender: [
    { title: 'Hombres', path: '/gender/men' },
    { title: 'Mujeres', path: '/gender/woman' },
    { title: 'Niños', path: '/gender/kids' }
  ]
};

// 👨‍💻  En componentes Angular con signals
public routesNav: InputSignal<Record<string, StoreRoute[]>> = input.required();

public getRoutesNavKeys(): string[] {
  return Object.keys(routesNav());
}
```

```angular181html
// 🔁 Iterar un Record en plantillas (Angular 20)
@for (navKey of Object.keys(routesNav()); track navKey) {
@for (route of routesNav()[navKey]; track route.title) {
    <a [routerLink]="route.path">{{ route.title }}</a>
  }
}
```

# 📥 @Input() y 📤 @Output() en Angular
Estas decoraciones permiten comunicación entre componentes:

* @Input() → Permite que un componente hijo reciba datos desde su componente padre.
* @Output() → Permite que un componente hijo emita eventos hacia su componente padre.

## 📥 @Input() – recibir datos (✅ Uso básico)

```typescript
// hijo.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hijo',
  template: `<p>Nombre: {{ nombre }}</p>`
})
export class HijoComponent {
  @Input() nombre: string = '';
}

```

```angular181html
<!-- padre.component.html -->
<app-hijo [nombre]="'Juan'"></app-hijo>
```

## 📤 @Output() – emitir eventos (✅ Uso básico)

```typescript
// hijo.component.ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hijo',
  template: `<button (click)="enviar()">Enviar</button>`
})
export class HijoComponent {
  @Output() mensaje = new EventEmitter<string>();

  enviar() {
    this.mensaje.emit('Hola desde el hijo!');
  }
}

```
```angular181html
<!-- padre.component.html -->
<app-hijo (mensaje)="mostrarMensaje($event)"></app-hijo>
```

```typescript
// padre.component.ts
mostrarMensaje(mensaje: string) {
  console.log(mensaje);
}
```

### 📘 Tips
* @Input() puede usarse con valores primitivos, objetos, arrays o signals.
* @Output() debe usar EventEmitter<T>.
* Los nombres pueden cambiar con alias:
```typescript
@Input('nombreAlias') nombreReal: string;
```

## Path Alias - TypScripts

Permite definir alias de las rutas para importar elmentos de angulas. 

1. Ir al tsconfing.js.
2. En el parámetro de `compilerOptions`, añadir la opción `baseUrl` y poner la ruta de donde partirán toods los paths
3. Añadir el alias y la ruta relativa del emento ne la opción `paths`del pámetro `compilerOptions`

```typescript
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["./src/app/*"],
      "@auth/*": ["./src/app/auth/*"],
      "@products/*": ["./src/app/products/*"],
      "@shared/*": ["./src/app/shared/*"],
      "@store-front/*": ["./src/app/store-front/*"],
      "@dashboard/*": ["./src/app/admin-dashboard/*"]
    },
/*....*/
}
```
> **Nota**: Un alias global `"@/*": ["./src/app/*"]`, es opcional, y el resto de alias, corresponde uno para cada _feature module_
Esto permitiriá cambiar los imports
```typescript
// sin alias
import {ProductCardComponent} from '../../../products/components/product-card/product-card.component';
// por el alias del feature module
import {ProductCardComponent} from '@products/components/product-card/product-card.component';
// o, por el path alias global (eso sería válido también)
import {ProductCardComponent} from '@/products/components/product-card/product-card.component';

```

## Convertir json to typescrit



1. Copiar la respuesta JSON de `http://localhost:3000/api/products?limit=52`
2. Ir [Link](https://quicktype.io/typescript),  pegar la respuesta, nombrarlo como `ProductResponse` y:
   1. Source: Json
   2. Target: Typescript
3. Copiar el codigo que ha generado y pegar en la interfaz `product.interface.json`

> **Nota**: Se puede adpatar el codigo generado en nuestra interfaz, solo es un squema para empezar.

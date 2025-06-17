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

# MapsApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.1.

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



## Como obtener el titulo de la pagina que se navega

1º Crear un observador que se encargue de obtener el titulo de la pagina que se navega, utilizano el Router de Angular y los eventos de navegación.

```typescript
 // Inject the Router service to access routing events
  router = inject(Router);

  // observable for the current page title, using NavigationEnd events
  pageTitle$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    tap( event => {console.log('Router event:', event); }),
    map( event => event.url),
    map( url => {
      console.log('Current URL in NavigationEnd:',url);
      return routes.find(route => `/${route.path}` === url )?.title || 'Unknown Page: Maps App';
    } )
  );
```

2º Para que funcione el observable, hay que **subcribirse** al observable, para el caso se puede usar **async pipe** en el template

```html
  <h1 class="text-2xl font-bold mb-4">
    {{ pageTitle$ | async }}
  </h1>
```

3º Opcionalmente, se puede convertir el observable en una señal, que gestiona la subripción automáticamente y permite un uso más sencillo en los templates.

```typescript
  // Convert the observable to a signal for easier use in templates
  pageTitleSignal = toSignal(this.pageTitle$, { initialValue: 'Loading...' });
```

3.1. En el template se puede usar la señal directamente

```html
  <h1 class="text-2xl font-bold mb-4">
    {{ pageTitleSignal() }}
  </h1>
```

> Ambas opciones son válidas, pero el uso de señales es más moderno y recomendado en Angular.


--

# Variables de entonro

Levnatar proyecto en Dev

1. clonar repositorio
2. instalar dependencias
3. generar el .evn basado en el .env.template
4. ejecutar el comando `npm run set-envs` para generar los archivos de entorno `environment.ts` y `environment.development.ts`

Este comando lanza un un script que genera el environment.ts y enviroment.development.ts automáticamente a partir de las variables de entorno definidas en el archivo `.env`.

En el git no manejar el control de versión de
* .env, pero si el .env.template,
* ni los enviroments, pero si el script

Importatne instalar la depedencia de desarrollo `dotenv`

```bash
npm install -D dotenv
```

Script para generar los environment.ts

```bash
const { writeFileSync, mkdirSync } = require( 'fs');

// reuqeire dotenv to load environment variables from .env file

require( 'dotenv' ).config();


const targetPath = './src/environments/environment.ts';
const targetPathDev = './src/environments/environment.development.ts';

// contenido del fichero de entorno
const mapboxKey = process.env['MAPBOX_KEY'];


if( !mapboxKey ) { //if( !process.env['MAPBOX_KEY']) {
  throw new Error( 'MAPBOX_KEY is not set in .env file' );
}

const envFileContent = `
export const environment = {
  mapboxKey:"${mapboxKey}"
};
`;

// se crea el fichero de entorno (si no existe tambien)
mkdirSync('./src/environments', { recursive: true });

// se escribe el fichero de entorno
writeFileSync(targetPath, envFileContent, { encoding: 'utf8' });
writeFileSync(targetPathDev, envFileContent, { encoding: 'utf8' });
```

Ejecutar el script

```bash
...\SEC0000011\maps-app> node .\scripts\set-envs.js
```

Opcionalmente, se puede crear un script en package.json para ejecutar el script de generación de entornos:

```json
"scripts": {
  "set-envs": "node ./scripts/set-envs.js"
}
```
Luego, se puede ejecutar el script con el comando:

```bash
npm run set-envs
```

## Uso de Mapbox GL JS

Para utilizar Mapbox GL JS en tu proyecto Angular, sigue estos pasos:

1. Ar a https://www.mapbox.com/ y crear una cuenta gratuita para obtener una clave de acceso (Access Token).
2. Ir la sección de "Docs" y buscar la sección de "Mapbox GL JS": https://docs.mapbox.com/ 
3. Instalar el bundler con la librería de Mapbox GL JS: (https://docs.mapbox.com/mapbox-gl-js/guides), opcionalmente se puede usar Mapbox CDN.

```bash
npm install --save mapbox-gl
```

4. Incluir el ficheor de CSS eh el head de tu `index.html` o importar el CCS en tu `styles.css`:
```html
<link href='https://api.mapbox.com/mapbox-gl-js/v3.12.0/mapbox-gl.css' rel='stylesheet' />
```
-- o --
```css
/* import 'mapbox-gl/dist/mapbox-gl.css'; */
@import 'mapbox-gl/dist/mapbox-gl.css';
```

5. Se imparta y configura el tocken de acceso en el archivo `environment.ts`:

```typescript
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmVzcnBlbnVlbGEiLCJhIjoiY21ibnAxejVoMWt6azJqcXRmM2FyeTZhMiJ9.hC8rHY-n_unF5FcJchEoRQ';
const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/streets-v12', // style URL
	center: [-74.5, 40], // starting position [lng, lat]
	zoom: 9, // starting zoom
});
```


# UUID

Para generar un UUID en Angular, puedes utilizar la librería `uuid`. Esta librería proporciona una forma sencilla de generar identificadores únicos universales (UUIDs).

```shell
npm install uuid
```

Uso:

```typescript
import { v4 as uuidv4 } from 'uuid';
```

# Genear build

Compilar

```shell

PS C:\Users\andre\Documents\SourceTree\UdemyAngularCollection\SEC0000011\maps-app> npm i uuid

added 1 package, and audited 600 packages in 28s

105 packages are looking for funding
  run `npm fund` for details

1 low severity vulnerability

To address all issues, run:
  npm audit fix

Run `npm audit` for details.
PS C:\Users\andre\Documents\SourceTree\UdemyAngularCollection\SEC0000011\maps-app> ng build  

/*! 🌼 daisyUI 5.0.43 */
Initial chunk files | Names         | Raw size | Estimated transfer size
main-LDOYZS7W.js    | main          |  1.79 MB |               417.50 kB
styles-MVGCENXU.css | styles        | 78.93 kB |                10.83 kB

                    | Initial total |  1.86 MB |               428.33 kB

Application bundle generation failed. [47.782 seconds]

▲ [WARNING] TS-998113: AsyncPipe is not used within the template of NavbarComponent [plugin angular-compiler]

    src/app/components/navbar/navbar.component.ts:11:4:
      11 │     AsyncPipe,
         ╵     ~~~~~~~~~


▲ [WARNING] bundle initial exceeded maximum budget. Budget 500.00 kB was not met by 1.36 MB with a total of 1.86 MB.


▲ [WARNING] Module 'mapbox-gl' used by 'src/app/pages/fullscreen-map-page/fullscreen-map-page.component.ts' is not ESM

  CommonJS or AMD dependencies can cause optimization bailouts.
  For more information see: https://angular.dev/tools/cli/build#configuring-commonjs-dependencies


X [ERROR] bundle initial exceeded maximum budget. Budget 1.00 MB was not met by 864.23 kB with a total of 1.86 MB.


PS C:\Users\andre\Documents\SourceTree\UdemyAngularCollection\SEC0000011\maps-app> 

```

Esto no indica que hay imports que no se estan usando, que la libreria o modulo 'mapbox-gl" no sigue el estanda que espera Angula y que ocupa mucho, para
solventar lo de la libreria, se va al 'angular.json' y permitir la libreria

```json
...
"architect": {
  "build": {
  "builder": "@angular/build:application",
  "options": {
    "allowedCommonJsDependencies": [
      "mapbox-gl"
    ],
  "browser": "src/main.ts",
...
```

Si volvemos a generar la build, ya no aparece el problmea del estandar de la librería

```shell
> ng build


▲ [WARNING] bundle initial exceeded maximum budget. Budget 500.00 kB was not met by 1.36 MB with a total of 1.86 MB.


X [ERROR] bundle initial exceeded maximum budget. Budget 1.00 MB was not met by 864.23 kB with a total of 1.86 MB.
```

Incrementamos el tamaño, en `angular.json`

```json
...
"configurations": {
  "production": {
    "budgets": [
    {
      "type": "initial",
      "maximumWarning": "500kB",
      "maximumError": "1MB"
    },
    {
      "type": "anyComponentStyle",
      "maximumWarning": "4kB",
      "maximumError": "8kB"
    }
    ],
    "outputHashing": "all"
  },
...
```
en conreto
```json
  // aumentar los parametros 
  {
      "type": "initial",
      "maximumWarning": "500kB",
      "maximumError": "1MB"
    },
```

Y se segenera la build, ya solo muestraría warngins

```shell
PS C:\Users\andre\Documents\SourceTree\UdemyAngularCollection\SEC0000011\maps-app> ng build

/*! 🌼 daisyUI 5.0.43 */
Initial chunk files | Names         | Raw size | Estimated transfer size
main-LDOYZS7W.js    | main          |  1.79 MB |               417.50 kB
styles-MVGCENXU.css | styles        | 78.93 kB |                10.83 kB

                    | Initial total |  1.86 MB |               428.33 kB

Application bundle generation complete. [8.277 seconds]

▲ [WARNING] TS-998113: AsyncPipe is not used within the template of NavbarComponent [plugin angular-compiler]

    src/app/components/navbar/navbar.component.ts:11:4:
      11 │     AsyncPipe,
         ╵     ~~~~~~~~~


▲ [WARNING] bundle initial exceeded maximum budget. Budget 1.00 MB was not met by 864.23 kB with a total of 1.86 MB.


Output location: C:\Users\andre\Documents\SourceTree\UdemyAngularCollection\SEC0000011\maps-app\dist\maps-app

```

Desplegar en [netlify](https://www.netlify.com/)

1º Importar manaulmente
2º Cargar la carpeta browers (dentro de: ...SEC0000011\maps-app\dist\maps-app)

Para solvertar el error de recargar en **netflify**, basta con añadir el `#` en las routas


```ts
//app.config.ts 
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),

    // HashStrategy
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ]
};
```

Generar de nuevo la app, y arrastarlo en `Deploys` situado el nav lateral del proyecto, la carpeta 'browser'

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

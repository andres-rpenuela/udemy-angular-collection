# Gitsapp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.5.

## Usar tailwindcss como framework css
Alternativa a boostrap

1. Ir a la guía de la web [https://tailwindcss.com/](https://tailwindcss.com/docs/installation/framework-guides)

> **Guia agular**:
> [link](https://tailwindcss.com/docs/installation/framework-guides/angular)

2. Instalar en local la dependencia en el proyecto
```bash
# ng new my-project --style css
# cd my-project

npm install tailwindcss @tailwindcss/postcss postcss --force
```

3. Configurar PostCSS Plugins
   1. Crear un fichero en la raiz del proyecto, **nombre**: `.postcssrc.json`
   2. Importar el plugin `@tailwindcss/postcss`
   ```json
    {
      "plugins": {
        "@tailwindcss/postcss": {}
      }
    }
    ```

4. Importar en el CSS del proyecto `styles.css` el framework`tailwindcss`
  ```css
  @import "tailwindcss";
  ```
6. Levantar `ng serve`, con el codigo ejemplo, en `app.component.html`
  ```html
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  ```

> Más doc: [tailwindcss](https://tailwindcss.com/docs/installation/using-vite)


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

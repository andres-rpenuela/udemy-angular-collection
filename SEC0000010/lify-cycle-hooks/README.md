# LifyCycleHooks

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


--

# 

Usar nvm

✅ 1. Verifica que tienes nvm instalado

nvm --version


Si no está instalado, puedes instalarlo desde su repositorio oficial:
👉 https://github.com/nvm-sh/nvm

✅ 2. Instala la última versión LTS de Node.js

nvm install --lts

Esto descargará e instalará la versión LTS más reciente disponible (por ejemplo, v20.x.x en mayo 2025).

✅ 3. Usa esa versión como predeterminada
nvm use --lts
nvm alias default lts/*

Esto hace que cada nueva terminal use automáticamente la versión LTS que acabas de instalar.

✅ 4. Verifica la instalación
node -v
npm -v

👉 Ejecuta el CLI de Angular (ng) temporalmente, incluso si no lo tienes instalado globalmente.

--- 

# Usar Angular CLI con npx

El comando:  `npx --package @angular/cli ng`, hace lo siguiente:

🔍 ¿Qué significa?
npx: Ejecuta paquetes npm sin necesidad de instalarlos globalmente.

--package @angular/cli: Le dice a npx que use (o descargue temporalmente) el paquete @angular/cli.

ng: Es el comando de la Angular CLI que quieres ejecutar.

🧠 ¿Qué logra?
👉 Ejecuta el CLI de Angular (ng) temporalmente, incluso si no lo tienes instalado globalmente.

Por ejemplo:

```bash
npx --package @angular/cli ng new my-app
```

➡️ Esto genera un nuevo proyecto Angular usando la última versión de @angular/cli, sin necesidad de instalarlo globalmente con npm install -g.

✅ Ventajas
Siempre usas la versión más actual de Angular CLI.

Evitas conflictos si tienes versiones antiguas globales.

Útil en entornos CI/CD o cuando trabajas con múltiples proyectos Angular de distintas versiones.

🔁 Consejo
Puedes hacer lo mismo más corto:

```bash
npx @angular/cli new my-app
```
(npx detecta automáticamente que quieres correr ng)

Ejemplo con propiedades:
```bash
npx --yes --package @angular/cli@latest ng new lify-cycle-hooks-app --standalone --routing --style=css --strict --skip-tests --defaults
```

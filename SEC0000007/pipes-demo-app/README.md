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

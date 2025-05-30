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
```

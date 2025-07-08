
# 🎬 View Transitions en Angular

## ✅ ¿Qué son?

Permiten transiciones suaves entre vistas/rutas/componentes usando la API nativa del navegador.

## 🎬 `withViewTransitions()` en Angular

La función `withViewTransitions()` es parte del API de **View Transitions** de Angular (desde v17+). Permite animaciones suaves entre vistas cuando se cambia de una ruta a otra, usando la API nativa del navegador.

---

### ✅ ¿Qué hace?

Envuelve la configuración de rutas (`provideRouter`) para activar transiciones visuales automáticas entre componentes enrutados.

## 🔧 Configuración

```ts
// ✅ app.config.ts – Configuración principal de Angular
export const appConfig: ApplicationConfig = {
  providers: [
    // Habilita los listeners de errores globales del navegador
    provideBrowserGlobalErrorListeners(),

    // Activa Zone.js con optimización de eventos (coalescing)
    provideZoneChangeDetection({
      eventCoalescing: true
    }),

    // Configura rutas y transiciones visuales entre vistas
    provideRouter(
      routes,
      withViewTransitions({
        // 🚫 Evita que se aplique la transición inicial
        skipInitialTransition: true,

        // 📊 Callback que se ejecuta cuando se crea una transición
        onViewTransitionCreated(transitionInfo: ViewTransitionInfo) {
          console.log(transitionInfo);
        }
      })
    )
  ]
};
```

### 📘 Tabla resumen de funciones utilizadas

| Función                                                 | Propósito                                                                 |
| ------------------------------------------------------- | ------------------------------------------------------------------------- |
| `provideBrowserGlobalErrorListeners()`                  | Captura errores como `unhandledrejection` o `error` a nivel de navegador. |
| `provideZoneChangeDetection({ eventCoalescing: true })` | Agrupa eventos asincrónicos para optimizar la detección de cambios.       |
| `withViewTransitions({...})`                            | Habilita transiciones visuales suaves entre rutas o vistas.               |
| `skipInitialTransition: true`                           | Evita aplicar la transición en la primera carga del app.                  |
| `onViewTransitionCreated()`                             | Callback para inspeccionar detalles de la transición (tipo, duración).    |


## 🎨 Personalización en CSS (opcional)

```css
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 400ms;
  animation-timing-function: ease-in-out;
}
```

### Ejemplo:

Compontente Start:
```typescript
import { Component } from '@angular/core';
import {TitleComponent} from '@shared/title/title.component';

@Component({
  selector: 'app-view-transition',
  imports: [
    TitleComponent
  ],
  template: `
    <shared-title [title]="'View Trnasition 1'"></shared-title>


    <section class="flex justify-start">
      <img srcset="https://picsum.photos/id/237/200/300"
           alt="Picsum"
           width="200"
           height="300"
           style="view-transition-old:hero1"/>

      <div class="fixed bottom-10 left-70 bg-blue-800 w-32 h-32 rounded"
           style="view-transition-name:hero1"></div>
    </section>
  `,
  styles: ``
})
export default class ViewTransition1Component {

}
```

Componente End:

```typescript
import { Component } from '@angular/core';
import {TitleComponent} from '@shared/title/title.component';

@Component({
  selector: 'app-view-transition',
  imports: [
    TitleComponent
  ],
  template: `
    <shared-title [title]="'View Trnasition 2'"></shared-title>


    <section class="flex justify-end">
      <img srcset="https://picsum.photos/id/237/200/300"
           alt="Picsum"
           width="200"
           height="300"
           style="view-transition-name:hero2"
      />

      <div class="bg-blue-500 w-56 h-56"
           style="view-transition-name(hero2)"></div>
    </section>
  `,
  styles: ``
})
export default class ViewTransition2Component {

}
```
## ⚠️ Consideraciones

* Funciona solo en navegadores que soportan la View Transitions API (como Chrome y Edge).
* No disponible en SSR o en navegadores antiguos.


Soporte [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)

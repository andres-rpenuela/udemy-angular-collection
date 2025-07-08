# 🛠️ Angular ApplicationConfig con View Transitions, HTTP y Detección de Cambios

## 🧩 app.config.ts – Configuración completa

```ts
import {
  ApplicationConfig,
  importProvidersFrom,             // 👉 Forma tradicional de importar módulos
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';

import {
  provideRouter,
  ViewTransitionInfo,
  withViewTransitions
} from '@angular/router';

import {
  HttpClient,
  provideHttpClient,              // ✅ Nueva API funcional
  withFetch,
  withInterceptors
} from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Captura errores globales del navegador
    provideBrowserGlobalErrorListeners(),

    // Optimiza la detección de cambios con agrupamiento de eventos
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Rutas con transiciones visuales suaves
    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true,   // Evita animación al iniciar
        onViewTransitionCreated(transitionInfo: ViewTransitionInfo) {
          console.log(transitionInfo); // Log de información sobre la transición
        }
      })
    ),

    // OPCIÓN 1: Forma tradicional
    // importProvidersFrom(HttpClient),

    // ✅ OPCIÓN 2: Nueva forma funcional moderna
    provideHttpClient(
      withFetch()
      // ,withInterceptors([loggingInterceptor, authInterceptor])
    )
  ]
};
```

---

## 🆚 Diferencia: `importProvidersFrom()` vs `provideHttpClient()`

| Característica                      | `importProvidersFrom()`                          | `provideHttpClient()`                           |
|------------------------------------|--------------------------------------------------|-------------------------------------------------|
| 📦 Estilo                          | Tradicional (basado en módulos)                 | Funcional y moderno (Angular Standalone APIs)   |
| ✅ Uso                             | `importProvidersFrom(HttpClient)`              | `provideHttpClient(...)`                        |
| 🧱 Modularidad                     | Requiere importar `HttpClientModule`            | No necesita módulos, solo funciones             |
| 🚀 Eficiencia                      | Carga completa del módulo                       | Permite tree-shaking más efectivo               |
| 🧩 Interceptores                   | Necesita módulo y configuración manual          | Se agregan fácilmente con `withInterceptors()`  |
| 🧪 Recomendado desde Angular 15+   | ❌ Solo para proyectos legacy                    | ✅ Ideal para nuevos proyectos                   |

---

### ✅ Recomendación

Usa `provideHttpClient()` en nuevos proyectos o cuando adoptes `Standalone Components`.  
Mantén `importProvidersFrom()` solo si estás migrando desde un enfoque basado en módulos.

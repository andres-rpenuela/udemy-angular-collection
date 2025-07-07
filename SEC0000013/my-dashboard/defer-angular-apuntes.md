
# 🌀 `@defer` en Angular (v17+)

La directiva `@defer` permite cargar contenido de forma **diferida** (lazy load) en Angular **de forma declarativa**, mejorando el rendimiento de la aplicación sin necesidad de gestionar manualmente `*ngIf`, `ngComponentOutlet`, ni `loadChildren`.

Las opciones disponibles son:
```angular181html
@defer (
  when <condición>         ✅ Defer por condición booleana
  on idle                  ✅ Defer cuando el navegador está inactivo
  on viewport              ✅ Defer cuando el elemento entra en pantalla
  on interaction <selector> ✅ Defer tras interacción con elemento (nuevo en Angular 18+)
  prefetch                 ✅ Pre-carga el bloque aunque no se muestre aún
  minimum <tiempo>         ✅ Tiempo mínimo antes de mostrar contenido
  timeout <tiempo>         ✅ Tiempo máximo para fallback (placeholder/error)
)
<!-- Contentido diferido -->
@placeholder {
<p>Cargando gráfico...</p>
} @error {
<p>Error al cargar.</p>
} @loading {
<p>Preparando recurso...</p>
} @done {
<p>¡Carga completa!</p>
}
```
---

## ✅ ¿Para qué sirve?

- ⚡ Mejora el rendimiento inicial (menor tiempo de carga)
- 📦 Reduce el tamaño del bundle cargado inicialmente
- 🧩 Carga componentes solo cuando son necesarios

---

## 🧩 Sintaxis básica

```html
@defer (when condición) {
  <!-- Contenido cargado diferidamente -->
}
```

---

# 🚀 Triggers en `@defer` – Angular 17+

Los **triggers** (disparadores) determinan **cuándo se carga** el bloque `@defer`.

---

## ✅ Triggers disponibles

| Trigger                     | ¿Qué hace?                                                                 |
|-----------------------------|-----------------------------------------------------------------------------|
| `when <condición>`          | Carga el contenido cuando se cumple una condición booleana (`true`).        |
| `on idle`                   | Espera a que el navegador esté inactivo para cargar (ideal para no críticos). |
| `on viewport`              | Carga cuando el elemento entra en el **viewport** (lazy loading visual).     |
| `on interaction <selector>`| Carga después de que el usuario interactúa con el selector (Angular 18+).     |

---

## 🔄 Otros modificadores

| Modificador       | ¿Qué hace?                                                                             |
|-------------------|-----------------------------------------------------------------------------------------|
| `prefetch`        | Pre-carga el contenido en segundo plano (antes de mostrarlo).                          |
| `minimum <tiempo>`| Espera al menos X tiempo antes de mostrar el contenido (`500ms`, `1s`, etc.).           |
| `timeout <tiempo>`| Lanza `@error` o `@placeholder` si el contenido no carga tras X tiempo.                |

---

## 📦 Ejemplo completo con triggers

```html
@defer (when showWidget; prefetch; minimum 300ms; timeout 2s) {
<lazy-widget></lazy-widget>
} @placeholder {
<p>⏳ Cargando...</p>
} @error {
<p>❌ Error al cargar el widget</p>
}
```

## 🚀 Modos de uso de `@defer`

### 1. `when`
Carga el bloque cuando la condición se cumple.

```html
@defer (when isReady) {
  <app-widget></app-widget>
}
```

---

### 2. `on idle`
Carga el contenido cuando el navegador está inactivo (idle).

```html
@defer (on idle) {
  <non-critical-section></non-critical-section>
}
```

---

### 3. `on viewport`
Carga el contenido cuando el bloque entra al viewport (scroll lazy load).

```html
@defer (on viewport) {
  <footer-component></footer-component>
}
```

---

---

## 🧪 Bloques opcionales

Puedes agregar bloques para controlar el comportamiento durante la carga o si ocurre un error:

| Bloque         | Propósito                                                          |
| -------------- | ------------------------------------------------------------------ |
| `@placeholder` | Se muestra mientras se carga el contenido (loading state)          |
| `@loading`     | Similar a `@placeholder` pero más específico para procesos lentos  |
| `@error`       | Se muestra si el contenido no se pudo cargar                       |
| `@done`        | Se ejecuta al terminar la carga exitosamente (opcional, tipo hook) |


```html
@defer (when loadChart) {
  <lazy-chart></lazy-chart>
} @placeholder {
  <p>Cargando gráfico...</p>
} @error {
  <p>Error al cargar.</p>
} @loading {
  <p>Preparando recurso...</p>
} @done {
  <p>¡Carga completa!</p>
}
```

```html
@defer (when showDetails; prefetch; minimum 500ms; timeout 2s) {
  <user-details></user-details>
} @placeholder {
  <p>⏳ Cargando detalles...</p>
} @error {
  <p>❌ Error al cargar.</p>
} @done {
  <p>✅ Componente cargado.</p>
}
```
---

## 🛠️ Requisitos

- Angular 17 o superior
- Componentes **standalone** (sin módulos tradicionales)
- El contenido del bloque `@defer` debe ser **un solo elemento**: un componente o elemento HTML

---

## 📋 Ejemplo completo

```html
<button (click)="loadDetails = true">Mostrar detalles</button>

@defer (when loadDetails) {
  <details-card></details-card>
} @placeholder {
  <p>Cargando detalles...</p>
} @error {
  <p>Ocurrió un error al cargar.</p>
}
```

---

## 🎯 Ventajas

- 🧼 Código más limpio y declarativo
- ⚙️ Menor complejidad que `*ngIf` + `ngComponentOutlet`
- 📉 Mejora el rendimiento en SPAs grandes

---

## 📌 Buenas prácticas

- Usa `@defer (on idle)` para cargar partes no críticas del UI
- Usa `@defer (on viewport)` para secciones como el `<footer>`
- Agrega `@placeholder` para mejorar la experiencia del usuario

---

## 🆚 Diferencia entre `on idle` y `on viewport` en `@defer`

| Característica            | `@defer (on idle)`                                                  | `@defer (on viewport)`                                               |
|---------------------------|----------------------------------------------------------------------|----------------------------------------------------------------------|
| 🧠 ¿Cuándo se ejecuta?    | Cuando el navegador está **inactivo** (`idle`)                       | Cuando el contenido entra en el **viewport** (pantalla visible)     |
| 📦 ¿Qué optimiza?         | Carga **no crítica**, después de que lo principal ya se procesó     | Carga **perezosa** según el **scroll** del usuario                  |
| 🔄 Basado en              | **Tiempo** (espera a que haya recursos libres)                      | **Posición en pantalla** (observa visibilidad)                      |
| 📍 Ideal para             | Secciones poco urgentes: `<chat-widget>`, `<feedback-form>`         | Componentes visuales al fondo: `<footer>`, `<ads>`                 |
| 👁️ ¿Visible al inicio?   | No necesariamente visible al usuario                                 | Se carga **solo si llega a ser visible**                            |
| ⚙️ Mecanismo interno      | `requestIdleCallback()` o similar                                    | `IntersectionObserver`                                              |


---

## 📚 Más info

Consulta la documentación oficial: [https://angular.dev/guide/defer-blocks](https://angular.dev/guide/defer-blocks)

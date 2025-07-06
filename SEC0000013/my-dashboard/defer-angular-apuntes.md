
# 🌀 `@defer` en Angular (v17+)

La directiva `@defer` permite cargar contenido de forma **diferida** (lazy load) en Angular **de forma declarativa**, mejorando el rendimiento de la aplicación sin necesidad de gestionar manualmente `*ngIf`, `ngComponentOutlet`, ni `loadChildren`.

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

## 🧪 Bloques opcionales

Puedes agregar bloques para controlar el comportamiento durante la carga o si ocurre un error:

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

## 📚 Más info

Consulta la documentación oficial: [https://angular.dev/guide/defer-blocks](https://angular.dev/guide/defer-blocks)

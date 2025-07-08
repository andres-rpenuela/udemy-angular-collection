# 🔁 Signals en Angular + `toSignal()`

Desde Angular 16, el framework introduce un sistema **reactivo basado en Signals**: una forma más simple y eficiente de gestionar estado reactivo sin RxJS.

---

## 📌 ¿Qué es un Signal?

Un **Signal** es una función reactiva que contiene un valor. Cuando ese valor cambia, Angular puede reaccionar y actualizar la vista automáticamente.

```ts
import { signal } from '@angular/core';

const count = signal(0);

console.log(count()); // 0

count.set(5);
console.log(count()); // 5
```

---

## 🧠 ¿Por qué usar Signals?

- ✅ Más simples que RxJS
- 🔄 Reactividad automática y eficiente
- 🧩 Integración con `computed()` y `effect()`
- ❌ No necesitas suscribirte ni hacer `unsubscribe`

---

## 📦 Tipos de Signals

| Función        | Descripción                                                                 |
|----------------|------------------------------------------------------------------------------|
| `signal()`     | Crea un nuevo signal                                                         |
| `computed()`   | Crea un signal derivado de otros signals                                     |
| `effect()`     | Ejecuta una función cuando cambia algún signal                               |
| `toSignal()`   | Convierte un Observable en un Signal                                         |

---

## ✨ Ejemplo completo de uso

```ts
import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  signals: true,
  template: \`
    <h1>{{ doubled() }}</h1>
    <button (click)="increment()">Increment</button>
  \`
})
export class CounterComponent {
  count = signal(0);
  doubled = computed(() => this.count() * 2);

  constructor() {
    effect(() => console.log('New count:', this.count()));
  }

  increment() {
    this.count.update(v => v + 1);
  }
}
```

---

## 🔄 `toSignal()`

Convierte un `Observable<T>` en `Signal<T>` para integrarlo con el sistema reactivo de Angular.

```ts
import { toSignal } from '@angular/core/rxjs-interop';

const data$ = http.get<User[]>('/api/users');
const users = toSignal(data$); // Signal<User[] | undefined>
```

### Con valor inicial:

```ts
const users = toSignal(data$, { initialValue: [] });
```

### Con `requireSync: true`:

```ts
const users = toSignal(data$, { requireSync: true });
// Solo funciona si el observable emite de forma síncrona.
```

---

## 🧪 Caso real: servicio

```ts
@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private user$ = this.http.get<User[]>('/api/users');

  users = toSignal(this.user$, { initialValue: [] });
}
```

---

## ✅ Recomendaciones

- Usa `signal()` para estado local simple
- Usa `computed()` para lógica derivada
- Usa `effect()` para ejecutar efectos secundarios
- Usa `toSignal()` para convertir Observables en Signals
- Ideal para componentes standalone (`signals: true`)

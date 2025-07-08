
# 🔐 Diferencias entre los diferentes tipos de acceso privado de propieades en TypeScript/Angular
## Ejemplo:  `#state`, `_state` y `private state`

Cuando trabajamos con clases en Angular o TypeScript, es común encontrar distintas formas de declarar propiedades privadas o internas. Estas son las diferencias entre `#state`, `_state` y `private state`:

---

## 📊 Comparación rápida

| Forma              | Visibilidad           | Acceso desde fuera | Especificación      | Comentarios |
|--------------------|------------------------|---------------------|----------------------|-------------|
| `#state`           | `private` (verdadero)  | ❌ No accesible     | ECMAScript estándar | Solo disponible en navegadores modernos y herramientas que lo soporten (como Babel, tsconfig moderno). |
| `_state`           | Convención (no real)   | ⚠️ Sí accesible     | No es estándar       | Usado como convención para propiedades que **deberían** ser privadas. No impide acceso realmente. |
| `private state`    | `private` (TypeScript) | ❌ No accesible     | TypeScript           | Se compila a JavaScript, pero no es privado en tiempo de ejecución. Seguridad en tiempo de desarrollo. |

---

## 📦 Ejemplo en código

```ts
class Counter {
  #strictState = 0;           // ECMAScript Private Field
  private tsState = 0;        // TypeScript private field
  _fakePrivateState = 0;      // No es privado, solo convención

  increment() {
    this.#strictState++;
    this.tsState++;
    this._fakePrivateState++;
  }
}
```

---

## 🚫 Acceso externo

```ts
const c = new Counter();

// ❌ Error (verdadero encapsulamiento)
console.log(c.#strictState);   // ❌ SyntaxError

// ❌ Error en TypeScript (pero se compila a JS sin seguridad)
console.log(c.tsState);        // ❌ Property 'tsState' is private

// ⚠️ Accesible (aunque no deberías)
console.log(c._fakePrivateState); // ✅ 0
```

---

## ✅ Recomendaciones de uso

| Caso                                | Recomendación             |
|-------------------------------------|---------------------------|
| Angular / TypeScript                | Usa `private` (seguro en TS) |
| JavaScript moderno con soporte ES   | Usa `#campoPrivado` (si tu entorno lo permite) |
| Proyectos mixtos o antiguos         | Usa `_campo` solo como convención |

---

¡Escoge el nivel de privacidad adecuado según tu proyecto y entorno de ejecución!

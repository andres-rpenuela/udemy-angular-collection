
# 🌐 Peticiones HTTP en Angular con HttpClient

Angular ofrece el módulo `HttpClient` para realizar llamadas HTTP de forma sencilla y tipada.

---

## ✅ 1. Importar el módulo necesario

Primero, asegúrate de haber importado `HttpClientModule` en tu aplicación.

```ts
// app.config.ts o app.module.ts
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient()
  ]
};
```

---

## 📥 2. Hacer una petición GET

```ts
constructor(private http: HttpClient) {}

this.http.get<User[]>('https://api.example.com/users')
  .subscribe((data) => console.log(data));
```

---

## 📤 3. Enviar una petición POST

```ts
const newUser = { name: 'Alice', email: 'alice@example.com' };

this.http.post('https://api.example.com/users', newUser)
  .subscribe((response) => console.log(response));
```

---

## 📎 4. Añadir Headers

```ts
const headers = new HttpHeaders({
  'Authorization': 'Bearer token123',
  'x-api-key': 'reqres-free-v1'
});

this.http.get('https://api.example.com/users', { headers })
  .subscribe(console.log);
```

---

## 🔍 5. Enviar Query Params

```ts
const params = new HttpParams()
  .set('page', '2')
  .set('limit', '10');

this.http.get('https://api.example.com/users', { params })
  .subscribe(console.log);
```

---

## 🛑 6. Manejo de errores

```ts
this.http.get('https://api.example.com/users')
  .pipe(
    catchError((error) => {
      console.error('Error en la petición', error);
      return throwError(() => error);
    })
  )
  .subscribe();
```

---

## 🧪 7. Ejemplo completo

```ts
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

constructor(private http: HttpClient) {}

loadUsers() {
  const headers = new HttpHeaders({ 'x-api-key': 'reqres-free-v1' });
  const params = new HttpParams().set('page', '1');

  this.http.get('https://reqres.in/api/users', { headers, params })
    .subscribe((res) => console.log(res));
}
```

---

## 🧩 Recomendaciones

- Usa **interfaces** para tipar tus respuestas.
- Implementa **interceptores** para manejar autenticación global.
- Usa `async pipe` para trabajar con `Observables` directamente en la vista.

# Configuración de nombres personalizados para esquemáticos en Angular

Para que Angular CLI genere archivos con el formato `[nombre].tipo.ts` como `login.service.ts`, `auth.interceptor.ts`, `admin.guard.ts`, etc., se puede configurar el archivo `angular.json` o `ng.json` de la siguiente forma.

---

## 🛠 Ejemplo de configuración

Agrega o modifica la sección `schematics` dentro de tu configuración de proyecto o a nivel global para que se vea así:

```json
"schematics": {
  "@schematics/angular:class": {
    "skipTests": true,
    "type": "class"
  },
  "@schematics/angular:component": {
    "skipTests": true,
    "type": "component"
  },
  "@schematics/angular:directive": {
    "skipTests": true,
    "type": "directive"
  },
  "@schematics/angular:guard": {
    "skipTests": true,
    "type": "guard"
  },
  "@schematics/angular:interceptor": {
    "skipTests": true,
    "type": "interceptor"
  },
  "@schematics/angular:pipe": {
    "skipTests": true,
    "type": "pipe"
  },
  "@schematics/angular:resolver": {
    "skipTests": true,
    "type": "resolver"
  },
  "@schematics/angular:service": {
    "skipTests": true,
    "type": "service"
  },
  "@schematics/angular:interface": {
    "type": "interface"
  }
}
```

> 📌 **Nota**: Al agregar `"type": "service"` o `"type": "interceptor"` en cada tipo de elemento, Angular CLI automáticamente usará ese sufijo en el nombre del archivo generado.

---

## 💡 Ejemplo de uso

Si ejecutas:

```bash
ng generate service auth
```

Con la configuración anterior, se generará:

```
src/app/auth.service.ts
```

Y si generas un interceptor:

```bash
ng generate interceptor auth
```

Se generará:

```
src/app/auth.interceptor.ts
```

---

## 🔁 Ubicación de la configuración

Puedes agregar esta configuración en:

- A nivel **de proyecto**: dentro de `"projects.<tu-proyecto>.schematics"` en `angular.json`.
- A nivel **global**: usando `ng config` o editando el archivo de configuración global de Angular CLI (`~/.angular-config.json` en versiones modernas).

---

## ✅ Ventajas

- Archivos con nombres consistentes y claros.
- Mejor organización del código.
- Evita tener que renombrar archivos manualmente después de generarlos.

# Configuración de Alias en Angular (tsconfig.json)

Configura alias para rutas de importación en Angular y evita rutas relativas complejas como `../../../`.

---

## ✅ Paso 1: Editar tsconfig.json

Abre el archivo `tsconfig.json` y en la sección `compilerOptions`, agrega:

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@shared/*": ["app/shared/*"],
      "@core/*": ["app/core/*"],
      "@components/*": ["app/components/*"]
    }
  }
}
```

## ✅ Paso 2: (Opcional) Editar tsconfig.app.json
En algunos proyectos, también necesitas añadir los mismos alias en tsconfig.app.json:

```json
Copiar
Editar
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@shared/*": ["app/shared/*"],
      "@core/*": ["app/core/*"],
      "@components/*": ["app/components/*"]
    }
  }
}
```

## 🔄 Paso 3: Reiniciar el servidor de Angular
Después de guardar los cambios, ejecuta:

```bash
ng serve --force
```

## 🧪 Paso 4: Usar los alias en los imports
En lugar de rutas relativas como esta:

```ts
import { NotFoundComponent } from '../../../shared/not-found/not-found.component';
```
Usa:

```ts
import { NotFoundComponent } from '@shared/not-found/not-found.component';
```

## 🎯 Ventajas de usar alias

* 📦 Rutas más limpias y legibles.
* 🔄 Menor riesgo de errores al mover archivos.
* 🧩 Mejor organización del código en proyectos grandes.


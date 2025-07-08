# Instalación de Tailwind CSS con Angular

Guía paso a paso para configurar Tailwind CSS en un proyecto Angular.

> Nota: Version instalada: "@tailwindcss/postcss": "^4.1.11",

---

## 01. Crear el proyecto

Si aún no tienes un proyecto Angular, crea uno con Angular CLI:

```bash
ng new my-project --style css
cd my-project
```

---

## 02. Instalar Tailwind CSS

Instala `tailwindcss`, `@tailwindcss/postcss` y `postcss` con npm:

```bash
npm install tailwindcss @tailwindcss/postcss postcss --force
```

---

## 03. Configurar los plugins de PostCSS

Crea un archivo `.postcssrc.json` en la raíz del proyecto con el siguiente contenido:

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

---

## 04. Importar Tailwind CSS

Agrega la importación de Tailwind en el archivo `./src/styles.css`:

```css
@import "tailwindcss";
```

---

## 05. Iniciar el proceso de desarrollo

Ejecuta el servidor de desarrollo con:

```bash
ng serve
```

---

## 06. Usar Tailwind en tu proyecto

Ahora puedes usar las clases utilitarias de Tailwind en tus componentes:

```html
<!-- app.component.html -->
<h1 class="text-3xl font-bold underline">
  Hello world!
</h1>
```

---

¡Tailwind CSS está listo para usarse en tu proyecto Angular!

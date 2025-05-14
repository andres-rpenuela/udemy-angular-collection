# CountryApp

## Crear la app 

```bash
ng new country-app --style css
cd country-app
```
## Instalar Tailwind 

```bash
npm install tailwindcss @tailwindcss/postcss postcss --force

```

## Configurar PostCSS Plugins

Crear un fichero en la raíz del proyecto, con el nombre '.postcssrc.json',
y añadir la siguiente configuración
```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

## Importar Tailwind CSS
En el fichero de estilos './src/styles.css' cargado en la en 'index.html',
añadir el import de Tailwind CSS

```css
@import "tailwindcss";
```

## Levantar el ser seridor

```bash
ng serve -o --port 4020
```
--- 

# Instalar daisy ui

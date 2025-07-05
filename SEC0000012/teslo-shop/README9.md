# Plan de despliegue

## Base de datos:
Desplegar en bbdd postgre: [neon.com](https://neon.com/)

1. Hacer login
2. Crear un proyecto y seleccionar la version (el back soport v4 14 - 17 )
3. Obtener la cadena de conexión:

```shell
psql 'postgresql://neondb_owner:npg_fJpFZgL02EXb@ep-autumn-credit-a97t0pes-pooler.gwc.azure.neon.tech/neondb?sslmode=require&channel_binding=require'
```



## Backend

1. Subir un el proyecto de nets a un repositio de github
2. Ir al proyecto back y subirlo
```shell
git init

git add .
git commit -m "Backend initial"

git remote add origin https://github.com/andres-rpenuela/nest-teslo-shop-com.git
git branch -M main
git push -u origin main
```

3. Ir a [Render](https://render.com/), hacer login y entrar en la Dashboard
  1. Se recominda que inicie con la misma cuanta de GitHub, esto facilitará la sincronización
4. Seleccionar *Web Services*
5. Seleccionar el repositorio GitHub
6. Seleccionar el plan e insertar las varibles de entonro
  1. Usar la configuracin de pro y cadena de conexión de *neon* para la base de datos.
  2. El JWT_SECRET generar con (o buscar algo similar):
     ```shell
      openssl rand -base64 32
     ```
7. Una vez realizado el deploy (puede mensaje de error si no tiene index.js), abrir postam/navegador y hacer una petición a: https://nest-teslo-shop-com.onrender.com/api
```env

STAGE=prod

DB_PASSWORD=np**
DB_NAME=neo**
DB_HOST=ep-au**
DB_PORT=5432
DB_USERNAME=ne**

PORT=30**
HOST_API=http**

JWT_SECRET=E***
```
Nota: El host_api es usado para las descarga de imagenes, pero esta usado en la aplicacion

## Frontend

1. Añadir el `withHashLocation` en el `appConfig` de la aplicacion, para que todas las rutas cuelque de `#`.

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation() ),
    provideHttpClient(
      withFetch(),
      withInterceptors( [ loggingInterceptor,authInterceptor ] )
    ),
  ]
};
```
2. Añadir la ruta en el enviroment del servidor back
```typescript
export const environment = {
  appName:"Teslo-Shop",
  baseUrl: 'https://nest-teslo-shop-com.onrender.com/api',
  noImage: './assets/images/no-image.jpg'
};
```
3. Generar la aplicacion o subir el proyecto a github y desplegarlo en https://www.netlify.com/
```shell
ng build 
# o 
ng build --configuration=production

```

4. Desplegar la carpeta todo el contneiod de dist en en **netlify**
5. Genear datos en la base de datos: https://nest-teslo-shop-com.onrender.com/api/seed
6. Entrar en nuestro cliente desplegado: https://tiny-concha-980256.netlify.app/#/

## Anexo

Si hay problmeas con Swiper, agregar los estilos en el index.html

```angular181html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>TesloShop</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">

  <!-- https://swiperjs.com/get-started -->
  <!-- swiperjs si se agrega aquí, no hace falta importarlo  en la hoja de estilos donde se usa: import 'swiper/css/bundle';>-->
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
  />
</head>
<body>
  <app-root></app-root>

  <!-- (opcional, y solo poner si no se hace la instlacion de: npm install swiper
  mas infor: https://swiperjs.com/get-started
  -->
  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

</body>
</html>
```

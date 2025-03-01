# hero-page.component.html
```html
<h1>{{ name() }}</h1>

<dl>
  <td>Nombre:</td>
  <dd>{{ name() }}</dd>

  <td>Edad:</td>
  <dd>{{ age() }}</dd>

  <td>Método:</td>
  <dd>{{ getHeroDescription() }}</dd>

  <td>Capitalizado:</td>
  <!-- ! Intentar  -->
  <!-- <dd> {{ 'Mostrar nombre TODO EN MAYÚSCULAS' }} </dd> -->
</dl>

<button (click)="changeHero()" class="btn btn-primary mx-2">
  Cambiar nombre
</button>

<button class="btn btn-primary">Cambiar edad</button>

<button (click)="resetForm()" class="btn btn-primary mx-2">Reset</button>
```

# Tarea:
Practicar lo aprendido hasta el momento


  1. Colocar esta importación del Bootstrap en el `index.html`
```
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
```

  2. Crear el componente de Angular correspondiente para este archivo:
  `src/app/pages/hero/hero-page.component.html`
  * El contenido del HTML está en este GIST también
   
  

  3. Crear la ruta respectiva en el app.routes.ts
  ```
    {
      path: '/hero',
      component: HeroPageComponent
    }
  ```
    * Recuerden importar el componente en el app.routes.ts
    * Navegar al URL: https://localhost:4200/hero


  3. Crear dos señales con los valores de Ironman y 45 respectivamente.
  ```
    name => string  = 'Ironman'
    age => number = 45
   ```

  4. Crear un método llamado: getHeroDescription
  Debe de regresar la concatenación del nombre y la edad.
  ```
  getHeroDescription
    return `${ name } - ${ age }`;
  ```

  5. Implementar el método changeHero, no recibe argumentos y lo cambia a:
  ```
  name = Spiderman
  age = 22
  ```

  6. Implementar el método: resetForm, el cual establece
  
  ```
  name = Ironman 
  age = 45
  ```
  7. Implementar el método: chageAge, asignalor al evento click del botón respectivo.
  ```
  cambia la edad a 60
  ```

  8. Extra:
  Tratar de mostrar el nombre (name) capitalizado en mayúscula sin crear una nueva señal.
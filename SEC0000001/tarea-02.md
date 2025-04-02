# Tarea 02: RouterLinks

1. Dentro de Pages:
    1. Crear el componente dragonball-page.ts|html|css

2. Crear la ruta: /drangoball

3. Agregarlo al Navbar


# dragonball-page.component.html
En la vista html añadir el siguiente codigo
```html
<h1>DragonBall Page</h1>
<hr>

<section class="row">
  <div class="col-12 col-sm-6">
    <h3>Agregar:</h3>
    <input type="text" class="form-control" placeholder="Nombre" />
    <input type="number" class="form-control" placeholder="Poder"/>
    <button class="mt-2 btn btn-primary">Agregar</button>
  </div>

  <div class="col-12 col-sm-6">
    <h3>Listado</h3>
    <ol>
      <li>Goku</li>
      <li>Goku</li>
      <li>Goku</li>
      <li>Goku</li>
      <li>Goku</li>

    </ol>
  </div>
</section>
``` 
# Paginacion

# 📄 Índice - Documentación de Paginación

1. [Respuesta del Back](#respuesta-del-back)
2. [Petición al Back](#petición-al-back)
3. [Subcripción a la Petición con `rxResource`](#subcripción-a-la-petición-con-rxresource)
4. [Vista con Paginación y Listado de Productos](#cargando-el-componente-de-paginacion-en-la-vista-coon-los-elementos-a-paginar)
5. [Componente de Paginación](#logina-del-componente-de-paginación)
   5.1. [Lógica del Componente](#logina-del-componente-de-paginación)
   5.2. [Vista del Componente](#vista-del-componente-de-paginación)
6. [Servicio de Paginación](#servicio-de-paginación)


```plaintext
┌──────────────────────────────────────────────────────┐
│ [ 1 ] [ 2 ] [ 3 ] [ 4 ] [ 5 ]                        │  ← Componente de paginación (botones)
│                                                      │
│ [Selector: 10 | 20 | 50 | 100 por página]            │  ← Select para cambiar límite
│                                                      │
│ ┌──────────────────────────────────────────────────┐ │
│ │ Producto 1   | Producto 2   | Producto 3         │ │
│ │ Producto 4   | Producto 5   | Producto 6         │ │
│ │ Producto 7   | Producto 8   | Producto 9         │ │
│ └──────────────────────────────────────────────────┘ │
│  ← Tabla o grilla de productos                       │
└──────────────────────────────────────────────────────┘
``` 

---- 

## Respuesta del Back

```json
{
  page: number,
  count: number,
  data: any[]
}
```

Donde:
* count: es el total de productos
* pages: es la página actual

Para controlar qué elementos traer del backend, se utilizan dos parámetros clave:

* limit : Indica cuántos elementos mostrar por página.
  * Ejemplo: limit = 9 → el backend devolverá máximo 9 productos.

* offset :Indica cuántos elementos saltarse desde el inicio.

> **Nota:** El cálculo de `offset` y `limit` **ya está automatizado** en el flujo del frontend.  
> Estos valores se pasan como parámetros al método que realiza la petición HTTP —en este caso, al componente `products.component.ts`, que invoca al método `getProducts()` mediante la suscripción con `rxResource`.
> ver: `3. [Subcripción a la Petición con `rxResource`](#subcripción-a-la-petición-con-rxresource)

### Ejemplo práctico
Se calcula según la página actual:
Si estás en la página 3 y limit = 9:

```plaintext
Página actual = 3
limit = 9
offset = (3 - 1) * 9 = 18
```
Entonces el backend devolverá los productos desde el 19 al 27 (elementos 18 al 26, índice base 0).

### Boceto para apuntes
```plaintext
[ Página 1 ]
offset = (1 - 1) * 9 = 0
→ devuelve productos 0 al 8
```

```plaintext
[ Página 2 ]
offset = (2 - 1) * 9 = 9
→ devuelve productos 9 al 17
```
```plaintext
[ Página 3 ]
offset = (3 - 1) * 9 = 18
→ devuelve productos 18 al 26
```
### Visualización tipo rejilla (por página)
```plaintext
┌───────────── Página 3 ─────────────┐
│ Producto 19 │ Producto 20 │ ...   │
│ Producto 25 │ Producto 26 │       │
└───────────────────────────────────┘
Limit = 9 | Offset = 18
````

> Nota:
> Asegúrate de que offset y limit estén sincronizados con el selector de página y de cantidad.
> Siempre valida que offset + limit no exceda el total de elementos disponibles.

##  Petición al Back

```typescript
public getProducts(options:ProductRequestParams) : Observable<ProductResponse>{
  console.log("Get Products, params: "+options)
  //const urlRequest= `${this.PATH_BASE}/products`
  const urlRequest= `${BASE_URL}/products`

  // desuctucutra, y si no esta asigna un valor por defecto
  const  { limit = 9, offset = 0, gender = '' } = options;
  
  return this.http.get<ProductResponse>(urlRequest,
    {
      params:{
        limit: limit,
        offset: offset,
        gender: gender
      }
    })
    .pipe(
      delay(1000), // Espera la cantidad de milisegundos
      // mostrar respuesta
      tap( (resp) => console.log(resp) ),
      catchError(err => { // en Angular 16+, capturar error y personalizado, es opcional esta opcion
        console.error('Error al buscar productos:', err);
        return throwError( () => new Error("'Error al buscar productos",err));
      }),
    );
}
```
## Subcripción a la petición con rxResource 

### Cargando el componente de paginacion en la vista coon los elementos a paginar 
```angular181html
<!-- paginacion -->
<div>
  <shared-pagination
    [pages]="productsResource.value()?.pages ?? 0"
    [currentPage]="paginationService.currentPage()"
    ></shared-pagination>

  <select class="select select-bordered w-full md:w-auto " (change)="productsPerPage.set(+selectLimit.value)" #selectLimit>
    <option value="10" selected>10 por página</option>
    <option value="20">20 por página</option>
    <option value="50">50 por página</option>
  <option value="100">100 por página</option>
  </select>
</div>

<!-- Listado -->
<product-table [productsInput]="productsResource.value()?.products ?? []"></product-table>
```
### Subcripción a la petición con rxResource
```typescript
private productService = inject(ProductsService);
protected paginationService = inject(PaginationService);
protected productsPerPage = signal<number>(10);

productsResource = rxResource({
  params: () => ({
    limit: this.productsPerPage(),
    page: this.paginationService.currentPage() - 1
  }),
  stream: ( { params: {limit, page } } ) =>
    this.productService.getProducts( {offset: page*9, limit: limit} )
});
```

## Componente de la paginación + Serivicio de paginación

Visualiza los botones de paginación.
Añade al patch el numero de la página acutal
### Logina del componente de paginación
```typescript
@Component({
  selector: 'shared-pagination',
  imports: [
    RouterLink
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {

  currentPage = input<number>(1);
  pages = input(0);

  // una vez inicialidad se trabaja como una señal normal y correinte, si currentPage cambia, activePage no cambia
  activePage = linkedSignal( () => this.currentPage() ?? 1 );

  /**
   * this.pages()
   *  → es una señal que devuelve un número, por ejemplo 5.
   *
   * Array.from({ length: this.pages() })
   *  → crea un array vacío de esa longitud. Por ejemplo, si pages() === 5, entonces se crea:
   * [empty × 5]
   *
   * El segundo parámetro de Array.from es una función map:
   * (_, i) => i + 1
   * _ es el valor, que en este caso, no se define
   * i es el índice del array (0, 1, 2, 3, 4)
   *
   * **Nota**:  En JavaScript y TypeScript, el guion bajo (_) es solo un nombre de variable como cualquier otro, pero se usa por convención cuando no necesitas ese valor.
   *
   * Resultado final: [1, 2, 3, ..., this.pages()]
   * Por ejemplo, si this.pages() === 5, el resultado será: [1, 2, 3, 4, 5]
   */
  getPagesList = computed( () => {
    return Array.from({ length: this.pages() }, (_,i) => i+1);
  });

}
```

### Vista del componente de paginación
Usa DisayUI para mostrar los botones de paginación.

> _Nota_: Añade al patch el numero seleccional (`page`) de la página acutal (`rotuerLink=[]`), con queryParams.
```angular181html
<div class="join flex justify-center items-center mt-4 mb-10">
  @for( page of getPagesList(); track page){
    <button class="join-item btn"
            [class.btn-primary]="page === activePage()"
            [routerLink]="[]"
            [queryParams]="{page: page}"
            (click)="activePage.set(page)"
    >
      {{page}}
    </button>
  } @empty {
    <p>No hay páginas</p>
  }
</div>

```

### Servicio de paginación
Lee el patch de la URL, obtiente el parametro 'page' y lo convierte en un signal.
Por defecto el valor es 1.

```typescript
@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private activateRoute = inject(ActivatedRoute);

  // Read of path the param 'query'
  public currentPage = toSignal( this.activateRoute.queryParamMap
      .pipe(
        map( (params) => params.get('page') ? +params.get('page')! : 1),
        map( page => isNaN(page)? 1 : page)
      ),
    {
      initialValue: 1
    }
  );

  constructor() { }
}
```

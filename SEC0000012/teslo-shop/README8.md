# Cargar imangenes 

## Input + Visualiar precarga
```angular181html
<div>
  <product-carousel [images]="product().images" />
  <input type="file" multiple
         accept="image/*"
         (change)="onFilesChanged($event)" class="file-input file-input-bordered w-full mt-4" />

  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
    @for( image of imagesTemp(); track $index){
      <img [src]="image" alt="Image Temporal" class="w-full object-cover rounded-xl">
    }
  </div>
</div>
```

## Extraer la infor del input y cargara en las variables
```typescript
 // Images
onFilesChanged(event: Event) {
  // obtenemos los elementos insertado en el input y se guarda en una propiedad
  const files : FileList | null = (event.target as HTMLInputElement).files;
  this.fileList = files ?? undefined;
  console.log({files});

  // obtiente una url + se añade las rutas a una señal 
  const imageUrl : string[] = Array.from( files ?? [] ).map( file => URL.createObjectURL(file) );
  this.imagesTemp.set( imageUrl );
  console.log({imageUrl});
}
```

## Mostar las imanages cargadas (no subidas al servidro)
Crear una señal computada, con las imanages del producto + las imanges temporales:
```typescript
currentImages = computed( () =>{
  return [...this.product().images, ...this.imagesTemp() ];
})
```

En la vista, cargar el valor de la señal computada en el carrusel de imagenes:
```angular181html
 <product-carousel [images]="currentImages()" />
```

#### Reinicar swiper (OPCIONAL)
Si se usa swiper (_libreria de terceros_), se debe refrescar la vista cuando cambie la señal de entrada, para ello:
* Se crea un metodo que inicialice el elemenot "swiperDiv" cuando carge la vista y guardarlo en una propiedad.
* Cuando se produce un cambio en la propeidad del compoente "swiper", y no es el primer cambio (_carga de la vista por primera vez_), reinciar el elemento html.
```typescript
import {AfterViewInit, Component, ElementRef, input, OnChanges, SimpleChanges, viewChild} from '@angular/core';

// core version + navigation, pagination modules:
import Swiper from 'swiper';
import {Navigation, Pagination} from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {ProductImagePipe} from '@pipe/product-image-pipe';

@Component({
  selector: 'product-carousel',
  imports: [
    ProductImagePipe
  ],
  templateUrl: './product-carousel.component.html',
  styleUrl: './product-carousel.component.css'
})
export class ProductCarouselComponent implements AfterViewInit, OnChanges{
  images = input.required<string[]>();
  swiperDiv = viewChild.required<ElementRef>('swiperDiv');

  private swiper: Swiper | undefined = undefined;

  ngOnChanges(changes: SimpleChanges) {
    console.log( changes );

    // si no cmaiba la propiedad images, no hacer nada
    if( !changes['images']) return;

    // si es el primer cambio (carga), no hacer nada
    if( changes['images'].firstChange ){
      return;
    }

    //this.swiperInit(changes['images'])
    if( !this.swiper ) return;

    // reiniciar el swiper
    this.swiper.destroy(true,true);
    //this.swiperInit();
    // seguridad para garantizar los puntos opcional del swiper
    const paginationEl = this.swiperDiv().nativeElement?.querySelector('.swiper-pagination');

    // Limpia completamente el contenido HTML del contenedor de paginación.
    paginationEl.innerHTML = '';

    // Espera 100ms y luego vuelve a inicializar el slider Swiper
    setTimeout(() => {
      this.swiperInit();
    },100);
  }

  ngAfterViewInit() {
    const element = this.swiperDiv().nativeElement;

    // si no exite
    if (!element) return;

    console.log({element});
    this.swiperInit();

  }

  public swiperInit(){
    const element = this.swiperDiv().nativeElement;

    // const swiper
    this.swiper = new Swiper(element, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      modules:[
        Navigation, Pagination
      ],
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }
}
```


## Enviar un arreglo de File (FileFiles) al back

```typescript
// Imagenes
public uploadImages(images? : FileList) : Observable<string[]>{

  if( !images ) return of([] as string [] );

// crea un arreglo de observables
const uploadObservables: Observable<string>[] = Array.from( images )
  .map( imageFile => this.uploadImage( imageFile ) );

// await Promise.all(...) < si fueran promeas
//return forkJoin(uploadObservables); // espera a que emita de forma exitosa todos, su uno falla lanza toda la excepción
return forkJoin(uploadObservables).pipe(
  tap(imageNames => console.log(imageNames))
);
}

public uploadImage ( imageFile : File): Observable<string>{
  const urlRequest = `${BASE_URL}/files/product`;

  // clase nativa de JavaScript usada para construir fácilmente pares clave-valor que se pueden enviar con fetch o HttpClient en peticiones POST
  const formData = new FormData();
  formData.append('file', imageFile);

  return this.http.post<FileResponse>(urlRequest, formData)
    .pipe(
      map( response => response.fileName ),
      catchError( error => {
        console.error("No se pudo cargar la imange ",error);
        throw Error(error);
      })
    );
}
```

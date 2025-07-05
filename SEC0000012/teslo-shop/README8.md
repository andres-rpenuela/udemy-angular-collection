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

import {Component, computed, inject, input, OnInit, signal} from '@angular/core';
import {Product} from '@products/interfaces/product.interface';
import {ProductCarouselComponent} from '@products/components/product-carousel/product-carousel.component';
import {FormArray, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormUtils} from '@utils/form-utils';
import {
  FormErrorLabelComponent
} from '@dashboard/pages/product-admin-page/product-details/form-error-label/form-error-label.component';
import {ProductsService} from '@products/services/products.service';
import {firstValueFrom, take} from 'rxjs';
import {Router} from '@angular/router';


@Component({
  selector: 'product-details',
  imports: [
    ProductCarouselComponent,
    ReactiveFormsModule,
    FormErrorLabelComponent
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  public readonly sizes: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  public product = input.required<Product>();
  private productsService = inject(ProductsService)
  private router = inject(Router);

  protected fb = inject(FormBuilder);

  protected wasSaved = signal(false);

  private fileList : FileList | undefined;
  protected imagesTemp = signal([] as string[]);

  public productForm = this.fb.group({
    title: ['',Validators.required ],
    description: ['',Validators.required ],
    slug: ['', [Validators.required, Validators.pattern( FormUtils.slugPattern )] ],
    price: [0, [Validators.required, Validators.min(0)] ],
    stock: [0, [Validators.required, Validators.min(0)] ],
    size: [ [''] ],
    images: this.fb.array([ this.fb.control('')] ), //igual a:  this.fb.array([ this.fb.control('', Validators.required) ]), this.fb.array([ '' ] o ['']
    tags: [''],
    gender: [ 'men', [Validators.required, Validators.pattern(/men|women|kid|unisex/)] ],
  });

  public onSubmit() {
    const isValid = this.productForm.valid;
    console.log('Formulario enviado', this.productForm.value, {isValid});

    // si el formulario no es válido, no se envía
    if (!isValid) {
      this.productForm.markAllAsTouched(); // marca todos los campos como tocados para mostrar los errores
      return;
    }
    const formValue = this.productForm.value;

    // si el formulario es válido, se perpara la data
    // poductLike es un objeto parcial de Product, porque luce como un prodcuto
    // - En este caso: En el formulario los tags es un string, y en el Product es un array de string
    // - En este caso: En el formulario los size es un array de string, y en el Product es un array de string que se llama sizes
    const sizes = formValue.size || [] ; // as string[] para que no de error de tipos
    delete formValue.size;

    const imagesArray = this.productForm.get('images') as FormArray;

    if (!imagesArray) {
      console.warn('El campo images no existe en el formulario');
      this.productForm.addControl('images', this.fb.array([this.fb.control('')]));
    } else {
      imagesArray.clear();
      // Asegúrate de no dejarlo como [null]
      imagesArray.push(this.fb.control('')); // ['']
    }

    const productLike : Partial<Product> = {
      ...(formValue as any), // as any para evitar errores de tipos
      tags: formValue.tags?.toLowerCase()
          .split(',')
          .map(tag => tag.trim()) ?? [], // convierte el string a un array de string
      sizes: sizes, // si size es un array, lo deja como está, si no, lo convierte a un array
    }

    // se crea o actualiza el producto
    console.log('Producto preparado para enviar:', productLike);
    if( this.product().id === 'new' ) {
      // crear proecuto
      this.newProduct(productLike);
    }else{
      this.updatedProduct(productLike);
    }
  }

  // se comvierte a promesa el observable para poder usar async/await
  // y así poder esperar a que se actualice el producto
  // y mostar el mensaje de guardado 2 segudnos (no se usa effecto porque se peude generar un bucle infinito al camibar el valor de wasSaved)
  // la porema no hace falta el subcribe, lo hace internamente
  // Esto se puede hacer concatentado el observable con otro observable, pero es más sencillo con async/await.
  private async updatedProduct(productLike: Partial<Product>) {
    const product = await firstValueFrom(
        this.productsService.updatedProduct(this.product().id!, productLike)
    );
    console.log('Producto actualizado:', product);

    this.wasSaved.set(true); // indica que se guardó el producto
    setTimeout(() => {
      this.wasSaved.set(false); // indica que se guardó el producto
    },2000); // espera 2 segundos para que se vea el mensaje de guardado
    /*
    this.productsService.updatedProduct(this.product().id!, productLike)
      .pipe(
        tap(product => this.productsService.updateProductCache(product)),
        take(1)
      )
      .subscribe(
        product => {
          console.log('Producto actualizado:', product);
        }
      );*/
  }

  private newProduct(productLike: Partial<Product>) {
    this.productsService.createProduct(productLike)
        .pipe(
            take(1)
        )
        .subscribe(
            product => {
              console.log('Producto creado:', product);
              this.router.navigateByUrl(`/admin/product/${product.id}`,{replaceUrl: true});
            }
        );
  }

// inicializa el formulario con los valores del producto
  ngOnInit() {
    // this.productForm.reset(
    //   // Inicializa el formulario con los valores del producto, y como son del mismo tipo haz lo que peudas
    //   this.product() as any
    // )
    this.setFormValue( this.product() );
  }

  // con parcial se indica que los campos son opcionales
  setFormValue( formLike: Partial<Product> ) {
    // as any, para que no se queje de que los tipos no coinciden
    this.productForm.reset(      this.product() as any ); // resetValue resetea todos los campos del formulario, y los inicializa con los valores del producto

    // patchValue permite actualizar solo algunos campos del formulario
    // mientras que resetValue requiere que todos los campos sean proporcionados
    // this.productForm.patchValue( formLike as any ); // no resete el distinctivo, solo los campos que se pasan0

    // si tags es un array, lo convierte a string y los une por comas
    this.productForm.patchValue( {tags: formLike.tags?.join(', ')} );
    this.productForm.patchValue( {size: formLike.sizes} );
  }

  onSizeClick(size: string) {
    // const currentSizes = this.productForm.get('size')?.value || [];
    const currentSizes = this.productForm.value.size || [];

    if(currentSizes.includes(size)) {
      // Si el tamaño ya está seleccionado, lo eliminamos
      currentSizes.splice(currentSizes.indexOf(size), 1);
    }else{
      // Si el tamaño no está seleccionado, lo agregamos
      currentSizes.push(size);
    }

    this.productForm.patchValue({ size: currentSizes });
  }

  protected readonly FormUtils = FormUtils;

  // Images
  onFilesChanged(event: Event) {
    // obtenemos los elementos insertado en el input
    const files : FileList | null = (event.target as HTMLInputElement).files;
    this.fileList = files ?? undefined;
    console.log({files});

    // obtiente una url
    const imageUrl : string[] = Array.from( files ?? [] ).map( file => URL.createObjectURL(file) );
    this.imagesTemp.set( imageUrl );
    console.log({imageUrl});
  }


  currentImages = computed( () =>{
    return [...this.product().images, ...this.imagesTemp() ];
  })

}

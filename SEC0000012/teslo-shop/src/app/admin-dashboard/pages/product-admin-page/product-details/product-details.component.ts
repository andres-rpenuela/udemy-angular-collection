import {Component, inject, input, OnInit} from '@angular/core';
import {Product} from '@products/interfaces/product.interface';
import {ProductCarouselComponent} from '@products/components/product-carousel/product-carousel.component';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormUtils} from '@utils/form-utils';
import {
  FormErrorLabelComponent
} from '@dashboard/pages/product-admin-page/product-details/form-error-label/form-error-label.component';
import {ProductsService} from '@products/services/products.service';


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

  protected fb = inject(FormBuilder);
  ;
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
    const productLike : Partial<Product> = {
      ...(formValue as any), // as any para evitar errores de tipos
      tags: formValue.tags?.toLowerCase()
        .split(',')
        .map(tag => tag.trim()) ?? [] // convierte el string a un array de string
    }

    console.log('Producto preparado para enviar:', productLike);
    this.productsService.updatedProduct( productLike );
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
}

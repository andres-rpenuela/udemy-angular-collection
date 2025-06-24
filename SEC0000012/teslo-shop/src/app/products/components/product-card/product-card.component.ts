import {Component, computed, input, InputSignal, output} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TruncatePipe} from '@pipe/truncate-pipe';
import {Product} from '@products/interfaces/product.interface';
import {ProductImagePipe} from '@pipe/product-image-pipe';

@Component({
  selector: 'product-card',
  imports: [
    RouterLink,
    TruncatePipe,
    ProductImagePipe
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  product : InputSignal<Product> = input.required<Product>();
  idSlugOut  = output<string>();

  imageUrl = computed( () =>{
    if(  this.product().images.length === 0){
      return './assets/images/no-image.jpg'
    }
    return `http://localhost:3000/api/files/product/${ this.product().images[0] }`
  });


  /* se puede usar routeLink o el evento de output para hacer un redirect con this.route.navigate['path',{params} ] en el padre */
  getProductByIdSlug(){
    this.idSlugOut.emit(this.product().slug);
  }
}

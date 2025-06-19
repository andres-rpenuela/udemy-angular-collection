import {Component, computed, input, InputSignal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TruncatePipe} from '@pipe/truncate-pipe';
import {Product} from '@products/interfaces/product.interface';

@Component({
  selector: 'product-card',
  imports: [
    RouterLink,
    TruncatePipe
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  product : InputSignal<Product> = input.required<Product>();

  imageUrl = computed( () =>{
    return `http://localhost:3000/api/files/product/${ this.product().images[0] }`
  })
}

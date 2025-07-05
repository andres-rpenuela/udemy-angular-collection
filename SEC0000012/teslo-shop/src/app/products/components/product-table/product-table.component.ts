import { CurrencyPipe } from '@angular/common';
import {Component, input, InputSignal} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductImagePipe } from '@pipe/product-image-pipe';
import {Product} from '@products/interfaces/product.interface';

@Component({
  selector: 'product-table',
  imports: [ ProductImagePipe, RouterLink, CurrencyPipe ],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent {
  public productsInput : InputSignal<Product[]> = input.required();
}

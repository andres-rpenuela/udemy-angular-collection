import {Component, inject, ResourceRef} from '@angular/core';
import {ProductCardComponent} from '@products/components/product-card/product-card.component';

import {ProductsService} from '@products/services/products.service';
// import {ProductCardComponent} from '../../../products/components/product-card/product-card.component';

import { rxResource } from '@angular/core/rxjs-interop';
import {ProductResponse} from '@products/interfaces/product.interface';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [
    ProductCardComponent,
    JsonPipe
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  private productsService = inject(ProductsService);

  // En Angular 20
  // productsResource = rxResource({
  //   stream: () => { return this.productsService.getProducts() }
  // });
  public productResource: ResourceRef<ProductResponse | undefined> = rxResource({
    stream: ({}) => this.productsService.getProducts( {} )
  });
}

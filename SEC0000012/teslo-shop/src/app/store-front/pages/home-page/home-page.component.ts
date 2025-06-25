import {Component, inject, ResourceRef} from '@angular/core';
import {ProductCardComponent} from '@products/components/product-card/product-card.component';

import {ProductsService} from '@products/services/products.service';
// import {ProductCardComponent} from '../../../products/components/product-card/product-card.component';

import {rxResource, toSignal} from '@angular/core/rxjs-interop';
import {ProductResponse} from '@products/interfaces/product.interface';
import {JsonPipe} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {PaginationComponent} from "@shared/components/pagination/pagination.component";
import {map} from "rxjs";

@Component({
  selector: 'app-home-page',
  imports: [
    ProductCardComponent,
    JsonPipe,
    PaginationComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  private productsService = inject(ProductsService);
  private router = inject(Router);

  private activateRoute = inject(ActivatedRoute);
  // convierte un observable a una señal
  public currentPage = toSignal( this.activateRoute.queryParamMap
    .pipe(
      // comvierte a numero o devuelve 1 si es undefined
      map( params => params.get('page') ? +params.get('page')!:  1 ),
      // comprueba que page sea un numero (devuelv nan, si no es un numero)
      map( page => isNaN(page) ? 1 : page)
    ),
    {
      initialValue: 1
    }
  )


  // En Angular 20
  // productsResource = rxResource({
  //   stream: () => { return this.productsService.getProducts() }
  // });
  // Sin parámetros
  // public productResource: ResourceRef<ProductResponse | undefined> = rxResource({
  //   stream: ({}) => this.productsService.getProducts( {} )
  // });
  // Paginacion
  public productResource: ResourceRef<ProductResponse | undefined> = rxResource({
    params: () => this.currentPage() -1,
    stream: ({params: currentPage}) => this.productsService.getProducts( {offset: currentPage*9} )
  });

  // redirect to page prodcut
  public redirectToProduct(idSlug : string){
    // redirect get /product;idSLug=xxxx
    //this.router.navigate(['/product',{idSlug}])

    this.router.navigate([`/product/${idSlug}`])
  }
}

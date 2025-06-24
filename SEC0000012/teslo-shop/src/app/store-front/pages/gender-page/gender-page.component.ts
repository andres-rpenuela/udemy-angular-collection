import {Component, computed, inject, ResourceLoaderParams, ResourceRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Gender, ProductResponse} from '@products/interfaces/product.interface';
import {rxResource, toSignal} from '@angular/core/rxjs-interop';
import {ProductsService} from '@products/services/products.service';
import {ProductCardComponent} from '@products/components/product-card/product-card.component';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-gender-page',
  imports: [
    ProductCardComponent
  ],
  templateUrl: './gender-page.component.html',
  styleUrl: './gender-page.component.css'
})
export default class GenderPageComponent {

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);

  // read param `gender' of path as signal
  //public gender = toSignal( this.activatedRoute.params.pipe( map( ( { gender }) => gender )) );

  // Convert paramMap observable to signal
  private paramMapSignal = toSignal(this.activatedRoute.paramMap);

  // Create a signal for gender, porque el componente no se destruye, si no el parametro cambia
  public gender = computed(() => this.paramMapSignal()?.get('gender') ??  Gender.Men);

  // Si el valor del parámetro no va a cambiar mientras el componente esté activo
  //public gender = this.activatedRoute.snapshot.params['gender'];



  // redirect to page prodcut
  public redirectToProduct(idSlug : string){
    // redirect get /product;idSLug=xxxx
    //this.router.navigate(['/product',{idSlug}])

    this.router.navigate([`/product/${idSlug}`])
  }

  productResource = rxResource({
    params: () => this.gender(),
    stream: ( { params: gender } ) =>
      this.productsService.getProducts( {gender: gender!})
  });
}

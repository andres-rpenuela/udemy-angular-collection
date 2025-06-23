import {Component, computed, effect, inject, linkedSignal, OnInit, ResourceRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '@products/services/products.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {Product, ProductResponse} from '@products/interfaces/product.interface';
import {ProductCarouselComponent} from '@products/components/product-carousel/product-carousel.component';

@Component({
  selector: 'app-product-page',
  imports: [
    ProductCarouselComponent
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {

  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private route = inject(Router);
  // obtener param de la ruta activa
  private idSlug = linkedSignal( () => this.activatedRoute.snapshot.paramMap.get('idSlug') ?? '' );

  // rxResource prodcutsServices.getProductByIdSlug(idSlug:string):Observable<Product>
  // http://localhost:3000/api/products/chill_pullover_hoodie
  public rxProduct= rxResource({
    params: () => this.idSlug(),
    stream: ( { params: idSlug }) => this.productsService.getProductByIdSlug( idSlug )
  });

  // si no encntra prodcuto, redirige a la pagina not found
  effectNotFound = effect( () =>{
    if( this.rxProduct.error() ) this.route.navigate(['/not-found']);
  })

}

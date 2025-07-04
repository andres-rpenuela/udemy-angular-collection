import {Component, effect, inject, ResourceRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {rxResource, toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {ProductsService} from '@products/services/products.service';
import {Product} from '@products/interfaces/product.interface';
import {ProductDetailsComponent} from '@dashboard/pages/product-admin-page/product-details/product-details.component';

@Component({
  selector: 'app-product-admin-page',
  imports: [
    ProductDetailsComponent
  ],
  templateUrl: './product-admin-page.component.html',
  styleUrl: './product-admin-page.component.css'
})
export class ProductAdminPageComponent {

  private activatedRouter = inject(ActivatedRoute);
  private router = inject(Router);

  private productsService = inject(ProductsService);

  // toSignal convierte un Observable en una señal de Angular, y le el :id del path
  idProduct = toSignal( this.activatedRouter.paramMap.pipe(
    map( params => params.get('id') )
  ), {initialValue: null} )

  redirectEffect = effect( () => {
    if(!this.idProduct() || this.productResource.error() ) {
      this.router.navigateByUrl('/admin/products');
    }
    console.log('ID del producto:', this.idProduct());
  });

  productResource: ResourceRef<Product | undefined> = rxResource({
    params: () => ({
      idSlug: this.idProduct()
    }),
    stream: ( { params: { idSlug } } ) =>
      this.productsService.getProductByIdSlug( idSlug )
  });

}

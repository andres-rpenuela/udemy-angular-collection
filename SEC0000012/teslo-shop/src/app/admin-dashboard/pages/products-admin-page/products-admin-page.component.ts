import {Component, inject, linkedSignal} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {ProductTableComponent} from '@products/components/product-table/product-table.component';
import { ProductsService } from '@products/services/products.service';
import {PaginationComponent} from '@shared/components/pagination/pagination.component';
import {PaginationService} from '@shared/components/pagination/pagination.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-products-admin-page',
  imports: [
    ProductTableComponent,
    PaginationComponent,
    RouterLink
  ],
  templateUrl: './products-admin-page.component.html',
  styleUrl: './products-admin-page.component.css'
})
export class ProductsAdminPageComponent {
  private productService = inject(ProductsService);
  protected paginationService = inject(PaginationService);


  productsResource = rxResource({
    params: () => this.paginationService.currentPage() -1,
    stream: ({params: currentPage}) => this.productService.getProducts( {offset: currentPage*9} )
  });

}

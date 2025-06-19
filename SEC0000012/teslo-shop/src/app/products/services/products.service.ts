import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductResponse} from '@products/interfaces/product.interface';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly  PATH_BASE = 'http://localhost:3000/api';

  private http = inject(HttpClient);

  constructor() { }

  public getProducts() : Observable<ProductResponse>{
    const urlRequest= `${this.PATH_BASE}/products`

    return this.http.get<ProductResponse>(urlRequest)
      .pipe(
        // mostrar respuesta
        tap( (resp) => console.log(resp) )
      );
  }
}

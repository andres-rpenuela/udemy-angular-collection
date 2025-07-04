import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product, ProductResponse} from '@products/interfaces/product.interface';
import {catchError, delay, Observable, of, tap, throwError} from 'rxjs';
import {BASE_URL} from '@products/utils/product.util';
import {ProductRequestParams} from '@products/interfaces/product-request-params.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  //private readonly  PATH_BASE = 'http://localhost:3000/api';

  private http = inject(HttpClient);

  // simulaion de cache
  productsMap = new Map<string,ProductResponse>;
  productMap = new Map<string,Product>;

  constructor() { }

  public getProducts(options:ProductRequestParams) : Observable<ProductResponse>{
    console.log("Get Products, params: "+options)
    //const urlRequest= `${this.PATH_BASE}/products`
    const urlRequest= `${BASE_URL}/products`

    // desuctucutra, y si no esta asigna un valor por defecto
    const  { limit = 9, offset = 0, gender = '' } = options;

    const key = `${limit}-${offset}-${gender}`;
    if( this.productsMap.has(key) ){
      return of( this.productsMap.get(key)! )
    }
    return this.http.get<ProductResponse>(urlRequest,
      {
        params:{
          limit: limit,
          offset: offset,
          gender: gender
        }
      })
      .pipe(
        delay(1000), // Espera la cantidad de milisegundos
        // mostrar respuesta
        tap( (resp) => console.log(resp) ),
        tap( (resp) => this.productsMap.set(key,resp)),
        catchError(err => { // en Angular 16+, capturar error y personalizado, es opcional esta opcion
          console.error('Error al buscar productos:', err);
          return throwError( () => new Error("'Error al buscar productos",err));
        }),
      );
  }

  public getProductByIdSlug(idSlug:string|null):Observable<Product>{
    if(!idSlug) return of();

    if( this.productMap.has( idSlug) ){
      return of(this.productMap.get(idSlug)!);
    }
    const urlRequest= `${BASE_URL}/products/${idSlug}`

    return this.http.get<Product>(urlRequest).pipe(
      delay(1000), // Espera la cantidad de milisegundos
      // mostrar respuesta
      tap( (resp) => console.log(resp) ),
      tap( (resp) => this.productMap.set(idSlug,resp)),
      catchError(err => { // en Angular 16+, capturar error y personalizado, es opcional esta opcion
        console.error('Error al buscar producto:', err);
        return throwError( () => new Error("'Error al buscar producto",err));
      }),
    );

  }

  public updatedProduct(id: string, productLike: Partial<Product>): Observable<Product> {
    console.log('Actualizando producto:', productLike);

    const urlRequest= `${BASE_URL}/products/${id}`;

    // esto permite actualizar el producto o parte del producto
    return this.http.patch<Product>( urlRequest, productLike )
      .pipe(
        catchError(err => {
          console.error('Error al actualizar producto:', err);
          return of();
        }
      ));
  }
}

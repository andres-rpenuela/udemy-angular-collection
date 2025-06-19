import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductResponse} from '@products/interfaces/product.interface';
import {catchError, delay, Observable, tap, throwError} from 'rxjs';
import {BASE_URL} from '@products/utils/product.util';
import {ProductRequestParams} from '@products/interfaces/product-request-params.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  //private readonly  PATH_BASE = 'http://localhost:3000/api';

  private http = inject(HttpClient);

  constructor() { }

  public getProducts(options:ProductRequestParams) : Observable<ProductResponse>{
    //const urlRequest= `${this.PATH_BASE}/products`
    const urlRequest= `${BASE_URL}/products`

    // desuctucutra, y si no esta asigna un valor por defecto
    const  { limit = 9, offset = 0, gender = '' } = options;

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
        catchError(err => { // en Angular 16+, capturar error y personalizado, es opcional esta opcion
          console.error('Error al buscar productos:', err);
          return throwError( () => new Error("'Error al buscar productos",err));
        }),
      );
  }
}

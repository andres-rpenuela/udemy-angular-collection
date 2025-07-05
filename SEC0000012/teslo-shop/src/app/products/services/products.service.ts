import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FileResponse, Product, ProductResponse} from '@products/interfaces/product.interface';
import {catchError, delay, forkJoin, map, Observable, of, tap, throwError} from 'rxjs';
import {BASE_URL} from '@products/utils/product.util';
import {ProductRequestParams} from '@products/interfaces/product-request-params.interface';
import {productEmpty} from '@products/interfaces/data/product-empty.data';

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

  public getProductById(id:string):Observable<Product>{

    if(id === 'new') return of( productEmpty );

    if( this.productMap.has( id) ){
      return of(this.productMap.get(id )!);
    }

    const urlRequest= `${BASE_URL}/products/${id}`

    return this.http.get<Product>(urlRequest).pipe(
      delay(1000), // Espera la cantidad de milisegundos
      // mostrar respuesta
      tap( (resp) => console.log(resp) ),
      tap( (resp) => this.productMap.set(id,resp)),
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

  createProduct(productLike: Partial<Product>) : Observable<Product> {
    console.log('Creando producto:', productLike);

    const urlRequest = `${BASE_URL}/products`;

    // esto permite crear el producto o parte del producto
    return this.http.post<Product>(urlRequest, productLike)
      .pipe(
        tap(product => this.updateProductCache(product,false)), // false porque no es una actualización
        catchError(err => {
            console.error('Error al crear producto:', err);
            return of();
          }
        )
      );
  }

  public updateProductCache( product: Product, isUpdate: boolean = true ): void {
    const id = product.id;
    // Actualiza el producto en el cache del producto individual
    this.productMap.set(id, product);
    if( isUpdate) {
      // Actualiza el producto en el cache de la lista de productos
      // totalCalls = sum(response.products.length) x productsMap.length
      this.productsMap.forEach((response: ProductResponse) => {
        // Reemplaza el producto en la lista de productos en el map
        // si el id del producto coincide con el id del producto que se esta actualizando
        // response.products es un array de productos y igual al resutlado del map
        response.products = response.products.map(currentProduct => {
          return currentProduct.id === id ? product : currentProduct;
        });
      });
    }else{
      this.productsMap.forEach((response: ProductResponse) => {
        // Añade el producto a la lista de productos en el map
        // si el id del producto no existe en la lista de productos
        if (!response.products.some(currentProduct => currentProduct.id === id)) {
          response.products.push(product);
        }
      });
    }
  }

  // Imagenes
  public uploadImages(images? : FileList) : Observable<string[]>{

    if( !images ) return of([] as string [] );

    // crea un arreglo de observables
    const uploadObservables: Observable<string>[] = Array.from( images )
      .map( imageFile => this.uploadImage( imageFile ) );

    // await Promise.all(...) < si fueran promeas
    //return forkJoin(uploadObservables); // espera a que emita de forma exitosa todos, su uno falla lanza toda la excepción
    return forkJoin(uploadObservables).pipe(
      tap(imageNames => console.log(imageNames))
    );
  }

  public uploadImage ( imageFile : File): Observable<string>{
    const urlRequest = `${BASE_URL}/files/product`;

    // clase nativa de JavaScript usada para construir fácilmente pares clave-valor que se pueden enviar con fetch o HttpClient en peticiones POST
    const formData = new FormData();
    formData.append('file', imageFile);

    return this.http.post<FileResponse>(urlRequest, formData)
      .pipe(
        map( response => response.fileName ),
        catchError( error => {
          console.error("No se pudo cargar la imange ",error);
          throw Error(error);
        })
      );
  }
}

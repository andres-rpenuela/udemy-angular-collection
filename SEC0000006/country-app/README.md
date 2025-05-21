# CountryApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


----

# Observables

# Peticion Get

Esto devuelve un observable:

```typescript
this.http.get<RestCountry[]>(`${ API_URL}/v3.1/alpha/${ lowerCaseQuery }`)
  .pipe(
    map(CountryMappers.restCountriesToCountries),
    map(country => country.at(0)), // si no encuentra, devuelve undefine
    delay(3000),
    catchError( err => {
      console.error('Error al buscar paises: ', err);
      return throwError( () => new Error("No se puede obtener el pai con esa query"));
    })
  );
```

### Subcripción

```typescript
this.countryService.searchByCapital( this.capitalSng() )
      .pipe(
        takeUntilDestroyed(this.destroyRef),// cancela automáticamente la suscripción al destruir el componente.
        // catchError(err => {
        //   console.error('Error al buscar países:', err);
        //   this.hasError.set(`Error al buscar países: CODE:  ${err.error.code},MESSAGE: ${err.error.message}`);
        //   this.bodyTable.set([]);
        //   return of([]);
        // }),
        delay(100)
      )
      .subscribe( {
        next: countries => {

          if( countries.length > 0 && this.hasError() != null ){
            this.hasError.set( null );
          }

          console.log(countries)
          this.bodyTable.set( countries );
          this.isLoading.set(false);
        },
        error: ( err ) => {
          //console.error('Error al buscar países:', err);
          this.hasError.set(`${err}`);
          this.bodyTable.set([]);
          this.isLoading.set(false);
        }
      } );
```
### Resoruce
Para Angular 19+ Experimental
```typescript
public countryResource = resource({ // resource trabaja con promesas
    request: () => ({  query: this.capitalSng() }),
    loader: async( { request, previous, abortSignal} ) => {
      if( !this.capitalSng()?.trim()) return []; // si no hay valor, se devuelve un valor vacio

      //return this.countryService.searchByCapital(request.query) // esto devuelve un observable
      // convertimos el observable en una promesa con `firstValueFrom`, que espera a que el observable emita un valor
      // y esta se resuelve con el primer valor emitido con "await" o si ocurre un error
      // alternativa al await, se puede suar then y cath de firstValueFrom( obsrrvable )
      return await firstValueFrom( this.countryService.searchByCapital(request.query) );
    }
  })
```
Uso en html

```angular181html
<div class="mt-5">
  <app-shared-table
    [headTable]="headTable"
    [bodyTable]="countryResource.value() ?? []"
    [isEmpty]="countryResource.value()?.length === 0"
    [isLoading]="countryResource.isLoading()"
    [messageError]="countryResource.error()">
  </app-shared-table>
</div>
```
### rxResource
Para Angular 19+ 

```typescript
public countryResource = rxResource({ // rxResource trabaja con observable
  request: () => ({query: this.capitalSng() }),
  loader: ( { request }) => {
    if( !request.query?.trim()) return of([]); //return EMPTY;
    return this.countryService.searchByCapital( request.query )
  }
});
```

Uso en html

```angular181html
<div class="mt-5">
  <app-shared-table
    [headTable]="headTable"
    [bodyTable]="countryResource.value() ?? []"
    [isEmpty]="countryResource.value()?.length === 0"
    [isLoading]="countryResource.isLoading()"
    [messageError]="countryResource.error()">
  </app-shared-table>
</div>
```

---

# Debounce

## Con Observables

Se crea un "Subject" y una "Subcripcion"
```typescript
private debounceSubject: Subject<string> = new Subject<string>();
private debounceSubscription: Subscription | undefined;


ngOnInit() {

  this.debounceSubject.pipe(
    debounceTime(500),
    distinctUntilChanged(),
  ).subscribe( value => this.emitValue(value) )
}

ngOnDestroy() {
  this.debounceSubscription?.unsubscribe();
}

public onDeBounce(value : string){
  this.debounceSubject.next(value);
}

public emitValue(value : string){
  console.log(value);
  this.valueEmmit.emit(value);
}
```
En la vista del componente, se invoca al metodo "onDeBounce"
```angular181html
<input
  type="text"
  class="input input-bordered mr-2 w-56"
  [placeholder]="placeholderSearch()"
  autofocus
  #inputCapital
  (keyup)="onDeBounce(inputCapital.value)"
>
```

## Con Señales

```typescript
valueSignal = signal<string>('');
debounceTime = input(300);

// se lanza el efecto cada vez que se destruya el componente, crea y cada vez que el valueSignla cambie
// Si en ese efecto has creado un setTimeout, un interval, o algún otro recurso que debe limpiarse
// antes de volver a ejecutar el efecto (para evitar fugas de memoria o duplicados), usás onClean
debounceEffect = effect( (onCleanup)=>{
  // cada vez que cambia lanza el effecto
  const value = this.valueSignal(); // accede a la señal reactiva

  // espera X ms
  const timeout = setTimeout( () =>{
    this.valueEmmit.emit(value);
  }, this.debounceTime());

  // Este código se ejecuta justo antes de que el efecto se vuelva a lanzar
  // entonces cada vez que this.valueSignal()
  // 1. Se limpia el timeout anterior con clearTimeout.
  // 2. Se programa un nuevo setTimeout con el nuevo valor.
  // 3. Si el valor no cambia dentro del tiempo (debounceTime), se emite.
  onCleanup( () => {
    clearTimeout(timeout); // limpia el timeout anterior
  })
})
```

En la vista html:

```angular181html
<input
  type="text"
  class="input input-bordered mr-2 w-56"
  [placeholder]="placeholderSearch()"
  autofocus
  #inputCapital
  (keyup)="valueSignal.set(inputCapital.value)"
>
```

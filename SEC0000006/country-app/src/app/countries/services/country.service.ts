import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, delay, EMPTY, map, Observable, of, tap, throwError} from 'rxjs';
import type {RestCountry} from '../interfaces/rest-countries.interface';
import type {Country} from '../interfaces/country.interface';
import {CountryMappers} from '../mappers/country.mapper';
import {Region} from '@interface/country/region.type';

const API_URL = 'https://restcountries.com'
@Injectable({
  providedIn: 'root'
})
export class CountryService {
  // requiere proveer HttpClient en AppConfig en Angular 19+, al no usar en modulos
  private http = inject(HttpClient);

  // cache en memoria
  private cacheCapital = new Map<string, Country[]>();
  private cacheCountries = new Map<string, Country[]>();
  private cacheCountryInfo = new Map<string, Country>();
  private cacheRegion = new Map<string, Country[]>();

  public searchByCapital( query: string): Observable<Country[]> {
    console.log(`Search by capital: ${query}`);
    const lowerCaseQuery = query.toLowerCase().trim();

    if (lowerCaseQuery.length === 0) {
      return EMPTY; // Retorna un observable vacío si el query está vacío
    }

    if( this.cacheCapital.has(lowerCaseQuery) ) {
      console.log(("Cargando countries de la cache"));
      // con has, se sabe que no es nulo, por eso !
      return of(this.cacheCapital.get(lowerCaseQuery) ! );
    }

    console.log(("Call to api countries"));

    //console.table( this.http.get(`${ API_URL }/v3.1/capital/${ lowerCaseQuery }`) );
    return this.http.get<RestCountry[]>(`${ API_URL }/v3.1/capital/${ lowerCaseQuery }`)
      .pipe(
        map(CountryMappers.restCountriesToCountries),
        tap(countries => this.cacheCapital.set(lowerCaseQuery,countries)),
        delay(3000),
        catchError(err => { // en Angular 16+, capturar error y personalizado, es opcional esta opcion
          console.error('Error al buscar países:', err);
          return throwError( () => new Error("No se puedo obtnere paies con esa query"));
        }),
      );
  }


  public searchHByCountry( query: string): Observable<Country[]>{
    console.log(`Search by country: ${query}`);

    const lowerCaseQuery = query.toLowerCase().trim();
    if (lowerCaseQuery.length === 0) {
      return EMPTY; // Retorna un observable vacío si el query está vacío
    }

    if( this.cacheCountries.has(lowerCaseQuery) ) {
      console.log(("Cargando countries de la cache"));
      // con has, se sabe que no es nulo, por eso !
      return of(this.cacheCountries.get(lowerCaseQuery) ! );
    }

    console.log(("Call to api countries"));

    return this.http.get<RestCountry[]>(`${ API_URL }/v3.1/name/${ lowerCaseQuery }`)
      .pipe(
        map(CountryMappers.restCountriesToCountries),
        tap(countries => this.cacheCountries.set(lowerCaseQuery,countries)),
        catchError(err => { // en Angular 16+, capturar error y personalizado, es opcional esta opcion
          console.error('Error al buscar países:', err);
          return throwError( () => new Error("No se puede obtener el pais con esa query"));
        }),
      );
  }

  public searchCountryByAlphaCode(query: string): Observable<Country | undefined >{ // https://restcountries.com/v3.1/alpha/{code}
    console.log(`Search by alpha code: ${query}`);

    const lowerCaseQuery = query.toLowerCase().trim();

    if( lowerCaseQuery.length === 0 ){
      return EMPTY;
    }

    if( this.cacheCountryInfo.has(lowerCaseQuery) ) {
      console.log(("Cargando countries de la cache"));
      // con has, se sabe que no es nulo, por eso !
      return of( this.cacheCountryInfo.get(lowerCaseQuery) ! );
    }

    return  this.http.get<RestCountry[]>(`${ API_URL}/v3.1/alpha/${ lowerCaseQuery }`)
      .pipe(
        map(CountryMappers.restCountriesToCountries),
        map(country => country.at(0)), // si no encuentra, devuelve undefine
        tap(country => this.cacheCountryInfo.set(lowerCaseQuery,country! )),
        delay(3000),
        catchError( err => {
          console.error('Error al buscar paises: ', err);
          return throwError( () => new Error("No se puede obtener el pai con esa query"));
        })
      );

  }

  public searchByRegion(query:Region) : Observable<Country[]>{ // https://restcountries.com/v3.1/region/europe
    console.log(`Search by region: ${query}`);
    const lowerCaseQuery = query.toLowerCase().trim();

    if( this.cacheRegion.has(query )){
      return of(this.cacheRegion.get(lowerCaseQuery) ! );
    }

    return  this.http.get<RestCountry[]>(`${ API_URL }/v3.1/region/${ lowerCaseQuery }`)
      .pipe(
        map(CountryMappers.restCountriesToCountries),
        tap(countries => this.cacheRegion.set(lowerCaseQuery,countries)),
        catchError( err => {
          console.error('Error al buscar paises: ', err);
          return throwError( () => new Error("No se puede obtener el pai con esa query"));
        })
      );
  }
}

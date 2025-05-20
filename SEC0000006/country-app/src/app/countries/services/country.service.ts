import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, delay, EMPTY, map, Observable, throwError} from 'rxjs';
import type {RestCountry} from '../interfaces/rest-countries.interface';
import type {Country} from '../interfaces/country.interface';
import {CountryMappers} from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com'
@Injectable({
  providedIn: 'root'
})
export class CountryService {
  // requiere proveer HttpClient en AppConfig en Angular 19+, al no usar en modulos
  private http = inject(HttpClient);

  public searchByCapital( query: string): Observable<Country[]> {
    console.log(`Search by capital: ${query}`);
    const lowerCaseQuery = query.toLowerCase().trim();
    if (lowerCaseQuery.length === 0) {
      return EMPTY; // Retorna un observable vacío si el query está vacío
    }

    //console.table( this.http.get(`${ API_URL }/v3.1/capital/${ lowerCaseQuery }`) );
    return this.http.get<RestCountry[]>(`${ API_URL }/v3.1/capital/${ lowerCaseQuery }`)
      .pipe(
        map(CountryMappers.restCountriesToCountries),
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

    return this.http.get<RestCountry[]>(`${ API_URL }/v3.1/name/${ lowerCaseQuery }`)
      .pipe(
        map(CountryMappers.restCountriesToCountries),
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

    return  this.http.get<RestCountry[]>(`${ API_URL}/v3.1/alpha/${ lowerCaseQuery }`)
      .pipe(
        map(CountryMappers.restCountriesToCountries),
        map(country => country.at(0)), // si no encuentra, devuelve undefine
        delay(3000),
        catchError( err => {
          console.error('Error al buscar paises: ', err);
          return throwError( () => new Error("No se puede obtener el pai con esa query"));
        })
      );

  }
}

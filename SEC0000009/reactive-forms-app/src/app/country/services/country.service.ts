import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {Country} from '../interfaces/country';

// tipo de valores permitidos
export type REGION = 'Africa' | 'Americas' | 'Asia' | 'Europa' | 'Oceania';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  private static readonly baseUrl = "https://restcountries.com/v3.1";

  constructor() { }

  private _regions: REGION[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europa',
    'Oceania'
  ];

  get regions() :REGION[]{
    // copia de region
    return [...this._regions];
  }

  getCountry( region:REGION):Observable<Country[]>{
    if( !region ) return of([]);

    console.log({region})

    const url = `${CountryService.baseUrl}/region/${region}?fields=cca3,name,borders`;

    return this.http.get<Country[]>(url).pipe(
      catchError(error => {
        if (error.status === 404) {
          console.warn('No se encontraron resultados (404)');
        } else {
          console.error('Error inesperado:', error);
        }

        // Devolver un array vacío u otro valor por defecto para evitar que falle el flujo
        return of([]);
      })
    );
  }

  getCountryAlphaCode(alphaCode: string): Observable<Country | null> {
    const url = `${CountryService.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;

    return this.http.get<Country>(url).pipe(
      catchError(error => {
        console.error('Error:', error);
        return of(null); // <-- Se retorna un observable con null
      })
    );
  }

  getCountryBorderByCode(borders:string[]){
   // TODO por hacer
  }
}


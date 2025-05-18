import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';

const API_URL = 'https://restcountries.com'
@Injectable({
  providedIn: 'root'
})
export class CountryService {
  // requiere proveer HttpClient en AppConfig en Angular 19+, al no usar en modulos
  private http = inject(HttpClient);

  public searchByCapital( query: string): Observable<any> {
    console.log(`Search by capital: ${query}`);
    const lowerCaseQuery = query.toLowerCase().trim();
    if (lowerCaseQuery.length === 0) {
      return EMPTY; // Retorna un observable vacío si el query está vacío
    }

    //console.table( this.http.get(`${ API_URL }/v3.1/capital/${ lowerCaseQuery }`) );
    return this.http.get(`${ API_URL }/v3.1/capital/${ lowerCaseQuery }`);
  }
}

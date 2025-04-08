import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment.development';
// con type, indica que al compilador que no tiene que hacer nada mas
import type {GiphyResponse} from '../interfaces/ghipy.interface';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  private http = inject(HttpClient);

  constructor() {
    this.loadTrendingGifs();
  }

  public loadTrendingGifs():void {
    this.http.get<GiphyResponse>( `${environment.giphyURL}/gifs/trending`, { params:
        {
          apy_key: environment.giphyApiKey,
          limit: 20
        }
    })
  }
}

import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment.development';
// con type, indica que al compilador que no tiene que hacer nada mas
import type {GiphyResponse} from '../interfaces/ghipy.interface';
import type {Gif} from '../interfaces/gif.interface';
import {GifMapper} from '../mappers/gif.mapper';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  private http = inject(HttpClient);

  protected gifs: WritableSignal<Gif[]> = signal<Gif[]>( [] );
  constructor() {
    this.loadTrendingGifs();
  }

  public loadTrendingGifs():void {
    this.http.get<GiphyResponse>( `${environment.giphyURL}/gifs/trending`, { params:
        {
          api_key: environment.giphyApiKey,
          limit: 20
        }
    }).subscribe(
      resp => {
        console.table(resp);
        const data = GifMapper.giphyItemsToGifArray( resp.data );
        this.gifs.set( data );
        console.table(data);
      }
    )
  }
}

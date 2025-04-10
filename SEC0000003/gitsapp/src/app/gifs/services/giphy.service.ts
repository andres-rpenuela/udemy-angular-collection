import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment.development';
// con type, indica que al compilador que no tiene que hacer nada mas
import type {GiphyResponse} from '../interfaces/ghipy.interface';
import type {Gif} from '../interfaces/gif.interface';
import {GifMapper} from '../mappers/gif.mapper';
import {map, Observable, tap} from 'rxjs';
import {GifHistoryService} from './gif-history.service';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  private http = inject(HttpClient);
  private gifHistory = inject(GifHistoryService);

  public gifs: WritableSignal<Gif[]> = signal<Gif[]>( [] );
  public trendingGifsLoading = signal<boolean>(true);

  constructor() {
    this.loadTrendingGifs();
    console.log('Service creado'); // debug
  }

  public loadTrendingGifs():void {
    this.http.get<GiphyResponse>( `${environment.giphyURL}/gifs/trending`, { params:
        {
          api_key: environment.giphyApiKey,
          limit: 20
        }
    }).subscribe(
      resp => {
        console.table(resp); // debug

        const data = GifMapper.giphyItemsToGifArray( resp.data );
        this.gifs.set( data );
        this.trendingGifsLoading.set(false);

        console.table(data); // debug
      }
    )
  }

  searchGifs(query: string): Observable<Gif[]> {

      return this.http.get<GiphyResponse>(`${environment.giphyURL}/gifs/search`, { params:
          {
            api_key: environment.giphyApiKey,
            limit: 20,
            q: query

          }
      })
        .pipe(
          // tap no permite operaciones de transformaciones, solo algunos efectos secundarios
          tap( resp => console.log( {tap1: resp } ) ),
          // map, barre cada uno de los elementos de la respusta y realiza alguna operacion
          map( resp => GifMapper.giphyItemsToGifArray( resp.data )),
          tap( resp => console.log( {tap2: resp } ) ),
          // historial
          tap( items => this.gifHistory.addNewSearch(query,items))
        );

      //   .subscribe( (resp) => {
      //     const data: Gif[] = GifMapper.giphyItemsToGifArray( resp.data );
      //     console.table(data)
      //   }
      // )
  }
}

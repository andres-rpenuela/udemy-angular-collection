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
  public trendingGifsLoading = signal<boolean>(false);

  constructor() {
    this.loadTrendingGifs();
    console.log('Service creado'); // debug
  }

  private trendingPage = signal<number>(0);

  public loadTrendingGifs():void {

    // asegura que si ya esta cargando no lance una petición de nuevo
    if( this.trendingGifsLoading() ) return;

    // si esta a false, lo ponemos a true para bloquearlo y lanzar una petición
    this.trendingGifsLoading.set(true);

    this.http.get<GiphyResponse>( `${environment.giphyURL}/gifs/trending`, { params:
        {
          api_key: environment.giphyApiKey,
          limit: 20,
          offset: this.trendingPage()*20
        }
    }).subscribe(
      resp => {
        console.table(resp); // debug

        // volcamos los gifs de la pteición
        const data = GifMapper.giphyItemsToGifArray( resp.data );
        this.gifs.update( currentGifs => [...currentGifs,...data]  );

        // desbloqueamos la siguiente busqueda
        this.trendingGifsLoading.set(false);

        // acutalizmoas la pagina siguiente
        this.trendingPage.update(page => page+1);

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

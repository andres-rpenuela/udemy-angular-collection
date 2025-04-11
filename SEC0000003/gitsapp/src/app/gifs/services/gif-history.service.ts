import {computed, effect, EffectRef, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {GifHistory} from '@models/gifs/gifs.model';
import {Gif} from '@interfaces/gifs/gif.interface';
import {GifLocalStoreService} from './gif-local-store.service';

@Injectable({
  providedIn: 'root'
})
export class GifHistoryService {

  public searchHistory : WritableSignal<GifHistory> = signal<GifHistory>( {} );

  // save in store con efecto, cuando cambie la señal, se actualiza
  saveGifHistory: EffectRef =  effect( () =>{
    this.gifLocalStoreHistory.saveGifHistory( 'gifs', this.searchHistory());
  })


  // cada vez que "searchHistory" cambie, tambien cambia "searchHistoryKey"
  public searchHistoryKey: Signal<string[]> = computed( () => Object.keys( this.searchHistory() ))


  // servicios
  public gifLocalStoreHistory:GifLocalStoreService = inject(GifLocalStoreService);

  constructor() {
    //this.searchHistory.set( this.gifLocalStoreHistory.getAllItems() );

    // cargando el objet {}
    this.searchHistory.set( this.gifLocalStoreHistory.loadGifHistory('gifs')  );
  }

  public addNewSearch(key:string,gifs:Gif[]):void {

    this.searchHistory.update(history => ({...history, [key.toLowerCase()]:gifs } ) );

    // save in store
    //this.gifLocalStoreHistory.saveGifs(key,gifs);
  }

  public getHistoryGifs( query : string): Gif[] {
    return this.gifLocalStoreHistory.getGifsByKey( query );
    //return this.searchHistory()[query] ?? [];
  }

  public clearHistory(){
    this.gifLocalStoreHistory.clearLocalStore();
    this.searchHistory.set({});
  }
}

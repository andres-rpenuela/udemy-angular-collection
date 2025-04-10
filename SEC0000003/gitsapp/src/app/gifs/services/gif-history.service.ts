import {computed, Injectable, signal} from '@angular/core';
import {GifHistory} from '@models/gifs/gifs.model';
import {Gif} from '@interfaces/gifs/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifHistoryService {

  public searchHistory = signal<GifHistory>({})
  // cada vez que "searchHistory" cambie, tambien cambia "searchHistoryKey"
  public searchHistoryKey = computed( () => Object.keys( this.searchHistory() ))

  public addNewSearch(key:string,gifs:Gif[]):void {
    this.searchHistory.update(history => ({...history, [key.toLowerCase()]:gifs}))
  }
}

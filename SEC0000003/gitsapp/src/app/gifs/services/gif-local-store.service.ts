import { Injectable } from '@angular/core';
import {Gif} from '@interfaces/gifs/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifLocalStoreService {

  constructor() { }

  public saveGifs(key:string, data: Gif[]) :void{
    localStorage.setItem(key, JSON.stringify( data ));
  }

  public getGifsByKey(key:string): Gif[]{
    const maybeGifs: string | null = localStorage.getItem(key);
    return maybeGifs ? JSON.parse( maybeGifs ) : [] ;
  }

  public removeGifById(key:string):void{
    localStorage.removeItem(key);
  }

  public clearLocalStore():void{
    localStorage.clear();
  }

  getAllItems(): { [key: string]: any } {
    let items: { [key: string]: any } = {};
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key) {
        items[key] = localStorage.getItem(key);
      }
    }
    return items;
  }
}

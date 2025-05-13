import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ScrollStateService {

  private trendingScrollState : WritableSignal<number> = signal<number>(0);

  constructor() {
  }

  setTrendingScrollState(scrollTop:number):void {
    this.trendingScrollState.set(scrollTop);
  }

  getTrendingScrollState():number{
    return this.trendingScrollState();
  }

  // alternativa al usar una property por página, es crear un record, donde se almacena un registro por página
  // esto es más flexibe
  pagesScrollStates : Record<string, number> = {
    'page1': 0,
    'pate2': 0,
    'aboutPage':20 //,...
  }
}
